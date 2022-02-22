import nats from 'node-nats-streaming'
import { TicketCreatedPublisher } from './emmits'

console.clear()

const stan = nats.connect('ticketing', 'abc', {
	url: 'http://localhost:4222'
})

stan.on('connect', async () => {
	console.log('publisher connected to NATS')

	const data = {
		id: '123',
		title: 'concert',
		price: 20,
		userId: 'cloyd123'
	}

	const publisher = new TicketCreatedPublisher(stan)
	try {
		await publisher.publish(data)
	} catch(err) {
		console.error(err)
	}

})