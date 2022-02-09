import express from "express";

// Routes
import { createTicketRouter } from './createTicket'
import { getTicketRouter } from './getTicket'

const app = express.Router()

app.use(createTicketRouter)
app.use(getTicketRouter)

export { app as ticketsRouter }
