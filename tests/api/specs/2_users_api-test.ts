import { expect } from "chai";
import { UsersController } from "../lib/controllers/users.controller";

const users = new UsersController();
const schemas = require('./data/schemas_testData.json');
const chai = require('chai');
chai.use(require('chai-json-schema'));

describe(`Users controller`, () => {
    let userId: number;
 
    it(`should return 200 status code and all users when getting the user collection`, async () => {
        let response = await users.getAllUsers();

        // console.log("All Users:");
        // console.log(response.body);

        expect(response.statusCode, `Status Code should be 200`).to.be.equal(200);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);
        expect(response.body.length, `Response body should have more than 1 item`).to.be.greaterThan(1); 
        expect(response.body).to.be.jsonSchema(schemas.schema_allUsers); 
        
        userId = response.body[1].id;
    });

    it(`should return 404 error when getting user details with invalid id`, async () => {
        let invalidUserId = 123133

        let response = await users.getUserById(invalidUserId);

        expect(response.statusCode, `Status Code should be 404`).to.be.equal(404);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);  
    });

    it(`should return 400 error when getting user details with invalid id type`, async () => {
        let invalidUserId = '2183821367281387213781263'

        let response = await users.getUserById(invalidUserId);

        expect(response.statusCode, `Status Code should be 400`).to.be.equal(400);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);  
    });

    it(`should return user details when getting user details with valid id`, async () => {
        let response = await users.getAllUsers();
        let firstUserId: number = response.body[0].id;
        
        response = await users.getUserById(firstUserId);

        expect(response.statusCode, `Status Code should be 200`).to.be.equal(200);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000); 

        // console.log(response.body);
    });
});
