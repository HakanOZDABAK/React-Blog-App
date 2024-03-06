import axios from "axios";
export class PostServices {
  addPost(addPostData: any, token: string) {
  axios.post("http://localhost:8081/api/v1/posts/addPost", addPostData, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

  }

  getAllPosts(token: string) {
    try {
      const result =  axios
        .get("http://localhost:8081/api/v1/posts/getAllPosts", {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => result.data);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  getImagesByPostId(postId:string,token:string){

    try {
      const result =  axios
        .get("http://localhost:8081/api/v1/files/getFileByPostId", {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            postId: postId,
          }
          
        })
        .then((result) => result.data);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
  addImage(file: any, postId: string, token: string) {
    try {
      const formData = new FormData();
      formData.append('name', postId);
      formData.append('files', file);
  
      const result = axios.post("http://localhost:8081/api/v1/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((result) => result.data);
  
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  
}
