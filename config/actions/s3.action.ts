'use server'

import crypto from 'crypto'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { auth } from '@/auth'
import handleError from '@/config/handlers/error'
import { ForbiddenError, UnauthorizedError } from '@/config/http-errors'
import { ActionResponse, ErrorResponse } from '@/interfaces/api.interfaces'

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex')

const s3 = new S3Client({
  region: process.env.YC_REGION,
  credentials: {
    accessKeyId: process.env.YC_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.YC_SECRET_ACCESS_KEY as string,
  },
  endpoint: process.env.YC_ENDPOINT_URL,
})

const acceptedTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/webm',
]

const maxFileSize = 1024 * 1024 * 10 // 10MB

// Todo вместо type: string сделать type: FileType
// Todo size можно подделать на клиенте, нужна также настройка в самом aws, либо size проверять в функции где PUT делаем
export async function getSignedURL(
  type: string,
  size: number,
  checksum: string,
): Promise<ActionResponse<{ signedURL: string }>> {
  const session = await auth()
  if (!session) {
    return handleError(new UnauthorizedError()) as ErrorResponse
  }

  if (!acceptedTypes.includes(type)) {
    return handleError(
      new Error('Provide a file with valid type'),
    ) as ErrorResponse
  }

  if (size > maxFileSize) {
    return handleError(new Error('File size is to large')) as ErrorResponse
  }
  // Todo проверить роль пользователя. Возможно не в этом запросе а в запросе где он меняет свой image в профиле.
  try {
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.YC_BUCKET_NAME,
      Key: generateFileName(),
      ContentType: type,
      ContentLength: size,
      ChecksumSHA256: checksum,
      Metadata: {
        userId: session.user!.id!,
      },
    })

    const signedURL = await getSignedUrl(s3, putObjectCommand, {
      // Todo expiresIn - сколько секунд есть, чтобы загрузить файл
      expiresIn: 60,
    })

    return { data: { signedURL }, success: true }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}
