'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MDXEditorMethods } from '@mdxeditor/editor'
import dynamic from 'next/dynamic'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getSignedURL } from '@/config/actions/s3.action'
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

  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleCreatePost = (data: z.infer<typeof PostSchema>) => {
    console.log('PostSchema', data)
    // Todo сделать SA createPost, в котором будут атомарные транзакции:
    //    1. Создание модели Media, для фото.
    //    2. Создание поста
    //    3. Связывание поста и Media
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

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setFile(file)

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  console.log({ file, previewUrl })

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
    return hashHex
  }

  const handleSubmit2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (file) {
      const checksum = await computeSHA256(file)
      const { data, error, success } = await getSignedURL(
        file.type,
        file.size,
        checksum,
      )

      if (!success) {
        toast.error(error?.message)
        return
      }

      const signedURL = data!.signedURL

      console.log('signedURL', signedURL)

      // Вынести в отдельную функцию
      await fetch(signedURL, {
        method: 'PUT',
        body: file,
        headers: { 'content-type': file.type },
      })
    }
  }

  return (
    <>
      <form>
        <input name='media' type='file' onChange={handleImageInputChange} />
        <Button
          type='submit'
          onClick={(event) =>
            handleSubmit2(event as unknown as FormEvent<HTMLFormElement>)
          }
        >
          Upload
        </Button>
        {previewUrl && file && (
          <div className='mt-4'>
            {file.type.startsWith('image/') ? (
              <img src={previewUrl} alt='Selected file' />
            ) : file.type.startsWith('video/') ? (
              <video src={previewUrl} controls />
            ) : null}
          </div>
        )}
      </form>
      <Form {...form}>
        <form
          className='flex w-full flex-col gap-10'
          onSubmit={form.handleSubmit(handleCreatePost)}
        >
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col'>
                <FormLabel className='paragraph-medium text-dark400_light800'>
                  Изображение
                  <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <div>
                    {/* <ImageUpload */}
                    {/*  withPreview */}
                    {/*  onDrop={(acceptedFiles) => field.onChange(acceptedFiles[0])} */}
                    {/* /> */}
                  </div>
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
                  Название <span className='text-primary-500'>*</span>
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
                  Текст <span className='text-primary-500'>*</span>
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
                  Категории <span className='text-primary-500'>*</span>
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
                  Добавьте до 3 тегов. Вам нужно нажать Enter, чтобы добавить
                  тег.
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
                  Описание <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription className='body-regular mt-2.5 text-light-500'>
                  Добавьте краткое описание публикации. Это нужно для SEO.
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
              Опубликовать
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
