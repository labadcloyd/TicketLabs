import { Publisher, Subjects, PaymentCreatedEvent } from '@ticketlabs/common'

class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated
}

export default PaymentCreatedPublisher
