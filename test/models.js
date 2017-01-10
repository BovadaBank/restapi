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
        return Promise.all([
          mongoose.model('BovadaAccount').remove({}),
          mongoose.model('PlacedBet').remove({}),
          mongoose.model('Match').remove({})
          ])
      })
      .then(() => {
        console.log('connected and models removed')
        done()
      })
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
    .send({username:'testing@gmail.com', password:'Testing123'})
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
    .send({bovadaAccountId:123, outcomeId:123, priceId: 123, stake:2300})
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
  it('should remove all placed bets', done => {
    agent
    .post('/api/placedBets/remove')
    .then(res => {
      expect(res).to.be.ok
      return agent
              .get('/api/placedBets')
              .then(res => {
                expect(res.body).to.be.a('array')
                expect(res.body.length).to.be.eq(0)
                done()
              })
    })
  })
  it('should remove all bovadaAccounts', done => {
    agent
    .post('/api/bovadaAccounts/remove')
    .then(res => {
      expect(res).to.be.ok
      return agent
            .get('/api/bovadaAccounts')
            .then(res => {
              expect(res.body).to.be.a('array')
              expect(res.body.length).to.be.eq(0)
              done()
            })
    })
  })
})