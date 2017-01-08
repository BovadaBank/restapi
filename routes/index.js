import { Router } from 'express';
import matchRouter from './matches'

let router = Router();
router.use('/api/matches', matchRouter);

export default router
