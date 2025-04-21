"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import api from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { Meal } from "@/types/meal";
import Link from "next/link";
import Image from "next/image";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { listItemStyle, listTextStyle } from "@/styles/commonStyles";

export default function RecipeListClient() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get("country");
  const categoryParam = searchParams.get("category");
  const ingredientParam = searchParams.get("ingredient");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["recipes", countryParam, categoryParam, ingredientParam],
    queryFn: () => api.get("/recipe", { params: searchParams }),
  });

  const meals: Meal[] = data?.data?.meals || [];

  return (
    <Box>
      <Backdrop open={isLoading}>
        <CircularProgress color={"inherit"} />
      </Backdrop>

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {(error as Error).message || "Failed to load recipes"}
        </Alert>
      )}

      {!isLoading && meals.length === 0 && (
        <Typography variant="body1">No recipes found.</Typography>
      )}

      <Typography textAlign={"center"} variant={"h4"}>
        {countryParam && `Country:  ${countryParam}`}
        {categoryParam && `Category:  ${categoryParam}`}
        {ingredientParam && `Ingredient:  ${ingredientParam}`}
        {!countryParam &&
          !categoryParam &&
          !ingredientParam &&
          "No filters applied."}
      </Typography>

      <List>
        {meals.map((el: Meal) => (
          <ListItem
            sx={listItemStyle}
            key={el.idMeal}
            component={Link}
            href={`/recipe/${el.idMeal}`}
          >
            {el?.strMealThumb ? (
              <Image
                height={100}
                width={100}
                alt={"Meal image"}
                src={el.strMealThumb}
              />
            ) : (
              <ImageNotSupportedIcon />
            )}
            <ListItemText
              sx={{ ...listTextStyle, marginLeft: "30px" }}
              primary={<Typography variant={"h5"}>{el.strMeal}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
