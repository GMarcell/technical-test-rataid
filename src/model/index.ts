export interface todos {
  id: number
  date: Date
  title: string
  isDone: boolean
}

export interface ListTodoProps {
  todos: Array<todos>
  handleDone: (id: number) => void
  handleDelete: (id: number) => void
  handleEdit: (data: todos) => void
  isComplete?: boolean
}

export interface todoProps {
  todo: todos
  handleDone: (id: number) => void
  handleDelete: (id: number) => void
  handleEdit: (data: todos) => void
}

export interface AddTodoModalProps {
  isOpen: boolean
  handleToggle: () => void
  handleAdd: (todo: todos) => void
  isEdit?: boolean
  data?: todos
}