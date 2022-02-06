import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from '@ticketlabs/common'
import { body, } from "express-validator";

const app = express.Router()

app.post('/api/tickets', requireAuth, [
	body('title').isString().not().isEmpty().withMessage('Must be a valid title'),
	body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
], 
validateRequest, async (req: Request, res: Response) => {

	return res.status(200).json({})
})

export { app as createTicketRouter }
