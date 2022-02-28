import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from '@ticketlabs/common'
import { body, } from "express-validator";
import { Order } from '../models'
import { TicketCreatedPublisher } from "../events/publishers";
import { natsWrapper } from "../natsWrapper";

const app = express.Router()

app.post('/api/orders', requireAuth, [
	body('title').isString().not().isEmpty().withMessage('Must be a valid title'),
	body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
], 
validateRequest, async (req: Request, res: Response) => {
	const { title, price } = req.body

	const newOrder = Order.build({ title, price, userId: req.currentUser!.id })
	await newOrder.save()

	await new TicketCreatedPublisher(natsWrapper.client).publish({
		id: newOrder.id,
		title: newOrder.title,
		price: newOrder.price,
		userId: newOrder.userId
	})

	return res.status(201).json(newOrder)
})

export { app as createOrderRouter }
