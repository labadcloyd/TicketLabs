import express, { Request, Response } from "express";
import { NotFoundError } from '@ticketlabs/common'
import { Ticket } from '../models'

const app = express.Router()

app.get('/api/tickets', async (req: Request, res: Response) => {

	try {
		const allTickets = await Ticket.find()

		if (!allTickets) {
			return res.status(200).json([])
		}

		return res.status(200).json(allTickets)
	} catch(err) {
		throw new NotFoundError()
	}
})

export { app as getAllTicketsRouter }
