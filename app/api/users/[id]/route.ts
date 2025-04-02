import { NextResponse } from 'next/server'

import { User } from '@/config/database/models'
import { dbConnect } from '@/config/database/mongoose'
import handleError from '@/config/handlers/error'
import { NotFoundError, ValidationError } from '@/config/http-errors'
import { UserSchema } from '@/config/validation'
import { APIErrorResponse } from '@/interfaces/api.interfaces'

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  if (!id) throw new NotFoundError('User')

  try {
    await dbConnect()
    const user = await User.findById(id)
    if (!user) throw new NotFoundError('User')

    return NextResponse.json({ success: true, data: user }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  if (!id) throw new NotFoundError('User')

  try {
    await dbConnect()
    const user = await User.findByIdAndDelete(id)
    if (!user) throw new NotFoundError('User')

    return NextResponse.json({ success: true, data: user }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  if (!id) throw new NotFoundError('User')

  try {
    await dbConnect()
    const body = await request.json()
    const validatedData = UserSchema.partial().parse(body)

    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    })

    if (!updatedUser) throw new NotFoundError('User')

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 },
    )
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
