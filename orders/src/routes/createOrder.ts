import express, { Request, Response } from "express";
import mongoose from 'mongoose'
import { body, } from "express-validator";
import { TicketCreatedPublisher } from "../events/publishers";
import { requireAuth, validateRequest } from '@ticketlabs/common'
import { natsWrapper } from "../natsWrapper";
import { Order, Ticket } from '../models'

const app = express.Router()

app.post('/api/orders', requireAuth, [
	body('ticketId')
		.isString().not().isEmpty()
		.custom((input: string) => mongoose.Types.ObjectId.isValid(input))
		.withMessage('Must be a valid ticket ID')
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
