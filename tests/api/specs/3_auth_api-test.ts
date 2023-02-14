import { expect } from "chai";
import { UsersController } from "../lib/controllers/users.controller";
import { AuthController } from "../lib/controllers/auth.controller";

const users = new UsersController();
const auth = new AuthController();

xdescribe("Token usage", () => {
    let accessToken: string;

    before(`Login and get the token`, async () => {
        let response = await auth.login("email.qa.test@gmail.com", "password");

        accessToken = response.body.token.accessToken.token;
        // console.log(accessToken);
    });

    it(`Usage is here`, async () => {
        let userData: object = {
            id: 7,
            avatar: "string",
            email: "alex.qa.test@gmail.com",
            userName: "AlexQaNew",
        };

        let response = await users.updateUser(userData, accessToken);
        expect(response.statusCode, `Status Code should be 204`).to.be.equal(204);
    });
});
