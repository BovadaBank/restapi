import { Router } from 'express'
import mongoose from 'mongoose'

let router = Router()

router.route('/')
  .get((req, res) => {
    mongoose.model('PlacedBet')
    .find({})
    .then(result => {
      res.json(result)
    })
  })
router.route('/count')
.get((req, res) => {
  mongoose.model('PlacedBet')
  .find({})
  .then(res => res.json(res.length))
})

router.route('/create')
.post((req, res) => {
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
  mongoose.model('PlacedBet').create({
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

router.route('/remove')
.post((req, res) => {
  mongoose.model('PlacedBet').remove({})
  .then(() => {
    res.json({statusCode:200, message:'all placed bets have been deleted'})
  })
})

router.route('/remove:id')
.post((req, res) => {
  if(!req.body.id) {
    return res.json({statusCode:500, message:'You did not supply a id for the bet that you want to remove'})
  }
  mongoose.model('PlacedBet').remove({_id:id}).then(() => {
    return res.json({statusCode: 200, message:'Bet removed successfully'})
  })
})


export default router