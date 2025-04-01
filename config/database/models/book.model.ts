import { model, models, Schema, Types, Document } from 'mongoose'

export interface IBook {
  author: string
  image: string
  title: string
  url: string
  // Краткое описание книги
  description: string
  // При открытии детальной страницы книги, в ней может быть рецензия
  content: string
  price: number
  isFree: boolean
  categories: Types.ObjectId[]
}

export interface IBookDoc extends IBook, Document {}

const BookSchema = new Schema<IBook>(
  {
    author: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true }, // Уникальная ссылка на книгу
    description: { type: String, required: true },
    content: { type: String },
    price: { type: Number, default: 0 },
    isFree: { type: Boolean, default: false },
    categories: [
      { type: Schema.Types.ObjectId, ref: 'BookCategory', required: true },
    ],
  },
  { timestamps: true },
)

const Book = models?.Book || model<IBook>('Book', BookSchema)

export default Book
