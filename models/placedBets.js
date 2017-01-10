import mongoose from 'mongoose'

const placedBetSchema = mongoose.Schema({
  edgebetId: Number,
  outcomeId: Number,
  bovadaAccountId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('PlacedBet', placedBetSchema)