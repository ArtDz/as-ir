import { model, models, Schema, Types, Document } from 'mongoose'

const mediaTypes = ['image', 'pdf', 'doc', 'docx', 'video', 'audio'] as const
const entityTypes = ['post', 'book'] as const
const visibility = ['public', 'private'] as const

export type MediaType = (typeof mediaTypes)[number]
export type EntityType = (typeof entityTypes)[number]
export type Visibility = (typeof visibility)[number]

export interface IMedia {
  url: string // s3 url
  mediaType: MediaType
  size: number
  userId: Types.ObjectId
  alt?: string
  originalName?: string
  entityType: EntityType
  entityId: Types.ObjectId
  visibility: Visibility // книги должны быть приватными
}

export interface IMediaDoc extends IMedia, Document {}

const MediaSchema = new Schema<IMedia>(
  {
    url: { type: String, required: true },
    mediaType: {
      type: String,
      enum: mediaTypes,
      required: true,
    },
    size: { type: Number, required: true }, // в байтах
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    alt: { type: String },
    originalName: { type: String },

    entityType: {
      type: String,
      enum: entityTypes,
      required: true,
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    visibility: {
      type: String,
      enum: visibility,
      default: 'public',
    },
  },
  { timestamps: true },
)

MediaSchema.pre('validate', function (next) {
  if (this.entityType === 'book' && !this.visibility) {
    this.visibility = 'private'
  }
  next()
})

const Media = models?.Media || model<IMedia>('Media', MediaSchema)

export default Media
