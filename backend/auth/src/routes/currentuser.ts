import express from "express";

const app = express.Router()

app.get('/api/users/currentuser', (req, res) =>{
	return res.status(200).json({
		name: 'Cloyd',
		username: 'labadcloyd',
	})
})

export { app as currentuserRouter }