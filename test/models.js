import { expect } from 'chai'
require('../config')
require('../models')
import mongoose from 'mongoose'
import server from '../server'
import request from 'supertest'

let agent

describe('Model tests', () => {

  before(done => {
    agent = request.agent(server)
    mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => {
        return mongoose.model('BovadaAccount').remove({})
      })
      .then(() => {
        console.log('connected')
        done()
      })
      .catch(done)
  });

  after(done => {
    mongoose.model('Match').find({}).remove()
	  .then(() => mongoose.disconnect(done))
	  .catch(done)
  });

  it('Should get all matches', done => {
    agent
      .get('/api/matches')
      .then(res => {
        console.log(res.body)
      	expect(res.body).to.be.a('array');
      	expect(res.body.length).to.eq(0)
      	done()
      })
  })
  it('should create a bovada account', done => {
    agent
    .post('/api/bovadaAccounts/create')
    .send({username:'testing@gmail.com', password:'testing'})
    .then(res => {
      expect(res).to.be.ok
      done()

    })
  })
  it('should get all bovada accounts', done => {
    agent
    .get('/api/bovadaAccounts')
    .then(res => {
      expect(res.body).to.be.a('array')
      expect(res.body.length).to.eq(1)
      done()
    })
  })
  it('should save a bet', done => {
    agent
    .post('/api/placedBets/create')
    .send({bovadaAccountId:123, outcomeId:123, priceId: 123})
    .then(res => {
      expect(res).to.be.ok
      done()
    })
  })
  it('should get all placed bets', done => {
    agent
    .get('/api/placedBets')
    .then(res => {
      expect(res.body).to.be.a('array')
      console.log(res.body)
      done()
    })
  })
})