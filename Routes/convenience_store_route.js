import express from 'express';
import { savePayments } from '../Controller/convenience_store_controller.js';

const router = express.Router();

router.post('/convenience_store', savePayments);

export default router;
