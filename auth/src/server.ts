import { connectDB } from "./utils/connectDB";
import { app } from './app'

async function start() {
	await connectDB()
	
	app.listen(3001, () => {
		console.log('running on port 3001')
	})
}

try {
	start()
}catch (err) {
	console.error(err)
}
