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
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function MainPage() {
  const [showSecondCard, setShowSecondCard] = useState(false);

  const handleAddComment = () => {
    setShowSecondCard(true);
  };
  const nav = useNavigate();

  return (
    <div>
      <Card
        sx={{
          maxWidth: 500,
          margin: "auto",
          marginTop: "10px",
          borderColor: " black",
          borderWidth: 2,
          borderStyle: "solid",
        }}
      >
        <CardActionArea onClick={handleAddComment}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Divider />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: "5px" }}
            >
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
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
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}
