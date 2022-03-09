import express, { Request, Response } from "express";
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, UnautherizedError, validateRequest } from '@ticketlabs/common'
import { body, } from "express-validator";
import { Order, Ticket } from '../models'
import { natsWrapper } from "../natsWrapper";

const app = express.Router()

app.post('/api/payments', requireAuth, [
	body('token').not().isEmpty().withMessage('Token must not be empty'),
	body('orderId').not().isEmpty().withMessage('OrderID must not be empty')
], 
validateRequest, async (req: Request, res: Response) => {
	const { token, orderId } = req.body

	const order = await Order.findById(orderId)

	if (!order) {
		throw new NotFoundError()
	}
	if (order.userId !== req.currentUser!.id) {
		throw new UnautherizedError()
	}
	if (order.status === OrderStatus.Cancelled) {
		throw new BadRequestError('Cannot pay for cancelled order')
	}

	
})

export { app as createPaymentRouter }
