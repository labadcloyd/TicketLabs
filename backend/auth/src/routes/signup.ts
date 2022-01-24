import express, { Request, Response } from "express";
import { body, } from "express-validator";
import { DatabaseConnectionError, BadRequestError } from '../errors'
import { validateRequest } from "../middlewares";
import { User } from "../models";
import jwt from "jsonwebtoken";

const app = express.Router()

app.post('/api/users/signup', [
	body('email')
		.isEmail()
		.withMessage('Must be a valid email'),
	body('password')
		.trim()
		.isLength({ min: 7, max: 20 })
		.withMessage('Password must be between 7 and 20 characters')
], 
validateRequest,
async (req: Request, res: Response) => {

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

		// Generating jwt
		const userJwt = jwt.sign(
			{
				id: newUser._id,
				email: newUser.email
			},
			process.env.JWTSECRET! 
		)
		// Storing jwt on session
		req.session = {
			jwt: userJwt
		}

		return res.status(201).json({ user: newUser })
	} catch(err) {
		console.log(err)
		throw new DatabaseConnectionError()
	}
})

export { app as signupRouter }