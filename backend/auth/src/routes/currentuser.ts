import express from "express";
import { currentUser } from '../middlewares'

const app = express.Router()

app.get('/api/users/currentuser', currentUser, (req, res) =>{
	return res.json({ currentUser: req.currentUser || null })
})

export { app as currentuserRouter }