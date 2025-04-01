// Тип ответа бекенда на запрос. Запрос может прийти в API, а может быть SeverAction.
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

import { RequestError, ValidationError } from '@/config/http-errors'

export type ResponseType = 'api' | 'server'

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined,
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  }

  // API - для ошибок api, а server для ошибок Server Actions.
  return responseType === 'api'
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent }
}

export const handleError = (
  error: unknown,
  responseType: ResponseType = 'server',
) => {
  if (error instanceof RequestError) {
    console.log('RequestError')
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors,
    )
  }

  if (error instanceof ZodError) {
    console.log('ZodError')

    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>,
    )

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors,
    )
  }

  if (error instanceof Error) {
    console.log('Error')
    return formatResponse(responseType, 500, error.message)
  }

  console.log('unexpected')
  return formatResponse(responseType, 500, 'An unexpected error occurred')
}
