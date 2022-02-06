import express, {Request, Response} from "express";
import { body } from 'express-validator'
import { validateRequest, BadRequestError } from "@ticketlabs/common";
import { User } from "../models";
import { Password } from "../utils";
import jwt from "jsonwebtoken";

const app = express.Router()

app.post('/api/users/signin', [
	body('email').isEmail().withMessage('Email must be valid'),
	body('password').trim().notEmpty().withMessage('You must supply a password')
], 
validateRequest, async (req: Request, res: Response) => {
	const { email, password } = req.body

	const existingUser = await User.findOne({ email: email })
	if (!existingUser) {
		throw new BadRequestError('Invalid Credentials')
	}
	const passwordsMatch = await Password.compare(existingUser.password, password)
	if (!passwordsMatch) {
		throw new BadRequestError('Invalid Credentials')
	}

	// Generating jwt
	const userJwt = jwt.sign(
		{
			id: existingUser._id,
			email: existingUser.email
		},
		process.env.JWTSECRET! 
	)
	// Storing jwt on session
	req.session = {
		jwt: userJwt
	}

	return res.status(200).json(existingUser)

})

export { app as signinRouter }