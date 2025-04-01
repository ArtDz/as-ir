import { model, models, Schema, Types, Document } from 'mongoose'

export type OrderStatus = 'PENDING' | 'SUCCEEDED' | 'CANCELLED'

export interface IOrder {
  user?: Types.ObjectId
  token: string
  totalPrice: number
  status: OrderStatus
  paymentId: string
  books: string // json format
  fullName: string
  email: string
  phone?: string
}

export interface IOrderDoc extends IOrder, Document {}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    token: { type: String, required: true },
    totalPrice: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['PENDING', 'SUCCEEDED', 'CANCELLED'],
      required: true,
    },
    paymentId: { type: String },
    books: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true },
)

const Order = models?.Order || model<IOrder>('Order', OrderSchema)

export default Order
