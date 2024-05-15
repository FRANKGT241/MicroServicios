import express from 'express';
import { getHelloWorld } from '../Controller/text_controller.js';

const router = express.Router();
router.get('/', getHelloWorld);

export default router;