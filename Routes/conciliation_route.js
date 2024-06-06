// /mnt/data/conciliation_route.js
import express from 'express';
import { conciliatePayments } from '../Controller/conciliation_controller.js';

const conciliationRoute = express.Router();

conciliationRoute.post('/Administration/payments/conciliation', conciliatePayments);

export default conciliationRoute;
