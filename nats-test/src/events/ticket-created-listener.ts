import { Message } from 'node-nats-streaming'
import { Listener, Subjects, TicketCreatedEvent } from "@ticketlabs/common";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
	// this part can also be written like this
	// subject: Subjects.TicketCreated = Subjects.TicketCreated;
	// because typescript will think that this field will get overwritten
	// if we don't manually overwrite it
	
	// this is a short hand for the previous line
	readonly subject = Subjects.TicketCreated;
	queueGroupName = 'payments-service';
	onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
		console.log('Event data!', data)

		msg.ack()
	}
}
export { TicketCreatedListener }