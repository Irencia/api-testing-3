import { ApiRequest } from "../request";

export class PostsController {

    async getAllPosts() {
        const response = await new ApiRequest()
            .prefixUrl("http://tasque.lol/")
            .method("GET")
            .url(`api/Posts`)
            .send();
        return response;
    }

    async createPost(body: string, previewImage: string, accessToken: string) {
        const response = await new ApiRequest()
            .prefixUrl("http://tasque.lol/")
            .method("POST")
            .url(`api/Posts`)
            .body({
                body,
                previewImage
            })
            .bearerToken(accessToken)
            .send();
        return response;
    }

    async likePost(postId: string, userId: string, accessToken: string) {
        const response = await new ApiRequest()
            .prefixUrl("http://tasque.lol/")
            .method("POST")
            .url(`api/Posts`)
            .body({
                "entityId": postId,
                "isLike": true,
                "userId": userId
            })
            .bearerToken(accessToken)
            .send();
        return response;
    }
}