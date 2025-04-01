import { model, models, Schema, Types, Document } from 'mongoose'

export interface ICart {
  user?: Types.ObjectId
  books: Types.ObjectId[]
  token: string
  totalPrice: number
  expiresAt: Date
}

// Todo при добавлении книги в корзину незарегистрированным пользователем надо каждый раз обновлять expiresAt

export interface ICartDoc extends ICart, Document {}

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    token: { type: String, required: true },
    totalPrice: { type: Number, default: 0 },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true },
)
// Создаем TTL метку(индекс) в MongoDB, который автоматически удаляет устаревшие документы.
CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const Cart = models?.Cart || model<ICart>('Cart', CartSchema)

export default Cart
