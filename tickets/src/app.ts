import express from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { ticketsRouter } from './routes';
import { errorHandler, NotFoundError } from "@ticketlabs/common";

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
	signed: false,
	secure: process.env.NODE_ENV !== 'test'
}))

app.use(ticketsRouter)

app.all('*', async () => {
	throw new NotFoundError()
})

app.use(errorHandler)

export { app }