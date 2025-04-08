import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { api } from '@/config/api'
import { IAccountDoc } from '@/config/database/models/account.model'
import { IUserDoc } from '@/config/database/models/user.model'
import { ActionResponse } from '@/interfaces/api.interfaces'
import { Provider } from '@/interfaces/auth.interfaces'
import { SignInSchema } from '@/modules/auth/helpers/validation'

// Todo Добавить провайдеров VK, Yandex, Mail, Twitter, Apple, Facebook
//  После добавления надо будет в файле config/validation.ts дополнить enum в SignInWithOAuthSchema, для поля provider
//  Также и в других местах где используются провайдеры.
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github,
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const { data: existingAccount } = (await api.accounts.getByProvider(
            email,
          )) as ActionResponse<IAccountDoc>

          if (!existingAccount) return null

          const { data: existingUser } = (await api.users.getById(
            existingAccount.userId.toString(),
          )) as ActionResponse<IUserDoc>

          if (!existingUser) return null

          const isValidPassword = await bcrypt.compare(
            password,
            existingAccount.password!,
          )

          if (isValidPassword) {
            return {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
              image: existingUser.image,
            }
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string
      // Todo добавить роль user-a в session, после добавления + типизировать
      // session.user.role = token.role as string
      return session
    },
    async jwt({ token, account }) {
      if (account) {
        const { data: existingAccount, success } =
          (await api.accounts.getByProvider(
            account.type === 'credentials'
              ? token.email!
              : account.providerAccountId,
          )) as ActionResponse<IAccountDoc>

        if (!success || !existingAccount) return token

        const userId = existingAccount.userId

        if (userId) token.sub = userId.toString()
        // Todo добавить роль user-a в jwt, для этого запросить из бд user-a и проверить его роль
        // token.role = 'admin'
      }

      return token
    },
    async signIn({ user, profile, account }) {
      if (account?.type === 'credentials') return true
      if (!account || !user) return false

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === 'github'
            ? (profile?.login as string)
            : (user.name?.toLowerCase() as string),
      }

      const { success } = await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as Provider,
        providerAccountId: account.providerAccountId,
      })

      return success // true or false
    },
  },
})
