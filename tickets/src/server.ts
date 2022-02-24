import { connectDB, natsWrapper } from "./utils";
import { app } from './app'

async function start() {
	await natsWrapper.connect('ticketing', 'uniqueID', 'http://nats-srv:4222')
	// gracefully shutting down nats listener
	natsWrapper.client.on('close', () => {
		console.log('NATS connection closed')
		process.exit()
	})
	// interrupted or terminated process
	process.on('SIGINT', () => natsWrapper.client.close() )
	process.on('SIGTERM', () => natsWrapper.client.close() )

	await connectDB()
	
	app.listen(3002, () => {
		console.log('running on port 3002')
	})
}

try {
	start()
} catch (err) {

}
