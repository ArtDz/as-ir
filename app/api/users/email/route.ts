// Поиск по email-у нужен при авторизации

import { NextResponse } from 'next/server'

import { User } from '@/config/database/models'
import handleError from '@/config/handlers/error'
import { NotFoundError, ValidationError } from '@/config/http-errors'
import { UserSchema } from '@/config/validation'
import { APIErrorResponse } from '@/interfaces/api.interfaces'

export async function POST(request: Request) {
  const { email } = await request.json()
  if (!email) throw new NotFoundError('Email')

  try {
    const validatedData = UserSchema.partial().safeParse({ email })

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors)

    const user = await User.findOne({ email })
    if (!user) throw new NotFoundError('User')

    return NextResponse.json({ success: true, data: user }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
