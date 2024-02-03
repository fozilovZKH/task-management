export class CompanyNotFoundException extends Error {
  constructor() {
    super("Company not found");

    this.statusCode = 404;
  }
}

export class CompanyBadRequestException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export class CompanyNameAlreadyExistException extends Error {
  constructor() {
    super("Company name already exist");

    this.statusCode = 400;
  }
}

export class CompanyNotCreatedException extends Error {
  constructor() {
    super("Company not created");

    this.statusCode = 500;
  }
}
