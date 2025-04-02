/** Иногда нужно будет искать аккаунт по провайдеру, не по id */
import { NextResponse } from 'next/server'

import { Account } from '@/config/database/models'
import handleError from '@/config/handlers/error'
import { NotFoundError } from '@/config/http-errors'
import { AccountSchema } from '@/config/validation'
import { APIErrorResponse } from '@/interfaces/api.interfaces'

export async function POST(request: Request) {
  const { providerAccountId } = await request.json()
  if (!providerAccountId) throw new NotFoundError('Account')

  try {
    AccountSchema.partial().parse({ providerAccountId })

    const account = await Account.findOne({ providerAccountId })
    if (!account) throw new NotFoundError('Account')

    return NextResponse.json({ success: true, data: account }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
