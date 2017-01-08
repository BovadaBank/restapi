import { Router } from 'express'
import mongoose from 'mongoose'

let router = Router()

router.route('/')
  .get((req, res) => {
    mongoose.model('placedBets')
    .find({})
    .then(result => {
      res.json(result)
    })
  })
router.route('/count')
.get((req, res) => {
  mongoose.model('placedBets')
  .find({})
  .then(res => res.json(res.length))
})

router.route('/create')
.post((req, res) => {
  console.log('creating bet...', req.body.bovadaAccountId)
  console.log(req.body.outcomeId)
  console.log(req.body.edgebetId)
  console.log(req.body.bovadaAccountId)
  if(!req.body.outcomeId) {
    console.log('no outcome id')
    return res.json({statusCode:400, message:'You need an outcome id'})
  }
  if(!req.body.edgebetId) {
    console.log('no edgebet id')
    return res.json({statusCode:400, message: 'You need an edgebet id'})
  }
  if(!req.body.bovadaAccountId) {
    console.log('no bovadaAccountId')
    return res.json({statusCode:400, message: 'You need a bovada account id'})
  }
  mongoose.model('placedBets').create({
    bovadaAccountId: req.body.bovadaAccountId,
    outcomeId: req.body.outcomeId,
    edgebetId: req.body.edgebetId
  })
  .then((obj) => {
    obj.save()
    console.log('bet saved successfully')
    return res.json({statusCode: 200, message:'Bet saved successfully'})
  })
})
export default router