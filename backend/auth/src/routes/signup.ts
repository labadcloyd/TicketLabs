import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const app = express.Router()

app.post('/api/users/signup', [
	body('email')
		.isEmail()
		.withMessage('Must be a valid email'),
	body('password')
		.trim()
		.isLength({ min: 7, max: 20 })
		.withMessage('Password must be between 7 and 20 characters')
], (req: Request, res: Response) => {
	const errors = 	validationResult(req)

	if (!errors.isEmpty()) {
		throw new Error('Invalid email or password')
	}

	const { email, password } = req.body

	console.log(email, password)

	return res.status(200).json({ message: 'Successfully signed up' })

})

export { app as signupRouter }