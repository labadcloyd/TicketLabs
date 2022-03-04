import { Schema, model, Model, Document as MongoDocument, ObjectId } from 'mongoose'
import { Order } from './order'
import { OrderStatus } from '@ticketlabs/common'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

/* TYPESCRIPT BOILERPLATE */
// interface that describes the required fields to be entered to create a new model
interface ModelAttrs {
	id: string,
	title: string,
	price: number,
}
// interface that describes the properties of a single mongo document
interface MongoDoc extends MongoDocument {
	title: string,
	price: number,
	version: number,
	isReserved(): Promise<Boolean>
}
// interface that tells typescript about the new function added to ticket model
// "Model" is a built in typescript interface and not an actual mongoose object
interface MongoModel extends Model<MongoDoc> {
	build(attrs: ModelAttrs): MongoDoc;
	findByEvent(event: { id: string, version: number }): Promise<MongoDoc | null>;
}

const TicketSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		min: 0,
		required: true
	},
},
// Changing how mongoose will return the object once it is sent over to the client
{
	timestamps: true,
	toJSON: {
		transform(doc, ret){
			ret.id = ret._id
			delete ret._id
		}
	}
})

TicketSchema.set('versionKey', 'version')
TicketSchema.plugin(updateIfCurrentPlugin)

TicketSchema.statics.findByEvent = (event: { id: string, version: number }) => {
	return Ticket.findOne({
		_id: event.id,
		version: event.version - 1
	})
}
TicketSchema.statics.build = (attrs: ModelAttrs) => {
	return new Ticket({
		_id: attrs.id,
		title: attrs.title,
		price: attrs.price
	})
}
TicketSchema.methods.isReserved = async function () {
	const reservedOrder = await Order.findOne({
		ticket: this,
		status: {
			$in: [
				OrderStatus.Created,
				OrderStatus.AwaitingPayment,
				OrderStatus.Complete
			]
		}
	})
	return !!reservedOrder
}

const Ticket = model<MongoDoc, MongoModel>('Ticket', TicketSchema)

export { Ticket, MongoDoc as TicketDoc }