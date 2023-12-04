import express from 'express';
import { router as usersRoute } from '../modules/users/users.route.js';
import { router as transferRoute } from '../modules/transfers/transfer.route.js';

export const router = express.Router();

router.use('/users', usersRoute);
router.use('/transfers', transferRoute);