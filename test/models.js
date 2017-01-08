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
        console.log('connected')
      })
      .then(done)
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
      	expect(res.body.length).to.gt(0)
      	done()
      })
  })
})