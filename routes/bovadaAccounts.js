import { Router } from 'express';
import mongoose from 'mongoose';

let router = Router();

router.route('/')
  .get((req, res)=> {
    mongoose.model('BovadaAccount')
    .find({})
    .then(result => {
      res.json(result)
    }).catch(err => res.send(err));
  })

router.route('/count')
.get((req, res) => {
  mongoose.model('BovadaAccount').find({})
  .then(result => {
    res.json(result.length)
  })
})

router.route('/create')
.post((req, res) => {
  if(!req.body.username || !req.body.password) {
    return res.json({statusCode:400, message: 'Your missing the bovada username or password'})
  }
  mongoose.model('BovadaAccount').create({
    username: req.body.username,
    password: req.body.password
  })
  .then((obj) => res.json({statusCode:200, message:'Bovada account created successfully!', payload:obj}))
})

router.route('/remove')
.post((req, res) => {
  mongoose.model('BovadaAccount').remove({})
  .then(() => res.json({statusCode:200, message: 'all Bovada accounts have been removed'}))
  .catch(err => res.json({statusCode: 500, message: 'Internal Server Error'}))
})

router.route('/remove:id')
.post((req, res) => {
  if(!req.body.id) {
    return res.json({statusCode: 500, message:'You did not specify a id'})
  }
  mongoose.model('BovadaAccount').remove({_id:req.body.id})
  .then(() => res.json({statusCode: 200, message: 'Bovada account has been deleted'}))
})

export default router;