import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import IconButton from "@mui/material/IconButton";
import "../css/App.css";
// other
import { useTodos } from "../contexts/todoContext";
import { useToaster } from "../contexts/toasterContext";

function Todo({ Singletodo, showDelete, showEdit }) {
  const { dispatch } = useTodos();
  const { showHideToast } = useToaster();

  function handleCheckClick() {
    dispatch({ type: "isDone", payload: { todo: Singletodo } });
    const toastMessage = Singletodo.isCompleted
      ? "Task marked as done!"
      : "Task marked as not done!";
    showHideToast(toastMessage, Singletodo.isCompleted);
  }

  // +Delete+
  const handleOpenDelete = () => {
    showDelete(Singletodo.id);
  };
  // -Delete-
  // +Edit+
  const handleOpenEdit = () => {
    showEdit(Singletodo);
  };
  // -Edit-
  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 500,
          minHeight: 100,
          backgroundColor: "#ce93d8",
          color: "#707070",
          marginTop: 2,
          marginBottom: 2,
        }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  fontFamily: "A",
                  textDecoration: Singletodo.isCompleted
                    ? "line-through"
                    : "none",
                }}
                gutterBottom>
                {Singletodo.title}
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "left" }} gutterBottom>
                {Singletodo.body}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}>
              <IconButton
                className={`iconButtonDone ${
                  Singletodo.isCompleted ? "DoneButton" : ""
                }`}
                color="#bbdefb"
                sx={{
                  backgroundColor: "white",
                  border: "solid 2px",
                  borderColor: "primary.dark",
                }}
                onClick={handleCheckClick}>
                <DoneRoundedIcon />
              </IconButton>
              <IconButton
                className="iconButtonEdit"
                color="#c5cae9"
                sx={{
                  backgroundColor: "white",
                  border: "solid 2px",
                  borderColor: "primary.dark",
                }}
                onClick={handleOpenEdit}>
                <BorderColorRoundedIcon />
              </IconButton>
              <IconButton
                className="iconButtonDelete"
                color="#ffcdd2"
                sx={{
                  backgroundColor: "white",
                  border: "solid 2px",
                  borderColor: "primary.dark",
                }}
                onClick={handleOpenDelete}>
                <DeleteRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
