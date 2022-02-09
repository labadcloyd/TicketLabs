import express from "express";

// Routes
import { createTicketRouter } from './createTicket'
import { getTicketRouter } from './getTicket'
import { getAllTicketsRouter } from './getAllTickets'

const app = express.Router()

app.use(createTicketRouter)
app.use(getTicketRouter)
app.use(getAllTicketsRouter)

export { app as ticketsRouter }
