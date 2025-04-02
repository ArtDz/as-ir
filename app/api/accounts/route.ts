import { NextResponse } from 'next/server'

import { Account } from '@/config/database/models'
import { dbConnect } from '@/config/database/mongoose'
import handleError from '@/config/handlers/error'
import { ForbiddenError } from '@/config/http-errors'
import { AccountSchema } from '@/config/validation'
import { APIErrorResponse } from '@/interfaces/api.interfaces'

export async function GET() {
  try {
    await dbConnect()
    const accounts = await Account.find()

    return NextResponse.json({ success: true, data: accounts }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const body = await request.json()

    const validatedData = AccountSchema.parse(body)

    const existingAccount = await Account.findOne({
      provider: validatedData.provider,
      providerAccountId: validatedData.providerAccountId,
    })

    if (existingAccount)
      throw new ForbiddenError(
        'An Account with the same provider and providerAccountId already exists',
      )

    const newAccount = await Account.create(validatedData)

    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 },
    )
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
