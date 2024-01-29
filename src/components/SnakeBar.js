import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

export default function SnakeBar({ open, message}) {

  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="Note archived">
          <Alert severity="success">{message}</Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
