import express from "express";

const app = express.Router()

app.post('/api/users/signout', (req, res) => {
	req.session = null

	return res.json({})
})

export { app as signoutRouter }