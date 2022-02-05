import express from "express";

// Routes
import { createTicketRouter } from './createTicket'
// import { signinRouter } from './signin'
// import { signupRouter } from './signup'
// import { signoutRouter } from './signout'

const app = express.Router()

app.use(createTicketRouter)

export { app as ticketsRouter }
