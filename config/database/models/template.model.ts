import { model, models, Schema, Types, Document } from 'mongoose'

export interface IModel {}

export interface IModelDoc extends IModel, Document {}

const ModelSchema = new Schema<IModel>({}, { timestamps: true })

const Model = models?.Model || model<IModel>('Model', ModelSchema)

export default Model

// Todo делать ли Verification Code?
// Todo делать ли Verification Code?
// Todo делать ли Verification Code?
