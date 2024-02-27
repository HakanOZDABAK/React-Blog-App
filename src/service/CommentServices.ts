import axios from "axios"

export class CommentServices{

addComment(commentData: any, token: string) {
        axios.post("http://localhost:8081/api/v1/comments/addComment", commentData, {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
      
        }
}