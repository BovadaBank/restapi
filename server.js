import './config'
import express from 'express'
import bodyParser from 'body-parser'
import router from './routes'
import cors from 'cors'

let app = express()

app.use(cors())
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }))
app.use(router)

export default app
