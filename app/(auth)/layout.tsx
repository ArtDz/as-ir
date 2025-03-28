import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'

import { SocialAuthForm } from '@/modules/auth/components'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat px-4 py-10 dark:bg-auth-dark'>
      <section className='light-border background-light800_dark200 shadow-light100_dark200 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8'>
        <div className='flex items-center justify-between gap-2'>
          <div className='space-y-2.5'>
            <h1 className='h2-bold text-dark100_light900'>АС-ИР</h1>
            <p className='paragraph-regular text-dark500_light400'>
              Интересные статьи ждут Вас!
            </p>
          </div>
          <Image
            src='/images/logo.webp'
            alt='AS-IR Logo'
            width={50}
            height={50}
            className='object-contain'
          />
        </div>

        {children}

        <SocialAuthForm />
      </section>
    </main>
  )
}

export default AuthLayout
