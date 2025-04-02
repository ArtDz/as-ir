import { Document, model, models, Schema, Types } from 'mongoose'

export type UserRole = 'USER' | 'ADMIN'

interface IUser {
  name: string
  username: string
  email: string
  image?: string
  location?: string
  role: UserRole
  cart: Types.ObjectId
  orders: Types.ObjectId[]
  verified: Date
}

export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    location: { type: String },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      required: true,
      default: 'USER',
    },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    verified: { type: Date },
  },
  { timestamps: true },
)

const User = models?.User || model<IUser>('User', UserSchema)

export default User
