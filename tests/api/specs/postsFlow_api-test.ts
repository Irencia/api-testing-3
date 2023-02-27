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

});
