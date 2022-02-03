import mongoose from "mongoose";
import { DatabaseConnectionError } from "@ticketlabs/common";

const connectDB = async () => {
	if (!process.env.JWTSECRET || !process.env.MONGO_URI) {
		throw new Error('JWTSECRET or MONGO_URI must be defined')
	}
	try {
		await mongoose.connect(process.env.MONGO_URI)
		console.log('Database connected')
	} catch(err) {
		console.log(err)
		throw new DatabaseConnectionError()
	}
}

export { connectDB }