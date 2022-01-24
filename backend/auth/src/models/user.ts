import { Schema, model, Model, Document as MongoDocument, ObjectId } from 'mongoose'
import { Password } from '../utils'

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
	_id: ObjectId
}
// interface that tells typescript about the new function added to user model
// "Model" is a built in typescript interface and not an actual mongoose object
interface MongoModel extends Model<MongoDoc> {
	build(attrs: ModelAttrs): MongoDoc;
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
},
// Changing how mongoose will return the object once it is sent over to the client
{
	toJSON: {
		transform(doc, ret){
			ret.id = ret._id
			delete ret._id
			delete ret.password
			delete ret.__v
		}
	}
}

)

// Hashing password before saving
// NOT Using arrow functions because middleware functions use "this" in trying to access the data
UserSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashedPassword = await Password.toHash(this.get('password'))
		this.set('password', hashedPassword)
	}
	done()
})

UserSchema.statics.build = (attrs: ModelAttrs) => {
	return new User(attrs)
}

const User = model<MongoDoc, MongoModel>('User', UserSchema)

export { User }