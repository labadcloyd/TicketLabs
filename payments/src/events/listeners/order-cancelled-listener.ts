import { Message } from "node-nats-streaming";
import { Order } from "../../models";
import { queueGroupName } from "./queue-group-name";
import {
	Subjects,
	Listener,
	OrderCancelledEvent,
	NotFoundError,
	OrderStatus,
} from "@ticketlabs/common";

export default class OrderCancelledListener extends Listener<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
	queueGroupName = queueGroupName;

	async onMessage(data: OrderCancelledEvent['data'], msg: Message): Promise<void> {
		const { id, version, ticket } = data

		const order = await Order.findOne({
			_id: id,
			version: version - 1
		})

		if (!order) {
			throw new NotFoundError()
		}

		order.set({ status: OrderStatus.Cancelled })
		await order.save()
		msg.ack()
	}
}
