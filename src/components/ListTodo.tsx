import React from "react";
import { ListTodoProps } from "../model";
import Todo from "./Todo";
import { Grid, Typography } from "@mui/material";

function ListTodo({
  todos,
  handleDone,
  handleDelete,
  handleEdit,
  isComplete = false,
}: ListTodoProps) {
  if (todos.length < 1) {
    return (
      <>
        <Typography>{`Nothing on ${
          isComplete ? "Completed" : "Todo"
        } List`}</Typography>
      </>
    );
  }
  return (
    <Grid container spacing={2}>
      {todos.map((el) => (
        <Grid item xs={12} sm={6} md={4}>
          <Todo
            todo={el}
            handleDone={handleDone}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ListTodo;
