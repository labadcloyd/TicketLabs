import { connectDB } from "./utils/connectDB";
import { app } from './app'

connectDB()

app.listen(3000, () => {
	console.log('running on port 3000')
})
