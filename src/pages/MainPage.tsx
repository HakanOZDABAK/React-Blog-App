import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PostServices } from "../service/PostServices";
import { useUserStore } from "../store/useUserStore";
import { usePostStore } from "../store/usePostStore";

export default function MainPage() {
  const { token } = useUserStore();
  const [showSecondCard, setShowSecondCard] = useState(false);
  const { posts, setPosts } = usePostStore();

  useEffect(() => {
    if (token) {
      const getAllPost = async () => {
        try {
          let postServices = new PostServices();
          const result = await postServices.getAllPosts(token);
          setPosts(result);
        } catch (error) {
          console.log(error);
        }
      };

      getAllPost();
    } else {
      setPosts([]);
    }
  }, [token]);

  const handleAddComment = () => {
    setShowSecondCard(true);
  };
  const nav = useNavigate();

  return (
    <div>
      {posts.slice().reverse().map((post: any) => (
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
            <CardActionArea onClick={handleAddComment}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.postUser.profileName}
                </Typography>
                <Divider />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: "5px" }}
                >
                  {post.postDetail}
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Grid container rowSpacing={1}>
                <Grid item xs={12}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleAddComment}
                  >
                    Add Comment
                  </Button>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </CardActions>
          </Card>
        </Container>
      ))}
    </div>
  );
}
