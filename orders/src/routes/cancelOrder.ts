import express, { Request, Response } from "express";
import { NotFoundError, OrderStatus, requireAuth, UnautherizedError } from '@ticketlabs/common'
import { Order } from '../models'

const app = express.Router()

app.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
	const { orderId } = req.params

	const order = await Order.findById(orderId)

	if (!order) {
		throw new NotFoundError()
	}
	if (order.userId !== req.currentUser!.id) {
		throw new UnautherizedError()
	}

	order.status = OrderStatus.Cancelled
	await order.save()

	return res.status(204).json(order)
})

export { app as cancelOrderRouter }
