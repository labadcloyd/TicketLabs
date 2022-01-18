import express, { NextFunction, Request, Response } from "express";

export function errorHandler(
	err: Error, 
	req: Request, 
	res: Response, 
	next: NextFunction
) {
	console.log(err)

	return res.status(400).json({
		message: err.message
	})
}
