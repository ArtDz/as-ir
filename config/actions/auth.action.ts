'use server'

import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import { signIn } from '@/auth'
import { Account, User } from '@/config/database/models'
import action from '@/config/handlers/action'
import handleError from '@/config/handlers/error'
import { NotFoundError } from '@/config/http-errors'
import { SignUpWithCredentialsSchema } from '@/config/validation'
import { ActionResponse, ErrorResponse } from '@/interfaces/api.interfaces'
import { SignUpWithCredentials } from '@/interfaces/auth.interfaces'
import { SignInSchema } from '@/modules/auth/helpers/validation'

export async function signUpWithCredentials(
  params: SignUpWithCredentials,
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SignUpWithCredentialsSchema,
  })

  if (validationResult instanceof Error)
    return handleError(validationResult) as ErrorResponse

  const { name, email, password, username } = validationResult.params!

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const existingUser = await User.findOne({ email }).session(session)

    if (existingUser) throw new Error('User already exists')

    const existingUsername = await User.findOne({ username }).session(session)

    if (existingUsername) throw new Error('User already exists')

    const hashedPassword = await bcrypt.hash(password, 12)

    const [newUser] = await User.create([{ username, name, email }], {
      session,
    })

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: 'credentials',
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session },
    )
    await session.commitTransaction()
    await signIn('credentials', { email, password, redirect: false })

    return { success: true }
  } catch (error) {
    await session.abortTransaction()
    return handleError(error) as ErrorResponse
  } finally {
    await session.endSession()
  }
}

export async function signInWithCredentials(
  params: Pick<SignUpWithCredentials, 'email' | 'password'>,
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SignInSchema,
  })

  if (validationResult instanceof Error)
    return handleError(validationResult) as ErrorResponse

  const { email, password } = validationResult.params!

  try {
    const existingUser = await User.findOne({ email })

    if (!existingUser) throw new NotFoundError('User')

    const existingAccount = await Account.findOne({
      provider: 'credentials',
      providerAccountId: email,
    })

    if (!existingAccount) throw new NotFoundError('Account')

    const passwordMatch = await bcrypt.compare(
      password,
      existingAccount.password,
    )

    if (!passwordMatch) throw new Error('Password does not match')

    await signIn('credentials', { email, password, redirect: false })

    return { success: true }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}
