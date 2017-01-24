import server from './server';
import { initializeDatabase } from './config';;
import mongoose from 'mongoose';
import https from 'https';


initializeDatabase()
  .then(() => {
    if (process.env.NODE_ENV === 'production')
      server.listen(5000, () => console.log('Listening of 5000'))
    if (process.env.NODE_ENV !== 'production') {
      server.listen(5000, () => console.log('Listening on 5000'))
    } else {
      https.createServer({
        passphrase: 'restapi'
      }, server).listen(process.env.PORT || 5000)
    }
  })


