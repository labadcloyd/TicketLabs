import { CustomError } from "./.customErrorAbstractClass";

export class NotFoundError extends CustomError {
	statusCode = 404

	constructor() {
		super()
		//Only because we are extending a built in class
		Object.setPrototypeOf(this, NotFoundError.prototype)
	}

	serializeErrors() {
		return [
			{ message: 'Destination does not exist' }
		]
	}
}