import { Router } from 'express';
import matchRouter from './matches'
import bovadaAccountRouter from './bovadaAccounts'

let router = Router();
router.use('/api/matches', matchRouter);
router.use('/api/bovadaAccounts', bovadaAccountRouter)

export default router
