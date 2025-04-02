import { model, models, Schema, Types, Document } from 'mongoose'

export interface IBookCategoryBook {
  bookCategory: Types.ObjectId
  book: Types.ObjectId
}

export interface IBookCategoryBookDoc extends IBookCategoryBook, Document {}

const BookCategoryBookSchema = new Schema<IBookCategoryBook>(
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

const BookCategoryBook =
  models?.BookCategoryBook ||
  model<IBookCategoryBook>('BookCategoryBook', BookCategoryBookSchema)

export default BookCategoryBook
