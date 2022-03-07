import { DatabaseConnectionError } from "@ticketlabs/common";
import { OrderCreatedListener } from "./events/listeners";
import { natsWrapper } from "./natsWrapper";

async function start() {
	if (
		!process.env.NATS_CLUSTER_ID || 
		!process.env.NATS_CLIENT_ID || 
		!process.env.NATS_URL
	) {
		throw new Error('JWTSECRET, MONGO_URI, NATS_CLUSTER_ID, NATS_CLIENT_ID, and NATS_URL must be defined')
	}
	try {

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

		new OrderCreatedListener(natsWrapper.client).listen()
	} catch(err) {
		console.log(err)
		throw new DatabaseConnectionError()
	}
}

try {
	start()
} catch (err) {

}
