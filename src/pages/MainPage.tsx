import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PostServices } from "../service/PostServices";
import { useUserStore } from "../store/useUserStore";

export default function MainPage() {
  const { token } = useUserStore();
  const [showSecondCard, setShowSecondCard] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const getAllPost = async () => {
      try {
        let postServices = new PostServices();
        const result = await postServices.getAllPosts(token);
        setPosts(result)
      } catch (error) {
        console.log(error);
      }
    };

    getAllPost();
  },[token]);

  const handleAddComment = () => {
    setShowSecondCard(true);
  };
  const nav = useNavigate();

  return (
    <div>
       {posts.map((post: any) => (
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
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: "5px" }}>
          {post.postDetail}
        </Typography>
      </CardContent>
    </CardActionArea>

    <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          <Button size="small" color="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}>
          <div>
            <Card sx={{ marginTop: "5px" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Divider />
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </Grid>
      </Grid>
    </CardActions>
  </Card>
))}

      
    </div>
  );
}
