import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import { authRouter } from './routes/.index';
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express()
app.use(json())
app.use(authRouter)

app.all('*', async () => {
	throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, () => {
	console.log('running on port 3000')
})
