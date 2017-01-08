import mongoose from 'mongoose'

const matchSchema = mongoose.Schema({
  homeTeam: String,
  awayTeam: String,
  startTime: Date,
  gameLines: [],
  alternateLines:[]
})

export default mongoose.model('Match', matchSchema)