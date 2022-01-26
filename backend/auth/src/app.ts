import express from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { authRouter } from './routes';
import { errorHandler } from "./middlewares";
import { NotFoundError } from "./errors";

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

export { app }