import express, { Request, Response } from "express";
import { DatabaseConnectionError, NotFoundError, requireAuth, UnautherizedError, validateRequest } from '@ticketlabs/common'
import { body, param, } from "express-validator";
import { Ticket, TicketTypes } from '../models'

const app = express.Router()

app.put('/api/tickets/:id', requireAuth, [
	body('title').isString().not().isEmpty().withMessage('Must be a valid title'),
	body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
	param('id').isString().not().isEmpty().withMessage('Must be a valid id')
],
validateRequest, async (req: Request, res: Response) => {
	const { currentUser } = req
	const { id } = req.params
	const { title, price } = req.body

	const newTicket = await Ticket.findById(id)

	if (!newTicket) {
		throw new NotFoundError()
	}
	if (newTicket?.userId !== currentUser?.id) {
		throw new UnautherizedError()
	}

	newTicket.title = title
	newTicket.price = price
	await newTicket.save()

	return res.status(200).json(newTicket)
})

export { app as updateTicketRouter }
