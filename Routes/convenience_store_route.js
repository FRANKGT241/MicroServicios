import express from 'express';
import { save_convenience_store } from '../Controller/convenience_store_controller.js';

const convenience_store_route = express.Router();

convenience_store_route.post('/save', save_convenience_store);

export default convenience_store_route;

