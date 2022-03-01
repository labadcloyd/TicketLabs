import express, { Request, Response } from "express";
import { NotFoundError, requireAuth, UnautherizedError, validateRequest } from '@ticketlabs/common'
import { body, param, } from "express-validator";
import { Order } from '../models'

const app = express.Router()

app.get('/api/orders/:orderId', requireAuth, [
	param('orderId').isString().not().isEmpty().withMessage('Must be a valid id')
], 
validateRequest, async (req: Request, res: Response) => {
	const { orderId } = req.params

	const foundOrder = await Order.findById(orderId).populate('ticket')

	if (!foundOrder) {
		throw new NotFoundError()
	}
	if (foundOrder.userId !== req.currentUser!.id) {
		throw new UnautherizedError
	}

	return res.status(200).json(foundOrder)
})

export { app as getOrderRouter }
