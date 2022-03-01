import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from '@ticketlabs/common'
import { Order } from '../models'

const app = express.Router()

app.get('/api/orders', requireAuth, async (req: Request, res: Response) => {

	try {
		const allOrders = await Order.find({
			userId: req.currentUser!.id,
		}).populate('ticket')

		if (!allOrders) {
			return res.status(200).json([])
		}

		return res.status(200).json(allOrders)
	} catch(err) {
		throw new NotFoundError()
	}
})

export { app as getAllOrdersRouter }
