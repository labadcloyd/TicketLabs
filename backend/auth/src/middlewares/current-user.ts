import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface payload {
	id: string,
	email: string
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: payload
		}
	}
}

const currentUser = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session?.jwt) {
		return next()
	}

	try {
		const payload = jwt.verify(req.session.jwt, process.env.JWTSECRET!) as payload
		req.currentUser = payload
	} catch(err) {}
	next()
}

export { currentUser }