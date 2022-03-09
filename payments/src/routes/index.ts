import express from "express";
import { createPaymentRouter } from "./createPayment";
// Routes

const app = express.Router()

app.use(createPaymentRouter)

export { app as paymentsRouter }
