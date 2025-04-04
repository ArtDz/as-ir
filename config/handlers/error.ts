// Тип ответа бекенда на запрос. Запрос может прийти в API, а может быть SeverAction.
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

import { RequestError, ValidationError } from '@/config/http-errors'
import logger from '@/config/logger'

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

const handleError = (error: unknown, responseType: ResponseType = 'server') => {
  if (error instanceof RequestError) {
    logger.error(
      { err: error },
      `${responseType.toUpperCase()} RequestError: ${error.message}`,
    )

    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors,
    )
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>,
    )

    logger.error({ err: error }, `Zod Validation Error: ${error.message}`)

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors,
    )
  }

  if (error instanceof Error) {
    logger.error(error.message)
    return formatResponse(responseType, 500, error.message)
  }

  logger.error({ err: error }, 'An unexpected error occurred')
  return formatResponse(responseType, 500, 'An unexpected error occurred')
}

export default handleError
