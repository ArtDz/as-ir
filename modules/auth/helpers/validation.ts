import { z } from 'zod'

export const SignInSchema = z.object({
  email: z
    .string()
    .min(4, { message: 'Электронная почта обязательна для заполнения.' })
    .email({
      message: 'Пожалуйста, укажите корректный адрес электронной почты.',
    }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать как минимум 6 символов.' })
    .max(30, { message: 'Пароль не может превышать 30 символов.' }),
})

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Имя пользователя должно содержать как минимум 3 символа.',
    })
    .max(30, { message: 'Имя пользователя не может превышать 30 символов.' })
    .regex(/^[a-zA-Zа-яА-Я0-9_]+$/, {
      message:
        'Имя пользователя может содержать только буквы, цифры и нижние подчеркивания.',
    }),

  name: z
    .string()
    .min(1, { message: 'Имя обязательно для заполнения.' })
    .max(50, { message: 'Имя не может превышать 50 символов.' })
    .regex(/^[a-zA-Zа-яА-Я\s]+$/, {
      message: 'Имя может содержать только буквы и пробелы.',
    }),

  email: z
    .string()
    .min(4, { message: 'Электронная почта обязательна для заполнения.' })
    .email({
      message: 'Пожалуйста, укажите корректный адрес электронной почты.',
    }),

  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать как минимум 6 символов.' })
    .max(30, { message: 'Пароль не может превышать 30 символов.' }),
})

export type SignInSchemaType = z.infer<typeof SignInSchema>
export type SignUpSchemaType = z.infer<typeof SignUpSchema>
