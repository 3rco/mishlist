import express from 'express';

import { getUserByUserName } from '../controllers/users-controllers.js';

const router = express.Router();

router.get('/:username', getUserByUserName);

export default router;
