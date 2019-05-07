import request from "supertest";
import app from "../../src/app";

import chai from "chai";

const expect = chai.expect;

describe("GET /api", () => {
    it("should return 200 OK", () => {
        request(app).get("/hello")
            .query({k: "hi"})
            .expect(200);
    });
});
