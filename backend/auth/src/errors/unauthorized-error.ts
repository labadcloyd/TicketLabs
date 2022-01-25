import { CustomError } from "./.customErrorAbstractClass";

export class UnautherizedError extends CustomError {
	statusCode = 401

	constructor() {
		super()
		//Only because we are extending a built in class
		Object.setPrototypeOf(this, UnautherizedError.prototype)
	}

	serializeErrors() {
		return [
			{ message: 'Unautherized request' }
		]
	}
}