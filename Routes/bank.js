import express from 'express'
import { get_all, find_one,createbank,updatebank } from '../Controller/bank.js'

const route_bank = express.Router()

route_bank.get('/bancos', get_all)
route_bank.get('/:id', find_one)
route_bank.post('/', createbank)
route_bank.put('/:id', updatebank)

export default route_bank;