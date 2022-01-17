import express from "express";
import { json } from "body-parser";
import { authRouter } from './routes/.index'

const app = express()
app.use(json())
app.use(authRouter)

app.listen(3000, () => {
	console.log('running on port 3000')
})
