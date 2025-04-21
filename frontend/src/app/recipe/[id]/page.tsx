"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Drawer,
  IconButton,
} from "@mui/material";
import { useParams } from "next/navigation";
import { Meal } from "@/types/meal";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import Image from "next/image";
import Link from "next/link";
import SideBar from "@/components/sidebar/SideBar";
import { Stack } from "@mui/system";
import { listItemStyle, listTextStyle } from "@/styles/commonStyles";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export default function Page() {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => api.get(`/recipe/${id}`),
  });
  const meal: Meal = data?.data;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Grid container size={12}>
      <Backdrop open={isLoading}>
        <CircularProgress color={"inherit"} />
      </Backdrop>

      {meal && (
        <Box sx={{ position: "fixed", right: 16, top: 16, zIndex: 1200 }}>
          <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            color="primary"
            aria-label="open category drawer"
            sx={{ bgcolor: "background.paper", boxShadow: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}
      {meal && (
        <Grid container spacing={4} size={12}>
          <Grid size={{ md: 6, xs: 12 }}>
            <Box justifySelf={"center"}>
              {meal?.strMealThumb ? (
                <Image
                  height={300}
                  width={300}
                  alt={"Meal image"}
                  src={meal.strMealThumb}
                />
              ) : (
                <ImageNotSupportedIcon />
              )}
            </Box>
          </Grid>
          <Grid size={{ md: 5, xs: 12 }}>
            <Stack>
              <Typography textAlign={"center"} variant={"h2"}>
                {meal?.strMeal}
              </Typography>
              <Typography
                sx={listItemStyle}
                textAlign={"center"}
                component={Link}
                href={`/?country=${meal?.strArea}`}
              >
                {meal?.strArea}
              </Typography>
            </Stack>
          </Grid>
          <Typography>{meal?.strInstructions}</Typography>
          <Grid size={{ md: 12, xs: 12 }}>
            <Typography variant={"h4"}>Ingredients</Typography>
            <List sx={{ border: "1px gray solid", width: "50%" }}>
              {meal &&
                Object.entries(meal).map(([key, value], i: number) => {
                  if (key.includes("strIngredient") && value) {
                    return (
                      <ListItem
                        sx={listItemStyle}
                        key={i}
                        component={Link}
                        href={`/?ingredient=${value}`}
                      >
                        <ListItemText sx={listTextStyle}>{value}</ListItemText>
                      </ListItem>
                    );
                  }
                })}
            </List>
          </Grid>
        </Grid>
      )}
      {meal && (
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "240px",
              boxSizing: "border-box",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <SideBar category={meal?.strCategory} />
          </Box>
        </Drawer>
      )}
    </Grid>
  );
}
