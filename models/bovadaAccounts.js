import mongoose from 'mongoose'

const bovadaAccountSchema = mongoose.Schema({
  username: String,
  password: String
})

export default mongoose.model('BovadaAccount', bovadaAccountSchema)