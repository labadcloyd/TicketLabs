import { ValidationError } from "express-validator";
import { CustomError } from "./.customErrorAbstractClass";

export class RequestValidationError extends CustomError {
	statusCode = 400

	constructor(public errors: ValidationError[]) {
		super()
		//Only because we are extending a built in class
		Object.setPrototypeOf(this, RequestValidationError.prototype)
	}

	serializeErrors() {
		return this.errors.map((errorItem) => {
			return { message: errorItem.msg, field: errorItem.param }
		})
	}
}