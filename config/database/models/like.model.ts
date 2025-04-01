import { model, models, Schema, Types, Document } from 'mongoose'

export interface ILike {
  author: Types.ObjectId
  post: Types.ObjectId
}

export interface ILikeDoc extends ILike, Document {}

const LikeSchema = new Schema<ILike>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true },
)

const Like = models?.Like || model<ILike>('Like', LikeSchema)

export default Like
