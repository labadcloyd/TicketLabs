import express, { Request, Response } from "express";
import { NotFoundError, requireAuth, validateRequest } from '@ticketlabs/common'
import { body, param, } from "express-validator";
import { Order } from '../models'

const app = express.Router()

app.get('/api/orders/:id', [
	param('id').isString().not().isEmpty().withMessage('Must be a valid id')
], 
validateRequest, async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const foundOrder = await Order.findById(id)

		if (!foundOrder) {
			throw new NotFoundError()
		}

		return res.status(200).json(foundOrder)
	} catch(err) {
		throw new NotFoundError()
	}
})

export { app as getOrderRouter }
