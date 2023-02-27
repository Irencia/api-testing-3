import { ApiRequest } from "../request";

export class AuthController {
    async login(emailValue: string, passwordValue: string) {
        const response = await new ApiRequest()
            .prefixUrl("http://tasque.lol/")
            .method("POST")
            .url(`api/Auth/login`)
            .body({
                email: emailValue,
                password: passwordValue,
            })
            .send();
        return response;
    }

    async signup(emailValue: string, passwordValue: string, userName: string,
        avatar: string = '') {
        const response = await new ApiRequest()
            .prefixUrl("http://tasque.lol/")
            .method("POST")
            .url(`api/register`)
            .body({
                email: emailValue,
                password: passwordValue,
                userName,
                avatar
            })
            .send();
        return response;
    }
}
