import { Publisher, Subjects, TicketUpdatedEvent } from '@ticketlabs/common'

class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated
}

export default TicketUpdatedPublisher
