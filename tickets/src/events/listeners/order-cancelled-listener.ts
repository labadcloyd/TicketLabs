import { Message } from "node-nats-streaming";
import { Subjects, Listener, OrderCancelledEvent, NotFoundError } from "@ticketlabs/common";
import { Ticket } from "../../models";
import { queueGroupName } from "./queue-group-name";
import { TicketUpdatedPublisher } from "../publishers";

export default class OrderCancelledListener extends Listener<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
	queueGroupName = queueGroupName;

	async onMessage(data: OrderCancelledEvent['data'], msg: Message): Promise<void> {
		const ticket = await Ticket.findById(data.ticket.id)

		if (!ticket) {
			throw new NotFoundError()
		}

		ticket.set({ orderId: data.id })
		await ticket.save()

		await new TicketUpdatedPublisher(this.client).publish({
			id: ticket.id,
			price: ticket.price,
			title: ticket.title,
			userId: ticket.userId,
			orderId: ticket.orderId,
			version: ticket.version
		})

		msg.ack()
	}
}
