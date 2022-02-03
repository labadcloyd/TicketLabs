import mongoose from "mongoose";
import { DatabaseConnectionError } from "@ticketlabs/common";

const connectDB = async () => {
	if (!process.env.JWTSECRET) {
		throw new Error('JWTSECRET must be defined')
	}
	try {
		await mongoose.connect('mongodb://tickets-mongo-srv:27017/tickets')
		console.log('Database connected')
	} catch(err) {
		console.log(err)
		throw new DatabaseConnectionError()
	}
}

export { connectDB }