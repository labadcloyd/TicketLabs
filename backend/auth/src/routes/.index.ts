import express from "express";

// Routes
import { currentuserRouter } from './currentuser'
import { signinRouter } from './signin'
import { signupRouter } from './signup'
import { signoutRouter } from './signout'

const app = express.Router()

app.use(currentuserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

export { app as authRouter }
