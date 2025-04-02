import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

import { Account, User } from '@/config/database/models'
import { dbConnect } from '@/config/database/mongoose'
import handleError from '@/config/handlers/error'
import { ValidationError } from '@/config/http-errors'
import { SignInWithOAuthSchema } from '@/config/validation'
import { APIErrorResponse } from '@/interfaces/api.interfaces'

/** This is only for OAuth, not for Credentials */

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json()

  await dbConnect()

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const validatedData = SignInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    })

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors)

    const { name, username, email, image } = user

    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    })

    let existingUser = await User.findOne({ email }).session(session)

    if (!existingUser) {
      ;[existingUser] = await User.create(
        [{ name, username: slugifiedUsername, email, image }],
        { session },
      )
    } else {
      const updatedData: { name?: string; image?: string } = {}

      if (existingUser.name !== name) updatedData.name = name
      if (existingUser.image !== image) updatedData.image = image

      if (Object.keys(updatedData).length > 0) {
        await User.updateOne(
          { _id: existingUser._id },
          { $set: updatedData },
        ).session(session)
      }
    }

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId,
    }).session(session)

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            name,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session },
      )
    }

    await session.commitTransaction()

    return NextResponse.json({ success: true })
  } catch (error) {
    await session.abortTransaction()
    return handleError(error, 'api') as APIErrorResponse
  } finally {
    await session.endSession()
  }
}
