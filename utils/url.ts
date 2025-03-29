import qs from 'query-string'

interface UrlQueryParams {
  params: string
  key: string
  value: string
}

interface RemoveUrlQueryParams {
  params: string
  keysToRemove: string[]
}

export const formUrlQuery = ({
  params,
  key,
  value,
}: UrlQueryParams): string => {
  const parsedParamsObject = qs.parse(params)

  parsedParamsObject[key] = value

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: parsedParamsObject,
  })
}

export const removeKeysFromUrlQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const parsedParamsObject = qs.parse(params)

  keysToRemove.forEach((key) => delete parsedParamsObject[key])

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: parsedParamsObject,
    },
    { skipNull: true },
  )
}
