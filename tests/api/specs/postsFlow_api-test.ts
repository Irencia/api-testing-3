import { expect } from "chai";
import { UsersController } from "../lib/controllers/users.controller";
import { AuthController } from "../lib/controllers/auth.controller";
import { PostsController } from "../lib/controllers/posts.controller";

const schemas = require('./data/schemas_testData.json');
const users = new UsersController();
const posts = new PostsController();
const auth = new AuthController();

describe("Token usage", () => {
    let accessToken: string;
    const random = (Math.random() * 1000).toFixed();
    const email: string = `irena.podporina+${random}@gmail.com`;
    const password: string = '111111';
    let userId: string;
    let postId: string;

    before(`signup and get the token`, async () => {
        let response = await auth.signup(email, password,
        `newUser${random}`, 'ava.js');

        accessToken = response.body.token.accessToken.token;
    });

    it('get user by token and verify updated userName', async () => {
        let response = await users.getUserByToken(accessToken);
        expect(response.statusCode, `Status Code should be 200`).to.be.equal(200);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);
        userId = response.body.id;
        console.log('userId', userId)
    });

    it('createPost', async () => {
        let response = await posts.createPost('new Post', 'postImage', accessToken);
        expect(response.statusCode, `Status Code should be 200`).to.be.equal(200);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);
        expect(response.body.body).to.be.equal('new Post');
        postId = response.body.id;
        console.log('postId', postId);
    });

    it('like post', async () => {
        let response = await posts.likePost(postId, userId, accessToken);
        expect(response.statusCode, `Status Code should be 200`).to.be.equal(200);
        expect(response.timings.phases.total, `Response time should be less than 1s`).to.be.lessThan(1000);
    });
});
