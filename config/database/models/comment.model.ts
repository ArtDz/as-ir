import { model, models, Schema, Types, Document } from 'mongoose'

export interface IComment {
  author: Types.ObjectId
  post: Types.ObjectId
  content: string
}

export interface ICommentDoc extends IComment, Document {}

const CommentSchema = new Schema<IComment>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    content: { type: String, required: true },
  },
  { timestamps: true },
)

const Comment = models?.Comment || model<IComment>('Comment', CommentSchema)

export default Comment
