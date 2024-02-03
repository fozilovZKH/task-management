export class UserTaskException extends Error{
	constructor(message) {
		super(message);
		this.statusCode = 400
	}
}

export class UserTaskNotFoundException extends Error {
	constructor() {
		super("UserTask Not Found");
		this.statusCode = 404
	}
}