import { model, models, Schema, Types, Document } from 'mongoose'

export interface IPostCategoryPost {
  postCategory: Types.ObjectId
  post: Types.ObjectId
}

export interface IPostCategoryPostDoc extends IPostCategoryPost, Document {}

const PostCategoryPostSchema = new Schema<IPostCategoryPost>(
  {
    postCategory: {
      type: Schema.Types.ObjectId,
      ref: 'PostCategory',
      required: true,
    },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true },
)

const PostCategoryPost =
  models?.PostCategoryPost ||
  model<IPostCategoryPost>('PostCategoryPost', PostCategoryPostSchema)

export default PostCategoryPost
