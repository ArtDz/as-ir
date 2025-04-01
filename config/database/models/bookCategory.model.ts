import { model, models, Schema, Document } from 'mongoose'

export interface IBookCategory {
  name: string
}

export interface IBookCategoryDoc extends IBookCategory, Document {}

const BookCategorySchema = new Schema<IBookCategory>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)

const BookCategory =
  models?.BookCategory ||
  model<IBookCategory>('BookCategory', BookCategorySchema)

export default BookCategory
