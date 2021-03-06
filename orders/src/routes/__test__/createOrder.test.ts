import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Order, Ticket } from '../../models';
import { OrderStatus } from '@ticketlabs/common';
import { natsWrapper } from '../../natsWrapper'

const id = new mongoose.Types.ObjectId().toHexString()

it('returns an error if the ticket does not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
	const ticket = Ticket.build({
		id: id,
		title: 'concert',
		price: 20
	})
	await ticket.save()

	const order = Order.build({
		ticket,
		userId: 'asd12',
		status: OrderStatus.Created,
		expiresAt: new Date()
	})
	await order.save()

	await request(app)
		.post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
		.expect(400)
});

it('reserves a ticket', async () => {
	const ticket = Ticket.build({
		id: id,
		title: 'concert',
		price: 20
	})
	await ticket.save()

	await request(app)
		.post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
		.expect(201)
});

it('emits an order created event', async () => {
	const ticket = Ticket.build({
		id: id,
		title: 'concert',
		price: 20
	})
	await ticket.save()

	await request(app)
		.post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
		.expect(201)
	
	expect(natsWrapper.client.publish).toHaveBeenCalled()
})