import express, { Request, Response } from "express";
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, UnautherizedError, validateRequest } from '@ticketlabs/common'
import { body, } from "express-validator";
import { Order, Payment, Ticket } from '../models'
import { natsWrapper } from "../natsWrapper";
import stripe from "../stripe";
import { PaymentCreatedPublisher } from "../events/publishers";

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

	const charge = await stripe.charges.create({
		currency: 'usd',
		amount: (order.price * 100),
		source: token
	})

	const payment = Payment.build({
		orderId,
		stripeId: charge.id
	})
	await payment.save()

	new PaymentCreatedPublisher(natsWrapper.client).publish({
		id: payment.id,
		orderId: payment.orderId,
		stripeId: payment.stripeId
	})

	res.status(201).send({ id: payment.id })
})

export { app as createPaymentRouter }
