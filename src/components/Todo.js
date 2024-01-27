import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// icons
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// =icons=
import IconButton from "@mui/material/IconButton";
import "../css/App.css";

import { useContext } from "react";
import { TodoContext } from "../contexts/todoContext";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";

function Todo({ Singletodo }) {
  const { todo, setTodo } = useContext(TodoContext);

  function handleCheckClick() {
    let updatedTodos = todo.map((t) => {
      if (t.id === Singletodo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });

    setTodo(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  }
  // Delete
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };
  function handleDeleteConfirm() {
    let updateTodos = todo.filter((t) => {
      return t.id !== Singletodo.id;
    });
    setTodo(updateTodos);
    localStorage.setItem("todo", JSON.stringify(updateTodos));
    
  }
  // Edit
  const [openEdit, setOpenEdit] = React.useState(false);
  const [Edit, setEdit] = React.useState({
    title: Singletodo.title,
    body: Singletodo.body,
  });

  const handleEditClickOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };
  function handleEditConfirm() {
    let updatedTodos = todo.map((t) => {
      if (t.id === Singletodo.id) {
        return { ...t, title: Edit.title, body: Edit.body };
      } else {
        return t;
      }
    });

    setTodo(updatedTodos);
    setOpenEdit(false);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  }
  return (
    <>
      {/* +Delete Model+ */}
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete Tasks"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the tasks? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* -Delete Model- */}
      {/* +Edit Model+ */}
      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify the details of the task below:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="taskName"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
            value={Edit.title}
            onChange={(e) => {
              setEdit({ ...Edit, title: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            id="body"
            name="taskBody"
            label="Task Body"
            type="text"
            fullWidth
            variant="standard"
            value={Edit.body}
            onChange={(e) => {
              setEdit({ ...Edit, body: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button type="submit" onClick={handleEditConfirm}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      {/* -Edit Model- */}
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
                onClick={handleEditClickOpen}>
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
                onClick={handleClickOpen}>
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
