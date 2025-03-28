'use client'

import { AuthForm } from '@/modules/auth/components/AuthForm/AuthForm'
import { signInDefaultValues } from '@/modules/auth/constants'
import { SignInSchema } from '@/modules/auth/helpers/validation'

const SignIn = () => {
  return (
    <>
      <AuthForm
        formType='sign-in'
        schema={SignInSchema}
        onSubmit={(data) => Promise.resolve({ success: true })}
        defaultValues={signInDefaultValues}
      />
    </>
  )
}

export default SignIn
