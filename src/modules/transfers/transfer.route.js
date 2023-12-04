import express from 'express';
import { makeTransfer } from './transfer.controller.js';

export const router = express.Router();

router.post('/', makeTransfer);