import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const UserSchema = new Schema({
   userName: {
      type: String,
   },
   userId: {
      type: String,
   },
   userAvatar: {
      type: String,
   },
   userEmail: {
      type: String,
   },
})
