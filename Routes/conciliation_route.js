// Routes/conciliation_route.js

import express from 'express';
import { conciliatePayments } from '../Controller/conciliation_controller.js';

const conciliationRoute = express.Router();

conciliationRoute.post('/conciliation', conciliatePayments); // Ruta para realizar la conciliación de pagos

export default conciliationRoute;
