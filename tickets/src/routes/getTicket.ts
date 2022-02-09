import express, { Request, Response } from "express";
import { NotFoundError, requireAuth, validateRequest } from '@ticketlabs/common'
import { body, param, } from "express-validator";
import { Ticket } from '../models'

const app = express.Router()

app.get('/api/tickets/:id', [
	param('id').isString().not().isEmpty().withMessage('Must be a valid id')
], 
validateRequest, async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const newTicket = await Ticket.findById(id)

		if (!newTicket) {
			throw new NotFoundError()
		}

		return res.status(200).json(newTicket)
	} catch(err) {
		throw new NotFoundError()
	}
})

export { app as getTicketRouter }
