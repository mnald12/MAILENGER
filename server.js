import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import {
   addUser,
   getUser,
   getUsers,
   updateUser,
   removeUser,
} from './methods/methods'

const app = express()
const PORT = 3002

mongoose.set('strictQuery', true)
mongoose.Promise = global.Promise
mongoose.connect(
   'mongodb+srv://mnald12:sawadasa12@base1.5j0tmkm.mongodb.net/users',
   {
      useNewUrlParser: true,
   }
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/users', (req, res) => getUsers)

app.route('/users')
   .get((req, res, next) => {
      next()
   }, getUsers)
   .post(addUser)

app.route('/users/:userId').get(getUser).put(updateUser).delete(removeUser)

app.listen(PORT, () => console.log(`running on port ${PORT}`))
