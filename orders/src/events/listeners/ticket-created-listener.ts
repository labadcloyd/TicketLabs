import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@ticketlabs/common";
import { Ticket } from "../../models";
import { queueGroupName } from "./queue-group-name";

export default class TicketCreatedListener extends Listener<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: TicketCreatedEvent['data'], msg: Message): Promise<void> {
		const { id, title, price } = data

		const ticket = Ticket.build({ id, title, price })
		await ticket.save()
		msg.ack()
	}
}
