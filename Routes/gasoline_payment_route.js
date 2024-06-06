import express from 'express'
import {realese_pay} from '../Controller/pre_payment_gasoline_controller.js'
import {release_bomb} from '../Controller/post_pay_gasoline_controller.js'

const gasoline_payment_route = express.Router()

gasoline_payment_route.post('/prepaid', realese_pay)
gasoline_payment_route.post('/postpay/release_bomb',release_bomb)



export default gasoline_payment_route
