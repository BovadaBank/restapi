import { Router } from 'express';
import mongoose from 'mongoose';

let router = Router();

router.route('/')
  .get((req, res)=> {
    mongoose.model('Match')
    .find({})
    .then(result => {
      res.json(result)
    }).catch(err => res.send(err));
  })

router.route('/count')
.get((req, res) => {
  mongoose.model('Match').find({})
  .then(result => {
    res.json(result.length)
  })
})
router.route('/sport/:name')
.get((req, res) => {
  let sportName = req.params.name.toLowerCase()
  let final = []
  mongoose.model('Match').find({}).then(results => {
    return results.filter(result => {
      let {gameLines} = result
      if(gameLines)
        gameLines.forEach(gameline => {
          let {itemList} = gameline
          itemList.forEach(item => {
            if(item.sportCode.toLowerCase() === sportName) {
              final.push(result)
            }
          })
        })
    })
  }).then(() => res.json(final))

})

  export default router;