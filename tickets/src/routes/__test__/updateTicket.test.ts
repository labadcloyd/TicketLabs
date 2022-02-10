import request from 'supertest'
import { app } from '../../app'

// it('returns a 404 if the provided id does not exist', async () => {
	
// })

// it('returns a 401 if the user is not authenticated', async () => {
	
// })

// it('returns a 401 if the user does not own the ticket', async () => {
	
// })

// it('returns a 400 if the user provides an invalid title or price', async () => {
	
// })

it('updates the ticket provided valid inputs', async () => {
	const cookie = global.signin()

	// Creating Ticket
	const ticket = {
		title: 'valid Title',
		price: 20
	}

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send(ticket)
		.expect(201)

	// Updating ticket
	const newTicket = {
		title: 'valid Title Premium',
		price: 30
	}

	const ticketRes = await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send(newTicket)
		.expect(200)

	expect(ticketRes.body.title).toEqual(newTicket.title)
	expect(ticketRes.body.price).toEqual(newTicket.price)

	// Verifying Ticket is updated
	const updatedTicketRes = await request(app)
		.get(`/api/tickets/${ticketRes.body.id}`)
		.expect(200)

	expect(updatedTicketRes.body.title).toEqual(newTicket.title)
	expect(updatedTicketRes.body.price).toEqual(newTicket.price)
})
