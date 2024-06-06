import express from 'express'
import {realese_pay} from '../Controller/pre_payment_gasoline_controller.js'
import {release_bomb, complete_payment} from '../Controller/post_pay_gasoline_controller.js'

const gasoline_payment_route = express.Router()

gasoline_payment_route.post('/prepaid', realese_pay)
gasoline_payment_route.post('/postpay/release_bomb',release_bomb)
gasoline_payment_route.post('/postpay/complete_payment',complete_payment)



export default gasoline_payment_route
