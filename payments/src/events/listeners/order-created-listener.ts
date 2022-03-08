import { Message } from "node-nats-streaming";
import { Order } from "../../models";
import { queueGroupName } from "./queue-group-name";
import {
	Subjects,
	Listener,
	OrderCreatedEvent,
} from "@ticketlabs/common";

export default class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: OrderCreatedEvent['data'], msg: Message): Promise<void> {
		const { id, version, status, userId, ticket } = data

		const order = Order.build({	id, price: ticket.price, status, userId, version })
		await order.save()

		msg.ack()
	}
}
