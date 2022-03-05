import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { Ticket } from '../../models';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'aslkdfj',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'aslkdfj',
      price: 20,
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asldkfj',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'alskdjflskjdf',
      price: 1000,
    })
    .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asldkfj',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'alskdfjj',
      price: -10,
    })
    .expect(400);
});

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

it('rejects an edit to a reserved ticket', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asldkfj',
      price: 20,
    });

  const ticket = await Ticket.findById(response.body.id)
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString })
  await ticket!.save()

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 20,
    })
    .expect(400);
})
