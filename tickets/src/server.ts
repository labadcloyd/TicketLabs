import { DatabaseConnectionError } from "@ticketlabs/common";
import { natsWrapper } from "./natsWrapper";
import mongoose from "mongoose";
import { app } from './app'

async function start() {
	if (!process.env.JWTSECRET || !process.env.MONGO_URI) {
		throw new Error('JWTSECRET or MONGO_URI must be defined')
	}
	try {
		// connecting database
		await mongoose.connect(process.env.MONGO_URI)
		console.log('Database connected')

		// connecting to nats event bus
		await natsWrapper.connect('ticketing', 'uniqueID', 'http://nats-srv:4222')
		// gracefully shutting down nats listener
		natsWrapper.client.on('close', () => {
			console.log('NATS connection closed')
			process.exit()
		})
		// interrupted or terminated process
		process.on('SIGINT', () => natsWrapper.client.close() )
		process.on('SIGTERM', () => natsWrapper.client.close() )
	} catch(err) {
		console.log(err)
		throw new DatabaseConnectionError()
	}
	
	app.listen(3002, () => {
		console.log('running on port 3002')
	})
}

try {
	start()
} catch (err) {

}
