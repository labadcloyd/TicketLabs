import { Publisher, Subjects, TicketCreatedEvent } from '@ticketlabs/common'

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated
}

export default TicketCreatedPublisher
