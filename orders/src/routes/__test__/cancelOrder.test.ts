import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Order, Ticket } from '../../models';
import { OrderStatus } from '@ticketlabs/common';

it('marks an order as cancelled', async () => {
	const ticket = Ticket.build({
		title: 'asda',
		price: 20
	})
	await ticket.save()

	const user = global.signin()

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
	
	await request(app)
		.delete(`/api/orders/${order.id}`)
		.set('Cookie', user)
		.expect(204)

	const updatedOrder = await Order.findById(order.id)
	expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
});

it.todo('emits an order cancelled event')