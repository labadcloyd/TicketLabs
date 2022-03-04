import express, { Request, Response } from "express";

import { NotFoundError, OrderStatus, requireAuth, UnautherizedError } from '@ticketlabs/common'
import { Order } from '../models'
import { OrderCancelledPublisher } from "../events/publishers";
import { natsWrapper } from "../natsWrapper";

const app = express.Router()

app.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
	const { orderId } = req.params

	const order = await Order.findById(orderId).populate('ticket')

	if (!order) {
		throw new NotFoundError()
	}
	if (order.userId !== req.currentUser!.id) {
		throw new UnautherizedError()
	}

	order.status = OrderStatus.Cancelled
	await order.save()

	new OrderCancelledPublisher(natsWrapper.client).publish({
		id: order.id,
		version: order.version,
		ticket: {
			id: order.ticket.id,
			price: order.ticket.price
		}
	})

	return res.status(204).json(order)
})

export { app as cancelOrderRouter }
