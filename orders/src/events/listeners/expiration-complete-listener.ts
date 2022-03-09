import { Message } from "node-nats-streaming";
import { Order } from "../../models";
import { queueGroupName } from "./queue-group-name";
import { OrderCancelledPublisher } from "../publishers";
import {
	Subjects,
	Listener,
	ExpirationCompleteEvent,
	NotFoundError,
	OrderStatus
} from "@ticketlabs/common";

export default class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
	readonly subject = Subjects.ExpirationComplete;
	queueGroupName = queueGroupName;

	async onMessage(data: ExpirationCompleteEvent['data'], msg: Message): Promise<void> {
		const { orderId } = data

		const order = await Order.findById(orderId).populate('ticket')
	
		if (!order) {
			throw new NotFoundError()
		}
		if (order.status === OrderStatus.Complete) {
			return msg.ack()
		}

		order.set({
			status: OrderStatus.Cancelled
		})
		await order.save()
		
		await new OrderCancelledPublisher(this.client).publish({
			id: order.id,
			version: order.version,
			ticket: {
				id: order.ticket.id,
				price: order.ticket.price
			}
		})
		msg.ack()
	}
}
