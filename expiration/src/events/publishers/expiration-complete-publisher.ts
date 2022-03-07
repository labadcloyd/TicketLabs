import { ExpirationCompleteEvent, Publisher, Subjects } from "@ticketlabs/common";

export default class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
	readonly subject = Subjects.ExpirationComplete
}