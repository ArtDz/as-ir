import { model, models, Schema, Types, Document } from 'mongoose'

export interface ITagPost {
  bookCategory: Types.ObjectId
  book: Types.ObjectId
}

export interface ITagPostDoc extends ITagPost, Document {}

const TagPostSchema = new Schema<ITagPost>(
  {
    bookCategory: {
      type: Schema.Types.ObjectId,
      ref: 'BookCategory',
      required: true,
    },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  },
  { timestamps: true },
)

const TagPost = models?.TagPost || model<ITagPost>('TagPost', TagPostSchema)

export default TagPost
