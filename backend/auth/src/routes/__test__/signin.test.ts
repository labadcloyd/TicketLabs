import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on successful signin', async () => {
  await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201);

	const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200)
  return expect(response.get('Set-Cookie')).toBeDefined
});