import mongoose from 'mongoose'
import { initializeDatabase } from './config'

initializeDatabase()
.then(Promise.join([
  mongoose.model('BovadaAccount').create({username:'jonathankolman@gmail.com', password: 'testing123'}),
  mongoose.model('BovadaAccount').create({username:'elliotlanderson@yahoo.com', 'password': 'testing123'})
]).then(() => console.log('done')))
