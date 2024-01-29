import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// other
import Todo from "./Todo";
import {  useState, useEffect, useMemo } from "react";
import { useTodos } from "../contexts/todoContext";
import { useToaster } from "../contexts/toasterContext";


function TodoList() {
  const { showHideToast } = useToaster();
  const { todo, dispatch } = useTodos();
  const [displayTodosTypes, setDisplayTodosTypes] = React.useState("all");
  const [titleInput, setTitleInput] = useState();

  const isCompleted = useMemo(() => {
    return todo.filter((t) => {
      return t.isCompleted;
    });

  }, [todo]);
  const noIsCompleted = useMemo(() => {
    return todo.filter((t) => {
      return !t.isCompleted;
    });
  }, [todo]);

  let TodosToBeRendered = todo;

  if (displayTodosTypes === "done") {
    TodosToBeRendered = isCompleted;
  } else if (displayTodosTypes === "notdone") {
    TodosToBeRendered = noIsCompleted;
  }

  useEffect(() => {
    dispatch({ type: "get" });
  });

  function handleAddClick() {
    dispatch({
      type: "add",
      payload: {
        title: titleInput,
      },
    });
    setTitleInput("");
    showHideToast("Task added successfully");
  }
  // change Types Todods
  const handleChangeDisplayTodosTypes = (e) => {
    setDisplayTodosTypes(e.target.value);
  };
  // +Delete+
  const [todoIdForDelete, settodoIdForDelete] = useState(null);
  const [openDelete, setOpenDelete] = React.useState(false);
  const OpenDelete = (id) => {
    settodoIdForDelete(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  function handleDeleteConfirm() {
    dispatch({
      type: "delete",
      payload: {
        id: todoIdForDelete,
      },
    });
    setOpenDelete(false);
    showHideToast("delete the tasks successfully");
  }
  // -Delete-
  // +Edit+
  const [openEdit, setOpenEdit] = React.useState(false);
  const [todoIdForEdit, setTodoIdForEdit] = useState(null);
  const [Edit, setEdit] = React.useState({
    title: "",
    body: "",
  });

  const OpenEdit = (todo) => {
    setTodoIdForEdit(todo.id);
    setEdit({
      title: todo.title,
      body: todo.body,
    });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  function handleEditConfirm() {
    dispatch({
      type: "update",
      payload: {
        id: todoIdForEdit,
        titleEdit: Edit,
      },
    });
    setOpenEdit(false);
    showHideToast("Update the tasks successfully");
  }
  // -Edit-
  let todoDisplay = TodosToBeRendered.map((t) => {
    return (
      <>
        <Todo
          key={t.id}
          Singletodo={t}
          showDelete={OpenDelete}
          showEdit={OpenEdit}
        />
      </>
    );
  });
  return (
    <>
      {/* +Delete Model+ */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
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
          <Button onClick={handleCloseDelete}>Cancel</Button>
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
      <Container maxWidth="sm">
        <Card
          sx={{
            minWidth: 275,
            overflow: "scroll",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <CardContent>
            <Typography variant="h4" color="primary.main" gutterBottom>
              My Todo List
            </Typography>
            <Divider />
            <ToggleButtonGroup
              color="primary"
              value={displayTodosTypes}
              exclusive
              onChange={handleChangeDisplayTodosTypes}
              aria-label="Platform">
              <ToggleButton value="all">ALL</ToggleButton>
              <ToggleButton value="done">Done</ToggleButton>
              <ToggleButton value="notdone">Not Done</ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
          {todoDisplay}
          {/* add tasks */}
          <div
            style={{
              minWidth: "500px",
              marginTop: "5px",
              marginBottom: "15px",
            }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}>
                <Button
                  style={{ width: "100%", height: "100%", fontWeight: "500" }}
                  variant="contained"
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={!titleInput || titleInput.length === 0}>
                  ADD
                </Button>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}>
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="tasks"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </Card>
      </Container>
    </>
  );
}
export default TodoList;
