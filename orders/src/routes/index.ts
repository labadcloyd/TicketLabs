import express from "express";

// Routes
import { createTicketRouter } from './createTicket'
import { getTicketRouter } from './getTicket'
import { getAllTicketsRouter } from './getAllTickets'
import { updateTicketRouter } from './updateTicket'

const app = express.Router()

app.use(createTicketRouter)
app.use(getTicketRouter)
app.use(getAllTicketsRouter)
app.use(updateTicketRouter)

export { app as ticketsRouter }
