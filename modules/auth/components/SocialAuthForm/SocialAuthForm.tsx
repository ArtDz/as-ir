'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

import Routes from '@/constants/routes'
import { Provider } from '@/interfaces/auth.interfaces'
import { Button } from '@/ui/shadcn/button'

export const SocialAuthForm = () => {
  const buttonClass =
    'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5'

  const handleSignIn = async (provider: Provider) => {
    try {
      await signIn(provider, { redirectTo: Routes.Home })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Произошла ошибка при входе',
      )
    }
  }

  return (
    <div className='mt-10 flex flex-wrap gap-2.5'>
      <Button className={buttonClass} onClick={() => handleSignIn('github')}>
        <Image
          src='/icons/github.svg'
          alt='Github Logo'
          width={20}
          height={20}
          className='invert-colors mr-2.5 object-contain'
        />
        <span>Войти через GitHub</span>
      </Button>

      <Button className={buttonClass} onClick={() => handleSignIn('google')}>
        <Image
          src='/icons/google.svg'
          alt='Google Logo'
          width={20}
          height={20}
          className='mr-2.5 object-contain'
        />
        <span>Войти через Google</span>
      </Button>
    </div>
  )
}
