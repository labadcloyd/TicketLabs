import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on successful signup', async () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201);
});

/* BASIC VALIDATION ERRORS */
it('returns a 400 on invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: '2334',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 on invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123'
    })
    .expect(400);
});

it('returns a 400 on invalid email AND password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test',
      password: '123'
    })
    .expect(400);
});

it('returns a 400 on no email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 on no password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email:'test@test.com'
    })
    .expect(400);
});

it('returns a 400 on blank object', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400);
});

/* CHECKING FOR DUPLICATE EMAILS */
it('returns a 400 on duplicated email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400)
})
