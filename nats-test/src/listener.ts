import nats, { Message, Stan } from 'node-nats-streaming'
import { randomBytes } from 'crypto'
import { TicketCreatedListener } from './events'

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

	new TicketCreatedListener(stan).listen()
})

// interrupted or terminated process
process.on('SIGINT', () => stan.close() )
process.on('SIGTERM', () => stan.close() )
