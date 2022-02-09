import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'

it('returns a 404 if the ticket is not found', async () => {
	const id = new mongoose.Types.ObjectId().toHexString()

	const response = await request(app)
		.get(`/api/tickets/${id}`)

	expect(response.statusCode).toEqual(404)
})

it('returns the ticket if it is found', async () => {
	const cookie = global.signin()

	const ticket = {
		title: 'valid Title',
		price: 20
	}

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send(ticket)
	
	expect(response.statusCode).toEqual(201)

	const ticketRes = await request(app)
		.get(`/api/tickets/${response.body.id}`)
		.expect(200)

	expect(ticketRes.body.title).toEqual(ticket.title)
	expect(ticketRes.body.price).toEqual(ticket.price)
})
