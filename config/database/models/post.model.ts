import { model, models, Schema, Types, Document } from 'mongoose'

export interface IPost {
  title: string
  content: string
  tags: Types.ObjectId[]
  views: number
  likes: number
  comments: number
  author: Types.ObjectId
  categories: Types.ObjectId[]
  description: string
  image: Types.ObjectId
}

export interface IPostDoc extends IPost, Document {}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    categories: [
      { type: Schema.Types.ObjectId, ref: 'PostCategory', required: true },
    ],
    description: { type: String, required: true },
    image: { type: Schema.Types.ObjectId, ref: 'Media', required: true },
  },
  { timestamps: true },
)

const Post = models?.Post || model<IPost>('Post', PostSchema)

export default Post
