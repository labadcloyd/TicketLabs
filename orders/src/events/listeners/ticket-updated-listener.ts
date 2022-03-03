import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent, NotFoundError } from "@ticketlabs/common";
import { Ticket } from "../../models";
import { queueGroupName } from "./queue-group-name";

export default class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated;
	queueGroupName = queueGroupName;

	async onMessage(data: TicketUpdatedEvent['data'], msg: Message): Promise<void> {
		const { id, title, price } = data
		
		const ticket = await Ticket.findByIdAndUpdate(
			id, 
			{ $set: { title: title, price: price } }
		)

		if (!ticket) {
			throw new NotFoundError()
		}

		msg.ack()
	}
}
