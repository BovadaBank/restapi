import mongoose from 'mongoose'
import { initializeDatabase } from './config'

initializeDatabase()
.then(Promise.join([
  mongoose.model('BovadaAccount').create({username:'jonathankolman@gmail.com', password: 'MakingMoney1995'}),
  mongoose.model('BovadaAccount').create({username:'elliotlanderson@yahoo.com', 'password': 'Nsr10ojif??'})
]).then(() => console.log('done')))