import { Schema, model, Model, Document as MongoDocument } from 'mongoose'

/* TYPESCRIPT BOILERPLATE */
// interface that describes the required fields to be entered to create a new model
interface ModelAttrs {
	email: string,
	password: string,
}
// interface that describes the properties of a single mongo document
interface MongoDoc extends MongoDocument {
	email: string,
	password: string,
}
// interface that tells typescript about the new function added to user model
// "Model" is a built in typescript interface and not an actual mongoose object
interface MongoModel extends Model<MongoDoc> {
	build(attrs: ModelAttrs): any;
}

const UserSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

UserSchema.statics.build = (attrs: ModelAttrs) => {
	return new User(attrs)
}

const User = model<MongoDoc, MongoModel>('User', UserSchema)

export { User }