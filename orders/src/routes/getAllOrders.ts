import express, { Request, Response } from "express";
import { NotFoundError } from '@ticketlabs/common'
import { Order } from '../models'

const app = express.Router()

app.get('/api/orders', async (req: Request, res: Response) => {

	try {
		const allOrders = await Order.find()

		if (!allOrders) {
			return res.status(200).json([])
		}

		return res.status(200).json(allOrders)
	} catch(err) {
		throw new NotFoundError()
	}
})

export { app as getAllOrdersRouter }
