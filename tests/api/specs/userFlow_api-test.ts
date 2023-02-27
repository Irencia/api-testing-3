import { expect } from "chai";
import { UsersController } from "../lib/controllers/users.controller";
import { AuthController } from "../lib/controllers/auth.controller";

const schemas = require('./data/schemas_testData.json');
const users = new UsersController();
const auth = new AuthController();

describe("Token usage", () => {
    let accessToken: string;
    const random = (Math.random() * 1000).toFixed();
    const email: string = `irena.podporina+${random}@gmail.com`;
    const password: string = '111111';
    let userId: string;

    before(`signup and get the token`, async () => {
        let response = await auth.signup(email, password,
        `newUser${random}`, 'ava.js');

        accessToken = response.body.token.accessToken.token;
    });

    it(`getAllUsers`, async () => {
        let response = await users.getAllUsers();
        expect(response.statusCode, `Status Code should be 200`).to.be.equal(200);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);
    });

    it('login and get token', async () => {
        let response = await auth.login(email, password);
        accessToken = response.body.token.accessToken.token;
        expect(response.statusCode, `Status Code should be 200`).to.be.equal(200);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);
    })

    it('get user by token and verify email', async () => {
        let response = await users.getUserByToken(accessToken);
        expect(response.statusCode, `Status Code should be 200`).to.be.equal(200);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);
        expect(response.body.email).to.be.equal(email); 
        userId = response.body.id;
    });


    it('update user with new userName', async () => {
        const userData = {
            id: userId, 
            email,
            userName: 'NewUserName', 
        }
        let response = await users.updateUser(userData, accessToken);
        expect(response.statusCode, `Status Code should be 204`).to.be.equal(204);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);
    });


    it('get user by token and verify updated userName', async () => {
        let response = await users.getUserByToken(accessToken);
        expect(response.statusCode, `Status Code should be 200`).to.be.equal(200);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);
        expect(response.body.userName).to.be.equal('NewUserName'); 
    });



    it('get user by id and verify updated userName', async () => {
        let response = await users.getUserById(userId);
        expect(response.statusCode, `Status Code should be 200`).to.be.equal(200);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);
        expect(response.body.userName).to.be.equal('NewUserName'); 
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

    it('delete user by id', async () => {
        let response = await users.deleteUserById(userId, accessToken);
        expect(response.statusCode, `Status Code should be 204`).to.be.equal(204);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);
    });

});
