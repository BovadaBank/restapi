import { Router } from 'express';
import matchRouter from './matches'
import bovadaAccountRouter from './bovadaAccounts'
import placedBetRouter from './placedBets'

let router = Router();
router.use('/api/matches', matchRouter);
router.use('/api/bovadaAccounts', bovadaAccountRouter)
router.use('/api/placedBets', placedBetRouter)

export default router
