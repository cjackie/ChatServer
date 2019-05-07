import { ValidationBuilder } from "../../src/util/validator";
import { Request } from "express";

import chai from "chai";

const expect = chai.expect;

describe("Dummy Tests", () => {
    it("always true", () => {
        expect(true).eq(true);
    });
});

describe("ValidationBuilder", () => {
    it("valid body", () => {
        const req = {body: {name: "jack"}};
        const validationBuilder = new ValidationBuilder(<Request>req);

        validationBuilder.body("name", (value) => value === "jack", "failed");
        const result = validationBuilder.validate();

        expect(result.errors).length(0);
    });

    it("invalid body", () => {
        const req = {body: {name: 1}};
        const validationBuilder = new ValidationBuilder(<Request>req);

        validationBuilder.body("name", (value: string) => value && value.length > 0, "invalid name");
        const errors = validationBuilder.validate().errors;

        expect(errors).length(1);

    });

    it("valid query", () => {
        const req = {query: {name: "jack"}};
        const validationBuilder = new ValidationBuilder(<Request>req);

        validationBuilder.query("name", (value) => value === "jack", "failed");
        const result = validationBuilder.validate();

        expect(result.errors).length(0);
    });
});