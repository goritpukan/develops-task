'use client'
import {useQuery} from "@tanstack/react-query";
import {Backdrop, Box, CircularProgress} from "@mui/material";
import api from "@/lib/axios";

export default function Page() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => api.get('/recipe'),
  })
  console.log(data)
  return (
    <Box>
      <Backdrop open={isLoading}>
        <CircularProgress color={'inherit'}/>
      </Backdrop>
    </Box>
  );
}
