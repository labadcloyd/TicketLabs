import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Order, Ticket } from '../../models';
import { OrderStatus } from '@ticketlabs/common';


const buildTicket = async () => {
	const id = new mongoose.Types.ObjectId().toHexString()
	const ticket = Ticket.build({
		id: id,
		title: 'concert',
		price: 20
	})
	await ticket.save()

	return ticket
}

it('fetches orders for a particular user', async () => {
	const ticketOne = await buildTicket()
	const ticketTwo = await buildTicket()
	const ticketThree = await buildTicket()

	const userOne = global.signin()
	const userTwo = global.signin()
	const userThree = global.signin()

	const { body: orderOne } = await request(app)
		.post('/api/orders')
		.set('Cookie', userTwo)
		.send({ ticketId: ticketOne.id })
		.expect(201)
	const { body: orderTwo }= await request(app)
		.post('/api/orders')
		.set('Cookie', userTwo)
		.send({ ticketId: ticketTwo.id })
		.expect(201)

	const response = await request(app)
		.get('/api/orders')
		.set('Cookie', userTwo)
		.expect(200)

	expect(response.body.length).toEqual(2)
	expect(response.body[0].id).toEqual(orderOne.id)
	expect(response.body[1].id).toEqual(orderTwo.id)
	expect(response.body[0].ticket.id).toEqual(ticketOne.id)
	expect(response.body[1].ticket.id).toEqual(ticketTwo.id)
});
