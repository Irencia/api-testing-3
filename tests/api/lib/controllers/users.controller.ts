import { ApiRequest } from "../request";

export class UsersController {
    async getAllUsers() {
        const response = await new ApiRequest()
            .prefixUrl("http://tasque.lol/")
            .method("GET")
            .url(`api/Users`)
            .send();
        return response;
    }

    async getUserById(id) {
        const response = await new ApiRequest()
            .prefixUrl("http://tasque.lol/")
            .method("GET")
            .url(`api/Users/${id}`)
            .send();
        return response;
    }

    async getUserByToken(accessToken: string) {
        const response = await new ApiRequest()
            .prefixUrl("http://tasque.lol/")
            .method("GET")
            .url(`api/Users/fromToken`)
            .bearerToken(accessToken)
            .send();
        return response;
    }
   
    async updateUser(userData: object, accessToken: string) {
        const response = await new ApiRequest()
            .prefixUrl("http://tasque.lol/")
            .method("PUT")
            .url(`api/Users`)
            .body(userData)
            .bearerToken(accessToken)
            .send();
        return response;
    }

    async deleteUserById(id, accessToken) {
        const response = await new ApiRequest()
            .prefixUrl("http://tasque.lol/")
            .method("DELETE")
            .url(`api/Users/${id}`)
            .bearerToken(accessToken)
            .send();
        return response;
    }
}