import mongoose from "mongoose";
import { DatabaseConnectionError } from "../errors/.index";

const connectDB = async () => {
	if (!process.env.JWTSECRET) {
		throw new Error('JWTSECRET must be defined')
	}
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
		console.log('Database connected')
	} catch(err) {
		console.log(err)
		throw new DatabaseConnectionError()
	}
}

export { connectDB }