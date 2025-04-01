import mongoose, { Mongoose } from 'mongoose'
import './models'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not defined')
}

interface MongooseCache {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  var mongoose: MongooseCache
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    console.log('Using existing mongoose connection')
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { dbName: 'DB-AS-IR' })
      .then((result) => {
        console.log('Connected to MongoDB')
        return result
      })
      .catch((error) => {
        console.log('Error connecting to MongoDB', error)
        throw error
      })
  }

  cached.conn = await cached.promise

  return cached.conn
}
