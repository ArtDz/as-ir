import { z } from 'zod'

import { tagLength } from '@/modules/posts/constants'

export const PostSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Заголовок обязателен.' })
    .max(100, { message: 'Заголовок не может превышать 100 символов.' }),

  content: z.string().min(1, { message: 'Содержание обязательно.' }),
  categories: z
    .array(z.string())
    .min(1, { message: 'Необходимо выбрать хотя бы одну категорию.' })
    .max(5, { message: 'Нельзя добавить более 5 категорий.' }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: 'Тег обязателен.' })
        .max(tagLength, {
          message: `Тег не может превышать ${tagLength} символов.`,
        }),
    )
    .min(1, { message: 'Необходимо указать хотя бы один тег.' })
    .max(3, { message: 'Нельзя добавить более 3 тегов.' }),
  description: z.string().min(10, { message: 'Описание обязательно.' }),
  image: z.instanceof(File).optional(),
})
