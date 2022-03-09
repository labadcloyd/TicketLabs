import { Message } from "node-nats-streaming";
import { Subjects, Listener, PaymentCreatedEvent, NotFoundError, OrderStatus } from "@ticketlabs/common";
import { Order } from "../../models";
import { queueGroupName } from "./queue-group-name";

export default class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: PaymentCreatedEvent['data'], msg: Message): Promise<void> {
		const { id, orderId, stripeId } = data
		
		const order = await Order.findById(orderId)

		if (!order) {
			throw new NotFoundError()
		}

		order.set({
			status: OrderStatus.Complete
		})
		await order.save()

		msg.ack()
	}
}
