import { z } from 'zod'

// Схемы валидации для бекенда.

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
