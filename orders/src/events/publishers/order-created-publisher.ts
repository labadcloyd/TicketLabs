import { Publisher, Subjects, OrderCreatedEvent } from '@ticketlabs/common'

class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated
}

export default OrderCreatedPublisher
