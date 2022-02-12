import nats, { Message } from 'node-nats-streaming'
import { randomBytes } from 'crypto'

console.clear()

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
	url: 'http://localhost:4222'
})

stan.on('connect', () => {
	console.log('listener connected to NATS')

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
