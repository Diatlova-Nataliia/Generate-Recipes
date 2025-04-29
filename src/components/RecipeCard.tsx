"use client";

import React from "react";
import CardMedia from "@mui/material/CardMedia";
import {
  Card,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Recipe } from "@/types/recipe";

export type RecipeCardProps = {
  recipe: Recipe;
  expanded: boolean;
  onClick?: () => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  expanded,
  onClick,
}) => {
  return (
    <>
      <Card className="w-full">
        <CardMedia
          sx={{
            height: "20vw",
            "@media(max-width: 600px)": { height: "50vw" },
          }}
          image={recipe.image}
        />
        <Typography
          sx={{
            fontFamily: "inherit",
            "@media(min-width: 760px)": { height: 60 },
          }}
          variant="h6"
          className="bg-primary p-2"
        >
          {recipe.title}
        </Typography>
        <CardActions className="bg-primary">
          <IconButton onClick={onClick}>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} unmountOnExit>
          <div className="p-2 bg-softGray">
            {recipe.description.map((step, index) => (
              <Typography
                key={index}
                sx={{ fontFamily: "inherit" }}
                className="p-2"
              >
                {step}
              </Typography>
            ))}
          </div>
        </Collapse>
      </Card>
    </>
  );
};

export default RecipeCard;
