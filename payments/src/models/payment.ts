import { Schema, model, Model, Document as MongoDocument } from 'mongoose'

/* TYPESCRIPT BOILERPLATE */
// interface that describes the required fields to be entered to create a new model
interface ModelAttrs {
	orderId: string,
	stripeId: string,
}
// interface that describes the properties of a single mongo document
interface MongoDoc extends MongoDocument {
	orderId: string,
	stripeId: string,
}
// interface that tells typescript about the new function added to ticket model
// "Model" is a built in typescript interface and not an actual mongoose object
interface MongoModel extends Model<MongoDoc> {
	build(attrs: ModelAttrs): MongoDoc;
}

const PaymentSchema = new Schema(
	{
		orderId: {
			type: String,
			required: true
		},
		stripeId: {
			type: String,
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
	}
)

PaymentSchema.statics.build = (attrs: ModelAttrs) => {
	return new Payment(attrs)
}

const Payment = model<MongoDoc, MongoModel>('Payment', PaymentSchema)

export { Payment, MongoDoc as PaymentDoc }