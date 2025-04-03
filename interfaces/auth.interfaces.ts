import { z } from 'zod'

import {
  SignInWithOAuthSchema,
  SignUpWithCredentialsSchema,
} from '@/config/validation'

export type SignInWithOAuthParams = z.infer<typeof SignInWithOAuthSchema>
export type Provider = SignInWithOAuthParams['provider']

export type SignUpWithCredentials = z.infer<typeof SignUpWithCredentialsSchema>
