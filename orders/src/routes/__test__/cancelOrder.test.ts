import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Order, Ticket } from '../../models';
import { OrderStatus } from '@ticketlabs/common';
import { natsWrapper } from '../../natsWrapper'

const id = new mongoose.Types.ObjectId().toHexString()

it('marks an order as cancelled', async () => {
	const ticket = Ticket.build({
		id: id,
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

it('emits an order cancelled event', async () => {
	const ticket = Ticket.build({
		id: id,
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

	expect(natsWrapper.client.publish).toHaveBeenCalled()
})