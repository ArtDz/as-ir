import { NextResponse } from 'next/server'

export type ActionResponse<T = null> = {
  success: boolean
  data?: T
  error?: {
    message: string
    details?: Record<string, string[]>
  }
  status?: number
}

// Для SA
export type SuccessResponse<T = null> = ActionResponse<T> & { success: true }
export type ErrorResponse = ActionResponse<undefined> & { success: false }

// Для API
export type APIErrorResponse = NextResponse<ErrorResponse>
export type APIResponse<T = null> = NextResponse<
  SuccessResponse<T> | ErrorResponse
>
