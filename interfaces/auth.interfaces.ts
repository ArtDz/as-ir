import { z } from 'zod'

import { SignInWithOAuthSchema } from '@/config/validation'

export type SignInWithOAuthParams = z.infer<typeof SignInWithOAuthSchema>
export type Provider = SignInWithOAuthParams['provider']
