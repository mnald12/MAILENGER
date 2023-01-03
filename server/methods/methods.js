import mongoose from 'mongoose'
import { UserSchema } from '../schema/schema'

const User = mongoose.model('User', UserSchema)

export const addUser = (req, res) => {
   let newUser = new User(req.body)

   newUser.save((err, user) => {
      if (err) {
         res.send(err)
      }
      res.json(user)
   })
}

export const getUsers = (req, res) => {
   User.find({}, (err, user) => {
      if (err) {
         res.send(err)
      }
      res.json(user)
   })
}

export const getUser = (req, res) => {
   User.findById(req.params.userId, (err, user) => {
      if (err) {
         res.send(err)
      }
      res.json(user)
   })
}

export const updateUser = (req, res) => {
   User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true, useFindAndModify: false },
      (err, user) => {
         if (err) {
            res.send(err)
         }
         res.json(user)
      }
   )
}

export const removeUser = (req, res) => {
   User.deleteOne({ _id: req.params.userId }, (err, user) => {
      if (err) {
         res.send(err)
      }
      res.json({ message: 'successfuly remove the user' })
   })
}
