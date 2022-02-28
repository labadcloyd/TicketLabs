import express, { Request, Response } from "express";
import { DatabaseConnectionError, NotFoundError, requireAuth, UnautherizedError, validateRequest } from '@ticketlabs/common'
import { body, param, } from "express-validator";
import { Order } from '../models'
import { TicketUpdatedPublisher } from "../events/publishers";
import { natsWrapper } from "../natsWrapper";

const app = express.Router()

app.delete('/api/orders/:id', requireAuth, [
	body('title').isString().not().isEmpty().withMessage('Must be a valid title'),
	body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
	param('id').isString().not().isEmpty().withMessage('Must be a valid id')
],
validateRequest, async (req: Request, res: Response) => {
	const { currentUser } = req
	const { id } = req.params
	const { title, price } = req.body

	const newTicket = await Order.findByIdAndUpdate(
		id, 
		{ $set: { title: title, price: price } }, 
		{ new: true }
	)

	if (!newTicket) {
		throw new NotFoundError()
	}
	if (newTicket?.userId !== currentUser?.id) {
		throw new UnautherizedError()
	}

	await new TicketUpdatedPublisher(natsWrapper.client).publish({
		id: newTicket.id,
		title: newTicket.title,
		price: newTicket.price,
		userId: newTicket.userId
	})

	return res.status(200).json(newTicket)
})

export { app as deleteOrderRouter }
