import request from 'supertest'
import { app } from '../../app'

it('returns the details of the current user on success', async() => {
	const cookie = await signin()
	
	const response = await request(app)
    .get('/api/users/currentuser')
		.set('Cookie', cookie)
		.expect(200)
	expect(response.body.currentUser.email).toEqual('test@test.com')
});

it('responds with an auth error when unauthenticated', async() => {
	return await request(app)
    .get('/api/users/currentuser')
		.expect(401)
})