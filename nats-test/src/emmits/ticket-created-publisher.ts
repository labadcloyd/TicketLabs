import { Publisher, Subjects } from "../constants";
import { TicketCreatedEvent } from "../events";

class TicketCreatedPublisher extends Publisher <TicketCreatedEvent> {
	readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

export { TicketCreatedPublisher }