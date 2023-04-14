import express from 'express';

import { getSchedule, updateSchedule, resetSchedule } from '../controllers/schedule.js';

const router = express.Router();

router.post('/', updateSchedule);
router.get('/', getSchedule);
router.purge('/', resetSchedule);

export default router;