import { Schema, model } from 'mongoose'

interface UserAttrs {
	email: string,
	password: string,
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

const User = model('User', UserSchema)

const newUser = (attrs: UserAttrs) => {
	return new User(attrs)
}

export { newUser }