import Image from 'next/image'
import { useState } from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

import { cn } from '@/utils/cn'

interface ImageUploadProps {
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void
  withPreview?: boolean
}

const ImageUpload = ({ onDrop, withPreview }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, fileRejections, event) => {
      if (onDrop) onDrop(acceptedFiles, fileRejections, event)
      const file = acceptedFiles[0]
      if (file) {
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
      }
    },
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          'rounded-lg border-2 border-dashed p-4 transition-colors cursor-pointer dark:border-slate-800',
          {
            'border-primary-500 dark:border-primary-500': isDragActive,
          },
        )}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p className='text-sm'>Отпустите файл для добавления ...</p>
        ) : (
          <p className='text-sm'>
            Перетащите сюда файл или нажмите для выбора изображения
          </p>
        )}
      </div>

      {withPreview && preview && (
        <div className='mt-4'>
          <Image
            src={preview}
            alt='Preview'
            width={250}
            height={250}
            className='object-cover'
          />
        </div>
      )}
    </div>
  )
}

export default ImageUpload
