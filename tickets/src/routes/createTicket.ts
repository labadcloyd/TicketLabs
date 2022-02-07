import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from '@ticketlabs/common'
import { body, } from "express-validator";
import { Ticket } from '../models'

const app = express.Router()

app.post('/api/tickets', requireAuth, [
	body('title').isString().not().isEmpty().withMessage('Must be a valid title'),
	body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
], 
validateRequest, async (req: Request, res: Response) => {
	const { title, price } = req.body

	const newTicket = Ticket.build({ title, price, userId: req.currentUser!.id })
	await newTicket.save()

	return res.status(201).json(newTicket)
})

export { app as createTicketRouter }
