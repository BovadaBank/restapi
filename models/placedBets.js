import mongoose from 'mongoose'

const placedBetSchema = mongoose.Schema({
  edgebetId: Number,
  outcomeId: Number,
  bovadaAccountId: Number
})

export default mongoose.model('placedBets', placedBetSchema)