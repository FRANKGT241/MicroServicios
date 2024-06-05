import express from 'express'
import { get_all, find_one, create, update } from '../Controller/type_pay_controller.js'

const route_type_pay = express.Router()


route_type_pay.get('/', get_all)
route_type_pay.get('/:id', find_one)
route_type_pay.post('/', create)
route_type_pay.put('/:id', update)

export default route_type_pay