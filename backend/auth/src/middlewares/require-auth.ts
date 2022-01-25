import { Request, Response, NextFunction } from "express";
import { UnautherizedError } from "../errors";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
	if (!req.currentUser) {
		throw new UnautherizedError()
	}

	next()
}

export { requireAuth }