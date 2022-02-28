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
		const foundTicket = await Ticket.findById(id)

		if (!foundTicket) {
			throw new NotFoundError()
		}

		return res.status(200).json(foundTicket)
	} catch(err) {
		throw new NotFoundError()
	}
})

export { app as getTicketRouter }
