import { model, models, Schema, Types, Document } from 'mongoose'

export interface ICollection {
  author: Types.ObjectId
  post: Types.ObjectId
}

export interface ICollectionDoc extends ICollection, Document {}

const CollectionSchema = new Schema<ICollection>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true },
)

const Collection =
  models?.Collection || model<ICollection>('Collection', CollectionSchema)

export default Collection
