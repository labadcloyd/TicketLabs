import { connectDB, natsWrapper } from "./utils";
import { app } from './app'

async function start() {
	await natsWrapper.connect('ticketing', 'uniqueID', 'http://nats-srv:4222')
	await connectDB()
	
	app.listen(3002, () => {
		console.log('running on port 3002')
	})
}

try {
	start()
} catch (err) {

}
