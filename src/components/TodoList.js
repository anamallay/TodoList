import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CardContent from "@mui/material/CardContent";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState, useEffect } from "react";
import { TodoContext } from "../contexts/todoContext";

function TodoList() {
  const { todo, setTodo } = useContext(TodoContext);
  const [displayTodosTypes, setDisplayTodosTypes] = React.useState("all");
  const [titleInput, setTitleInput] = useState();

  const isCompleted = todo.filter((t) => {
    return t.isCompleted;
  });
  const noIsCompleted = todo.filter((t) => {
    return !t.isCompleted;
  });

  let TodosToBeRendered = todo;

  if (displayTodosTypes === "done") {
    TodosToBeRendered = isCompleted;
  } else if (displayTodosTypes === "notdone") {
    TodosToBeRendered = noIsCompleted;
  }
  let todoDisplay = TodosToBeRendered.map((t) => {
    return (
      <>
        <Todo key={t.id} Singletodo={t} />
      </>
    );
  });
  useEffect(() => {
    let storageTodos = JSON.parse(localStorage.getItem("todo"));
    setTodo(storageTodos);
  }, []);
  function handleAddClick() {
    let newTasks = {
      id: uuidv4(),
      title: titleInput,
      body: "no body",
      isCompleted: false,
    };
    const updateTodos = [...todo, newTasks];
    setTodo(updateTodos);
    localStorage.setItem("todo", JSON.stringify(updateTodos));
    setTitleInput("");
  }
  // change Types Todods

  const handleChangeDisplayTodosTypes = (e) => {
    setDisplayTodosTypes(e.target.value);
  };

  return (
    <>
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
