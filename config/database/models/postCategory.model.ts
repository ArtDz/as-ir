import { model, models, Schema, Document } from 'mongoose'

export interface IPostCategory {
  name: string
}

export interface IPostCategoryDoc extends IPostCategory, Document {}

const PostCategorySchema = new Schema<IPostCategory>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)

const PostCategory =
  models?.PostCategory || model<IPostCategory>('PostCategory', PostCategorySchema)

export default PostCategory
