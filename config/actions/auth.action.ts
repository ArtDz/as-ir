'use server'

import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import { signIn } from '@/auth'
import { Account, User } from '@/config/database/models'
import action from '@/config/handlers/action'
import handleError from '@/config/handlers/error'
import { SignUpWithCredentialsSchema } from '@/config/validation'
import { ActionResponse, ErrorResponse } from '@/interfaces/api.interfaces'
import { SignUpWithCredentials } from '@/interfaces/auth.interfaces'

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
