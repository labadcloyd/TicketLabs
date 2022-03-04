import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent, NotFoundError } from "@ticketlabs/common";
import { Ticket } from "../../models";
import { queueGroupName } from "./queue-group-name";

export default class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated;
	queueGroupName = queueGroupName;

	async onMessage(data: TicketUpdatedEvent['data'], msg: Message): Promise<void> {
		const { id, title, price, version } = data
		
		const ticket = await Ticket.findOne({
			_id: id,
			version: version -1
		})

		if (!ticket) {
			console.log('no ticket found')
			throw new NotFoundError()
		}

		ticket.set({ title, price })
		await ticket.save()
		msg.ack()
	}
}
