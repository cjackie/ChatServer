import { Request } from "express";

interface IValidator {
    (value: any): boolean;
}

interface ValidatorResult {
    errors: {field: string, message: string, value: any}[];
}

class ValidationBuilder {
    request: Request;
    result: ValidatorResult;

    constructor(req: Request) {
        this.request = req;
        this.result = {errors: []};
    }

    body(field: string, validator: IValidator, message?: string): ValidationBuilder {
        if (!validator(this.request.body[field]))
            this.result.errors.push({
                field: field,
                message: message ? message : "",
                value: this.request.body[field]
            });

        return this;
    }

    query(field: string, validator: IValidator, message?: string): ValidationBuilder {
        if (!validator(this.request.query[field]))
            this.result.errors.push({
                field: field,
                message: message ? message : "",
                value: this.request.query[field]
            });

        return this;
    }

    validate(): ValidatorResult {
        return this.result;
    }
}

export { IValidator, ValidatorResult, ValidationBuilder };