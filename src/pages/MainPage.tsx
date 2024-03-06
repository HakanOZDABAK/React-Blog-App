import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PostServices } from "../service/PostServices";
import { usePostStore } from "../store/usePostStore";
import { useUserStore } from "../store/useUserStore";
import SendIcon from "@mui/icons-material/Send";
import { CommentServices } from "../service/CommentServices";

export default function MainPage() {
  const { token } = useUserStore();
  const [commentMessage, setCommentMessage] = useState<any>("");
  const { posts, setPosts } = usePostStore();
  const [open, setOpen] = useState(false);
  const { userId, userName } = useUserStore();
  const handleOpen = (post: any) => {
    setSelectedPost(post);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [postImages, setPostImages] = useState<{ [postId: string]: string }>(
    {}
  );

  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    let postServices = new PostServices();
    if (token) {
      const getAllPost = async () => {
        try {
          const result = await postServices.getAllPosts(token);

          setPosts(result);
        } catch (error) {
          console.log(error);
        }
      };

      const fetchPostImages = async () => {
        const imageUrls: { [postId: string]: string } = {};

        for (const post of posts) {
          const imageUrl = await postServices.getImagesByPostId(post.id, token);
  
          imageUrls[post.id] = imageUrl.fileUri;

        }
        setPostImages(imageUrls);
        
      };

      const fetchData = async () => {
        await getAllPost();
        await fetchPostImages();
      };
  
      fetchData();
    } else {
      setPosts([]);
    }
  }, [token,commentMessage,posts]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleCommentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentMessage(e.target.value);
  };

  const addComment = async () => {
    if (!selectedPost) {
      console.error("No selected post");
      return;
    }

    const commentData = {
      commentDetail: commentMessage,
      blogUser: {
        blogUserId: userId,
        profileName: userName,
      },
      post: {
        blogPostId: selectedPost.id,
      },
    };

    try {
      let commentService = new CommentServices();

      const result = await commentService.addComment(commentData, token);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {posts
        .slice()
        .reverse()
        .map((post: any) => (
          <Container>
            <Card
              key={post.id}
              sx={{
                maxWidth: 500,
                margin: "auto",
                marginTop: "10px",
                borderColor: "black",
                borderWidth: 2,
                borderStyle: "solid",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.blogUser.profileName}
                  </Typography>
                  <Divider />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: "5px" }}
                  >
                    {post.postDetail}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: "5px" }}
                  >
                    <img src={postImages[post.id]} alt="Post Image" />
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Grid container rowSpacing={1}>
                  <Grid item xs={12}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleOpen(post)}
                    >
                      Add Comment
                    </Button>
                  </Grid>
                  {post.comments.length > 0 &&
                    post.comments.map((comment: any) => (
                      <Grid item xs={12} key={comment.commentId}>
                        <Card
                          sx={{
                            maxWidth: 500,
                            margin: "auto",
                            marginTop: "10px",
                            borderColor: "black",
                            borderWidth: 2,
                            borderStyle: "solid",
                          }}
                        >
                          <CardActionArea>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {comment.blogUser &&
                                  comment.blogUser.profileName}
                              </Typography>
                              <Divider />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ marginTop: "5px" }}
                              >
                                {comment.commentDetail}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </CardActions>
            </Card>
          </Container>
        ))}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Add Comment
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-multiline-flexible-postName"
                  label="Your Message Name"
                  multiline
                  maxRows={4}
                  value={commentMessage}
                  onChange={handleCommentNameChange}
                />
              </div>
            </Box>
            <Button
              disabled={commentMessage.length === 0}
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              onClick={() => addComment()}
            >
              Post It!
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
