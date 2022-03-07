import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@ticketlabs/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated;
	queueGroupName = queueGroupName

	async onMessage(data: OrderCreatedEvent['data'], msg: Message): Promise<void> {
		
	}

}