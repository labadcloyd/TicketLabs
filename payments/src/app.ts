import express from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { paymentsRouter } from './routes';
import { errorHandler, NotFoundError, currentUser } from "@ticketlabs/common";

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
	signed: false,
	secure: process.env.NODE_ENV !== 'test'
}))
app.use(currentUser)

app.use(paymentsRouter)

app.all('*', async () => {
	throw new NotFoundError()
})

app.use(errorHandler)

export { app }