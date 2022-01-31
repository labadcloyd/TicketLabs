import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

let mongo: any

declare global {
	var signin: () => Promise<string[]>;
}

global.signin = async () => {
	const email = 'test@test.com'
	const password = 'password'

	const res = await request(app)
		.post('/api/users/signup')
		.send({email, password})
		.expect(201)
	
	const cookie = res.get('Set-Cookie')

	return cookie
}

beforeAll(async () => {
	process.env.JWTSECRET = 'asdasdasd123'

	mongo = await MongoMemoryServer.create()
	const mongoUri = mongo.getUri()

	await mongoose.connect(mongoUri)
})

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections()

	for (let item of collections) {
		await item.deleteMany({})
	}
})

afterAll(async () => {
	await mongo.stop()
	await mongoose.connection.close()
})
