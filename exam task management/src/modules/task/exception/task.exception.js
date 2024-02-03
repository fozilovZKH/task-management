export class TaskNotFoundException extends Error {
  constructor() {
    super("task not found");

    this.statusCode = 404;
  }
}

export class TaskBadRequestException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}


export class TaskNotCreatedException extends Error {
  constructor() {
    super("task not created");
    this.statusCode = 500;
  }
}
