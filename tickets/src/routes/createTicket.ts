import express from "express";
import { requireAuth } from '@ticketlabs/common'

const app = express.Router()

app.post('/api/tickets', requireAuth, (req, res) => {
	return res.status(200).json({})
})

export { app as createTicketRouter }
