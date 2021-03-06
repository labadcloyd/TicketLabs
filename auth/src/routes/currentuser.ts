import express from "express";
import { currentUser, requireAuth } from '@ticketlabs/common'

const app = express.Router()

app.get('/api/users/currentuser', currentUser, requireAuth, (req, res) =>{
	return res.json({ currentUser: req.currentUser || null })
})

export { app as currentuserRouter }