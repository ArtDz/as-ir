'use client'

import { AuthForm } from '@/modules/auth/components/AuthForm/AuthForm'
import { signUpDefaultValues } from '@/modules/auth/constants'
import { SignUpSchema } from '@/modules/auth/helpers/validation'

const Page = () => {
  return (
    <AuthForm
      formType='sign-up'
      schema={SignUpSchema}
      onSubmit={(data) => Promise.resolve({ success: true })}
      defaultValues={signUpDefaultValues}
    />
  )
}

export default Page
