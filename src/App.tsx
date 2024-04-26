import { Box, Button, Typography } from "@mui/material";
import ListTodo from "./components/ListTodo";
import dayjs from "dayjs";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { todos } from "./model";
import AddTodoModal from "./components/AddTodoModal";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

function App() {
  const [todos, setTodos] = useState<todos[]>(localStorage.getItem('TodoList') ? JSON.parse(localStorage.getItem('TodoList') as string) : []);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState(0);
  const [isCollapseCompleteList, setIsCollapseCompleteList] = useState(true);

  const handleToggleModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const handleAddTodo = (todo: todos) => {
    setTodos([...todos, { ...todo, id: currentId }]);
    setCurrentId(currentId + 1);
  };

  const handleMakeDone = (id: number) => {
    const currentTodos = todos.find((el) => el.id === id);
    const updatedValueTodo = { ...currentTodos, isDone: !currentTodos?.isDone };
    const filteredTodos = todos.filter((el) => el.id !== id);
    console.log(updatedValueTodo);
    setTodos([...filteredTodos, updatedValueTodo as todos]);
  };

  const handleEditTodo = (data: todos) => {
    const filteredTodos = todos.filter((el) => el.id !== data.id);
    setTodos([...filteredTodos, data]);
  };

  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter((el) => el.id !== id);
    setTodos([...filteredTodos]);
  };

  useEffect(() => {
    console.log('hello')
    localStorage.setItem('TodoList', JSON.stringify(todos))
  }, [todos, setTodos])


  return (
    <Box
      sx={{
        textAlign: "center",
      }}
      padding={3}
    >
      <Typography fontSize={36}>My To Do List</Typography>
      <Typography fontSize={24}>
        {dayjs(new Date()).format("DD MMMM YYYY")}
      </Typography>
      <hr />
      <ListTodo
        todos={todos.filter((el) => el.isDone === false)}
        handleDone={handleMakeDone}
        handleDelete={handleDeleteTodo}
        handleEdit={handleEditTodo}
      />
      <Button onClick={() => handleToggleModal()}>
        <CiCirclePlus size={48} />
      </Button>
      {todos.filter((el) => el.isDone === true).length > 0 && (
        <Box>
          <Box
            onClick={() => setIsCollapseCompleteList(!isCollapseCompleteList)}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Completed</Typography>
              {isCollapseCompleteList ? <FaAngleDown /> : <FaAngleUp />}
            </Box>
            <hr />
          </Box>
          {isCollapseCompleteList ? null : (
            <ListTodo
              todos={todos.filter((el) => el.isDone === true)}
              handleDone={handleMakeDone}
              handleDelete={handleDeleteTodo}
              handleEdit={handleEditTodo}
              isComplete
            />
          )}
        </Box>
      )}
      <AddTodoModal
        isOpen={isAddModalOpen}
        handleToggle={handleToggleModal}
        handleAdd={handleAddTodo}
      />
    </Box>
  );
}

export default App;
