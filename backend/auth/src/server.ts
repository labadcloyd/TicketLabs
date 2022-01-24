import express from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { connectDB } from "./utils/connectDB";
import { authRouter } from './routes/.index';
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/.index";

connectDB()

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
	signed: false,
	secure: true
}))

app.use(authRouter)

app.all('*', async () => {
	throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, () => {
	console.log('running on port 3000')
})
