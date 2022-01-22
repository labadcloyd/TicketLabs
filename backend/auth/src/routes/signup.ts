import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError, RequestValidationError, BadRequestError } from '../errors/.index'
import { User } from "../models/.index";

const app = express.Router()

app.post('/api/users/signup', [
	body('email')
		.isEmail()
		.withMessage('Must be a valid email'),
	body('password')
		.trim()
		.isLength({ min: 7, max: 20 })
		.withMessage('Password must be between 7 and 20 characters')
], async (req: Request, res: Response) => {
	const errors = 	validationResult(req)

	if (!errors.isEmpty()) {
		throw new RequestValidationError(errors.array())
	}

	const { email, password } = req.body

	// Checking if user already exists
	try {
		const existingUser = await User.findOne({'email': email})
		console.log({ existingUser })
		if (!!existingUser) {
			throw new BadRequestError('Email already exists')
		}
	} catch(err) {
		console.log(err)
		throw new DatabaseConnectionError()
	}

	// Saving the user
	try {
		const newUser = User.build({ email, password })
		await newUser.save()

		return res.status(201).json({ user: newUser })
	} catch(err) {
		console.log(err)
		throw new DatabaseConnectionError()
	}
})

export { app as signupRouter }