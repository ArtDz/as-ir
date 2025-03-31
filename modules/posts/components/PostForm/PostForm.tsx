'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MDXEditorMethods } from '@mdxeditor/editor'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { tagLength } from '@/modules/posts/constants'
import { PostSchema } from '@/modules/posts/heplers/validation'
import { TagCard } from '@/modules/tags/components'
import ImageUpload from '@/ui/ImageUpload/ImageUpload'
import { colourOptions } from '@/ui/MultiSelect/select.constant'
import { Button } from '@/ui/shadcn/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/shadcn/form'
import { Input } from '@/ui/shadcn/input'
import { Textarea } from '@/ui/shadcn/textarea'

const Editor = dynamic(() => import('@/ui/Editor'), {
  ssr: false,
})

const MultiSelect = dynamic(() => import('@/ui/MultiSelect'), {
  ssr: false,
})

export const PostForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null)
  const form = useForm({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: '',
      content: '',
      categories: [],
      tags: [],
      description: '',
    },
  })

  const handleCreatePost = (data: z.infer<typeof PostSchema>) => {
    console.log('PostSchema', data)
  }

  const handleTagsInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] },
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const tagInput = event.currentTarget.value.trim()

      if (
        tagInput &&
        tagInput.length <= tagLength &&
        !field.value.includes(tagInput)
      ) {
        form.setValue('tags', [...field.value, tagInput])
        event.currentTarget.value = ''
        form.clearErrors('tags')
      } else if (tagInput.length > tagLength) {
        form.setError('tags', {
          type: 'manual',
          message: `Тег не может превышать ${tagLength} символов.`,
        })
      } else if (field.value.includes(tagInput)) {
        form.setError('tags', {
          type: 'manual',
          message: 'Тег уже существует',
        })
      }
    }
  }

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((v) => v !== tag)
    form.setValue('tags', newTags)

    if (newTags.length === 0) {
      form.setError('tags', {
        type: 'manual',
        message: 'Tags are required',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col gap-10'
        onSubmit={form.handleSubmit(handleCreatePost, (data) => {
          console.log(data)
        })}
      >
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-medium text-dark400_light800'>
                Название публикации <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <ImageUpload
                  withPreview
                  onDrop={(acceptedFiles) => field.onChange(acceptedFiles[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-medium text-dark400_light800'>
                Название публикации <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  {...field}
                  className='paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]  border'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-medium text-dark400_light800'>
                Текст публикации <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  editorRef={editorRef}
                  value={field.value}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='categories'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-medium text-dark400_light800'>
                Название публикации <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <MultiSelect
                  options={colourOptions}
                  value={colourOptions.filter((option) =>
                    field.value.includes(option.value),
                  )}
                  onChange={(selectedOptions) =>
                    field.onChange(
                      selectedOptions.map((option) => option.value),
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-medium text-dark400_light800'>
                Теги <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    type='text'
                    onKeyDown={(e) => handleTagsInputKeyDown(e, field)}
                    className='paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]  border'
                  />
                  {field?.value.length > 0 && (
                    <div className='flex-start mt-2.5 flex-wrap gap-2.5'>
                      {field.value.map((tag: string) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          remove
                          isButton
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Добавьте до 3 тегов. Вам нужно нажать Enter, чтобы добавить тег.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel className='paragraph-medium text-dark400_light800'>
                Теги <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Добавьте краткое описание статьи. Это нужно для SEO.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='mt-16 flex justify-end'>
          <Button
            type='submit'
            className='primary-gradient w-fit !text-light-900'
          >
            Создать пост
          </Button>
        </div>
      </form>
    </Form>
  )
}
