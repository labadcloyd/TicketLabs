import express, { Request, Response } from "express";
import mongoose from 'mongoose'
import { body, } from "express-validator";

import {
	BadRequestError,
	NotFoundError,
	OrderStatus,
	requireAuth,
	validateRequest
} from '@ticketlabs/common'
import { natsWrapper } from "../natsWrapper";
import { OrderCreatedPublisher } from "../events/publishers";
import { Order, Ticket } from '../models'

const app = express.Router()

const EXPIRATION_WINDOW_SECONDS = (15 * 60)

app.post('/api/orders', requireAuth, [
	body('ticketId')
		.isString().not().isEmpty()
		.custom((input: string) => mongoose.Types.ObjectId.isValid(input))
		.withMessage('Must be a valid ticket ID')
], 
validateRequest, async (req: Request, res: Response) => {
	const { ticketId } = req.body
	// checking if ordered ticket exists
	const foundTicket = await Ticket.findById(ticketId)
	if (!foundTicket) {
		throw new NotFoundError()
	}
	// checking if order is already reserved
	const isReserved = await foundTicket.isReserved()
	if (isReserved) {
		throw new BadRequestError('Ticket is already reserved.')
	}
	// calculate an expiration date
	const expiration = new Date()
	expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)
	// saving the order
	const order = Order.build({
		userId: req.currentUser!.id,
		status: OrderStatus.Created,
		expiresAt: expiration,
		ticket: foundTicket
	})
	await order.save()

	new OrderCreatedPublisher(natsWrapper.client).publish({
		id: order.id,
		status: order.status,
		userId: order.userId,
		expiresAt: order.expiresAt.toISOString(),
		version: order.version,
		ticket: {
			id: foundTicket.id,
			price: foundTicket.price
		}
	})

	res.status(201).json(order)
})

export { app as createOrderRouter }
