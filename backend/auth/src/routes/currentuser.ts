import express from "express";
import jwt from "jsonwebtoken";

const app = express.Router()

app.get('/api/users/currentuser', (req, res) =>{

	if (!req.session?.jwt) {
		return res.status(400).json({ currentUser: null })
	}

	try {
		const payload = jwt.verify(req.session.jwt, process.env.JWTSECRET!)
		return res.status(200).json({ currentUser: payload})
	} catch(err) {
		return res.status(400).json({ currentUser: null })
	}
})

export { app as currentuserRouter }