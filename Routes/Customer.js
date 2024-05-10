import express from 'express';
import { get_all_customers, find_customer_by_id, create_customer, update_customer } from '../Controller/Customer.js';

const route_customer = express.Router();

route_customer.get('/customers', get_all_customers);
route_customer.get('/:id', find_customer_by_id);
route_customer.post('/', create_customer);
route_customer.put('/:id', update_customer);

export default route_customer;
