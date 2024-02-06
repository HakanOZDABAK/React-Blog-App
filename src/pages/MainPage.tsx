import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function MainPage() {
  const [showSecondCard, setShowSecondCard] = useState(false);

  const handleAddComment = () => {
    setShowSecondCard(true);
  };

  return (
    <div>
       <Card sx={{ maxWidth: 345, margin: 'auto', marginTop: '10px' }}>
        <CardActionArea onClick={handleAddComment}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button size="small" color="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
        </CardActions>
      </Card>

      {showSecondCard && (
        <Card sx={{ maxWidth: 150, position: 'absolute', top: '100%', right: 0, transform: 'translateY(-100%)' }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="small" color="primary">
              Add Comment
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  )
}
