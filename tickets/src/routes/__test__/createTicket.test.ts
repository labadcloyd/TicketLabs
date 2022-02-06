import request from 'supertest'
import { app } from '../../app'

it('has a route handler listening to /api/tickets for post requests', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.send({})
	expect(response.status).not.toEqual(404)
});

it('can only be accessed if the user is signed in', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.send({})

	expect(response.statusCode).toEqual(401)
});

it('returns a status other than 401 if the user is signed in', async () => {
	const cookie = global.signin()

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)

	expect(response.statusCode).not.toEqual(401)
})

it('returns an error if an invalid title is provided', async () => {
	const cookie = global.signin()

	await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: '',
			price: 10
		})
		.expect(400)

	await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			price: 10
		})
		.expect(400)
});

it('returns an error if an invalid price is provided', async () => {
	const cookie = global.signin()
	
	await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'Valid Title',
			price: -10
		})
		.expect(400)

	await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'Valid Title',
		})
		.expect(400)
});

it('creates a ticket with valid inputs', async () => {
	// add in a check to make sure a ticket was saved in the db

	const cookie = global.signin()

	await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'Valid Title',
			price: 20
		})
		.expect(201)
});
