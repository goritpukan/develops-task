'use client'
import {Backdrop, Box, CircularProgress, Link, List, ListItem, ListItemText} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import api from "@/lib/axios";
import {Meal} from "@/types/meal";
import {listItemStyle, listTextStyle, sidebarBoxStyle} from "@/components/sidebar/SideBar.styles";

export default function SideBar({category}: { category: string }) {
  const {isLoading, data} = useQuery({
    queryKey: ['recipe', category],
    queryFn: () => api.get(`/recipe/?category=${category}`),
  })
  const meals: Meal[] = data?.data?.meals || []

  return (
    <Box sx={sidebarBoxStyle}>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <List>
        {meals.map((el: Meal) => (
          <ListItem
            key={el.idMeal}
            component={Link}
            href={`/?category=${category}`}
            sx={listItemStyle}
          >
            <ListItemText primary={el.strMeal} sx={listTextStyle} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}