const url = "/api/posts/";

/* eslint-disable no-async-promise-executor */

class postService {
    // Get Posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(url, { method: "GET" }).then((result) =>
                    result.json()
                );
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Create Post
    static insertPost(file) {
        // console.log(JSON.stringify( file ))
        fetch(url, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify( file )
        });
    }

    // Delete POST
    static deletePost(id) {
        return fetch(`${url}${id}`, { method: "DELETE" });
    }
}

export default postService;
