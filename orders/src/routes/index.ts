import express from "express";

// Routes
import { createOrderRouter } from './createOrder'
import { getOrderRouter } from './getOrder'
import { getAllOrdersRouter } from './getAllOrders'
import { cancelOrderRouter } from './cancelOrder'

const app = express.Router()

app.use(createOrderRouter)
app.use(getOrderRouter)
app.use(getAllOrdersRouter)
app.use(cancelOrderRouter)

export { app as OrdersRouter }
