import express from 'express'
import { get_all, find_one, create_service, update_service } from '../Controller/Service.js'

const route_service = express.Router()

route_service.get('/', get_all)
route_service.get('/:id', find_one)
route_service.post('/', create_service)
route_service.put('/:id', update_service)


export default route_service
