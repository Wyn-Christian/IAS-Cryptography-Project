import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

function Root() {
  return (
    <Box>
      <CssBaseline />
      <Outlet />
    </Box>
  );
}

export default Root;
