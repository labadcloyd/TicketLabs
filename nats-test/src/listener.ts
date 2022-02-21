import nats, { Message } from 'node-nats-streaming'
import { randomBytes } from 'crypto'

console.clear()

const clientID = randomBytes(4).toString('hex')

const stan = nats.connect('ticketing', clientID, {
	url: 'http://localhost:4222'
})

stan.on('connect', () => {
	console.log('listener connected to NATS')

	// gracefully shutting down server
	stan.on('close', () => {
		console.log('NATS connection closed')
		process.exit()
	})

	const options = stan.subscriptionOptions()
	// Disabling default behavior of automatically return a success response
		.setManualAckMode(true)

	const subscription = stan.subscribe(
		'ticket:created', 
		'orders-service-queue-group',
		options
	)
	
	subscription.on('message', (msg: Message) => {
		const data = msg.getData()

		if (typeof data === 'string') {
			console.log(`Received event #${msg.getSequence()}, With data: ${data}`)
		}

		// Manually returning a success response back to publisher
		msg.ack()
	})

})

// interrupted or terminated process
process.on('SIGINT', () => stan.close() )
process.on('SIGTERM', () => stan.close() )
