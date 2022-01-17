import express from "express";
import { json } from "body-parser";

const app = express()
app.use(json())

app.get('/api/users/currentuser', (req, res) =>{
	console.log(req)
	return res.status(200).json({
		name: 'Cloyd',
		username: 'labadcloyd',
	})
})

app.listen(3000, () => {
	console.log('running on port 3000')
})
