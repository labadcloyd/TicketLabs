import express from "express";
import { json } from "body-parser";
import { currentuserRouter, signinRouter, signupRouter, signoutRouter } from './routes/.index'

const app = express()
app.use(json())
app.use(currentuserRouter)

app.listen(3000, () => {
	console.log('running on port 3000')
})
