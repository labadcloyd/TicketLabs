import request from 'supertest'
import { app } from '../../app'

it('returns all the tickets', async () => {
	const cookie = global.signin()

	for (let i = 0; i < 10; i++) {
		const ticket = {
			title: `valid Title ${i}`,
			price: 20
		}
	
		const response = await request(app)
			.post('/api/tickets')
			.set('Cookie', cookie)
			.send(ticket)
		
		expect(response.statusCode).toEqual(201)
	}

	const ticketRes = await request(app)
		.get(`/api/tickets`)
		.expect(200)

	expect(ticketRes.body.length).toEqual(10)
})
