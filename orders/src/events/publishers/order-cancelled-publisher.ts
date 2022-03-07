import { Publisher, Subjects, OrderCancelledEvent } from '@ticketlabs/common'

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled
}

export default OrderCancelledPublisher
