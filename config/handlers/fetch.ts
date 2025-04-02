import handleError from '@/config/handlers/error'
import { RequestError } from '@/config/http-errors'
import logger from '@/config/logger'
import { ActionResponse } from '@/interfaces/api.interfaces'

interface FetchOptions extends RequestInit {
  timeout?: number
  // eslint-disable-next-line
  body?: any
}

function isError(error: unknown): error is Error {
  return error instanceof Error
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {},
): Promise<ActionResponse<T>> {
  const {
    timeout = 20_000,
    headers: customHeaders = {},
    body,
    ...restOptions
  } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders }
  const config: RequestInit = {
    ...restOptions,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal: controller.signal,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config)
    clearTimeout(id)

    if (!response.ok)
      throw new RequestError(response.status, `HTTP error: ${response.status}`)

    return await response.json()
  } catch (err) {
    const error = isError(err) ? err : new Error('Unknown error')

    if (error.name === 'AbortError') {
      logger.warn(`Request to ${url} timed out.`)
    } else {
      logger.error(`Error fetching ${url}: ${error.message}`)
    }

    return handleError(error) as ActionResponse<T>
  }
}

const fetchClient = {
  get: <T>(url: string, options?: FetchOptions) =>
    fetchHandler<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body?: T, options?: FetchOptions) =>
    fetchHandler<T>(url, { ...options, method: 'POST', body }),
  put: <T>(url: string, body?: T, options?: FetchOptions) =>
    fetchHandler<T>(url, { ...options, method: 'PUT', body }),
  patch: <T>(url: string, body?: T, options?: FetchOptions) =>
    fetchHandler<T>(url, { ...options, method: 'PATCH', body }),
  delete: <T>(url: string, options?: FetchOptions) =>
    fetchHandler<T>(url, { ...options, method: 'DELETE' }),
}

export default fetchClient
