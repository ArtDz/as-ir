import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { api } from '@/config/api'
import { IAccountDoc } from '@/config/database/models/account.model'
import { ActionResponse } from '@/interfaces/api.interfaces'
import { Provider } from '@/interfaces/auth.interfaces'

// Todo Добавить провайдеров VK, Yandex, Mail, Twitter, Apple, Facebook
//  После добавления надо будет в файле config/validation.ts дополнить enum в SignInWithOAuthSchema, для поля provider
//  Также и в других местах где используются провайдеры.
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github, Google],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string
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
      }

      return token
    },
    async signIn({ user, profile, account }) {
      // Todo проверить консоль - что придет и где вызывается эта функция - на сервере или на клиенте.
      console.log('{ user, profile, account }', { user, profile, account })
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
