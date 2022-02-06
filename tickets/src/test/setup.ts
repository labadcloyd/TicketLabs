import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import jwt from "jsonwebtoken";

let mongo: any

declare global {
	var signin: () => string[];
}

global.signin = () => {
	// building a jwt payload
	const payload = {
		id: '234sdf2243',
		email: 'test@test.com'
	}
	// creating the jwt
	const cookieJwt = jwt.sign(payload, process.env.JWTSECRET!)
	// encoding jwt token to base 64
	const cookieObj = Buffer.from(JSON.stringify({ jwt: cookieJwt })).toString("base64")

	return [ `session=${cookieObj}==; path=/; httponly` ]
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
