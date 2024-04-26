import React, { useState } from "react";
import { todoProps } from "../model";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import AddTodoModal from "./AddTodoModal";

function Todo({ todo, handleDone, handleDelete, handleEdit }: todoProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: `${todo.isDone ? "lightgrey" : "skyblue"}`,
        borderRadius: "5px",
      }}
      paddingX={2}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Checkbox checked={todo.isDone} onChange={() => handleDone(todo.id)} />
        <Typography
          sx={{ textDecoration: `${todo.isDone ? "line-through" : "none"}` }}
        >
          {todo.title}
        </Typography>
      </Box>
      <Box>
          <IconButton onClick={() => setIsEditModalOpen(!isEditModalOpen)}>
            <MdEdit />
          </IconButton>
        <IconButton onClick={() => handleDelete(todo.id)}>
          <MdDelete />
        </IconButton>
      </Box>
      <AddTodoModal
        isOpen={isEditModalOpen}
        handleAdd={handleEdit}
        handleToggle={() => setIsEditModalOpen(!isEditModalOpen)}
        isEdit={true}
        data={todo}
      />
    </Box>
  );
}

export default Todo;
