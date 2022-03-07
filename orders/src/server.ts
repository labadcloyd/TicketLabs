import { DatabaseConnectionError } from "@ticketlabs/common";
import { natsWrapper } from "./natsWrapper";
import mongoose from "mongoose";
import { app } from './app'
import { TicketCreatedListener, TicketUpdatedListener } from './events/listeners' 
import ExpirationCompleteListener from "./events/listeners/expiration-complete-listener";

async function start() {
	if (
		!process.env.JWTSECRET || 
		!process.env.MONGO_URI || 
		!process.env.NATS_CLUSTER_ID || 
		!process.env.NATS_CLIENT_ID || 
		!process.env.NATS_URL
	) {
		throw new Error('JWTSECRET, MONGO_URI, NATS_CLUSTER_ID, NATS_CLIENT_ID, and NATS_URL must be defined')
	}
	try {
		// connecting database
		await mongoose.connect(process.env.MONGO_URI)
		console.log('Database connected')

		// connecting to nats event bus
		await natsWrapper.connect(
			process.env.NATS_CLUSTER_ID, 
			process.env.NATS_CLIENT_ID, 
			process.env.NATS_URL
		)
		// gracefully shutting down nats listener
		natsWrapper.client.on('close', () => {
			console.log('NATS connection closed')
			process.exit()
		})
		// interrupted or terminated process
		process.on('SIGINT', () => natsWrapper.client.close() )
		process.on('SIGTERM', () => natsWrapper.client.close() )

		new TicketCreatedListener(natsWrapper.client).listen()
		new TicketUpdatedListener(natsWrapper.client).listen()
		new ExpirationCompleteListener(natsWrapper.client).listen()
	} catch(err) {
		console.log(err)
		throw new DatabaseConnectionError()
	}
	
	app.listen(3003, () => {
		console.log('running on port 3002')
	})
}

try {
	start()
} catch (err) {

}
