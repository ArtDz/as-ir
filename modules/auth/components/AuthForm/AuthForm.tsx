'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { toast } from 'sonner'
import { z, ZodType } from 'zod'

import Routes from '@/constants/routes'
import { ActionResponse } from '@/interfaces/api.interfaces'
import { signSchemaMap } from '@/modules/auth/constants'
import { Button } from '@/ui/shadcn/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/shadcn/form'
import { Input } from '@/ui/shadcn/input'

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>
  defaultValues: T
  onSubmit: (data: T) => Promise<ActionResponse>
  formType: 'sign-in' | 'sign-up'
}

export const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const handleSubmit: SubmitHandler<T> = async (data: T) => {
    const { error, success } = await onSubmit?.(data)
    console.log(error)
    if (success) {
      toast.success(
        formType === 'sign-in'
          ? 'Вход выполнен успешно'
          : 'Регистрация прошла успешно',
      )
      router.push(Routes.Home)
    } else {
      toast.error(error ? error.message : 'Произошла ошибка, попробуйте позже.')
    }
  }

  const buttonText = formType === 'sign-in' ? 'Войти' : 'Регистрация'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='mt-10 space-y-6'
      >
        {Object.keys(defaultValues).map((key) => (
          <FormField
            control={form.control}
            name={key as Path<T>}
            key={key}
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-2.5'>
                <FormLabel className='paragraph-medium text-dark400_light700'>
                  {signSchemaMap[field.name as keyof typeof signSchemaMap]}
                </FormLabel>
                <FormControl>
                  <Input
                    type={field.name === 'password' ? 'password' : 'text'}
                    {...field}
                    className='paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type='submit'
          disabled={form.formState.isSubmitting}
          className='primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900'
        >
          {form.formState.isSubmitting
            ? buttonText === 'Войти'
              ? 'Выполняется...'
              : 'Регистрация...'
            : buttonText}
        </Button>

        {formType === 'sign-in' ? (
          <p>
            Нет аккаунта?{' '}
            <Link
              href={Routes.SignUp}
              className='paragraph-semibold primary-text-gradient'
            >
              Регистрация
            </Link>
          </p>
        ) : (
          <p>
            Есть аккаунт?{' '}
            <Link
              href={Routes.SignIn}
              className='paragraph-semibold primary-text-gradient'
            >
              Вход
            </Link>
          </p>
        )}
      </form>
    </Form>
  )
}
