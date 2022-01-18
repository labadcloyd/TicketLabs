import express, { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError, RequestValidationError } from '../errors/.index'

export function errorHandler(
	err: Error, 
	req: Request, 
	res: Response, 
	next: NextFunction
) {
	if (err instanceof RequestValidationError) {
		console.log('Error is a request validation error')
		const formattedErrors = err.errors.map((errorItem) => {
			return { message: errorItem.msg, field: errorItem.param }
		})

		return res.status(400).json({ errors: formattedErrors })
	}
	if (err instanceof DatabaseConnectionError) {
		return res.status(400).json({ errors: [
			{ message: 'Error in connecting to database' }
		] })
	}

	return res.status(400).json(err)
}
