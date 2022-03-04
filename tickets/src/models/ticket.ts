import { Schema, model, Model, Document as MongoDocument, ObjectId } from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

/* TYPESCRIPT BOILERPLATE */
// interface that describes the required fields to be entered to create a new model
interface ModelAttrs {
	title: string,
	price: number,
	userId: string,
}
// interface that describes the properties of a single mongo document
interface MongoDoc extends MongoDocument {
	title: string,
	price: number,
	userId: string,
	version: number,
}
// interface that tells typescript about the new function added to ticket model
// "Model" is a built in typescript interface and not an actual mongoose object
interface MongoModel extends Model<MongoDoc> {
	build(attrs: ModelAttrs): MongoDoc;
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
	userId: {
		type: String,
		required: true
	}
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
}

)

TicketSchema.set('versionKey', 'version')
TicketSchema.plugin(updateIfCurrentPlugin)

TicketSchema.statics.build = (attrs: ModelAttrs) => {
	return new Ticket(attrs)
}

const Ticket = model<MongoDoc, MongoModel>('Ticket', TicketSchema)

export { Ticket, MongoDoc as TicketTypes }