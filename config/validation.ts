import { z } from 'zod'

/** Схемы валидации для бекенда. */

export const UserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' }),
  email: z.string().email({ message: 'Please provide a valid email address.' }),
  // Todo
  // Тут можем добавить функцию проверки, это url на изображение или нет. Через отправку HEAD запроса.
  // Если пользователь загрузил фото, то оно должно сначала сохраниться в S3 БД. А в ответе от S3 должен прийти url фото.
  // image: z.string().url({ message: "Please provide a valid URL." }).optional(),
  location: z.string().optional(),
})

export const AccountSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required.' }),
  name: z.string().min(1, { message: 'Name is required.' }),
  image: z.string().url({ message: 'Please provide a valid URL.' }).optional(),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать как минимум 6 символов.' })
    .max(30, { message: 'Пароль не может превышать 30 символов.' }),
  provider: z.string().min(1, { message: 'Provider is required.' }),
  providerAccountId: z
    .string()
    .min(1, { message: 'Provider account id is required.' }),
})

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(['google', 'github']),
  providerAccountId: z
    .string()
    .min(1, { message: 'Provider Account ID is required.' }),
  user: z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long.' }),
    email: z
      .string()
      .email({ message: 'Please provide a valid email address.' }),
    image: z.string().url('Invalid image URL').optional(),
  }),
})
