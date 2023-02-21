import React from 'react'
import { useState } from "react";
import List from "./List";
import Form from "./Form";

export type Todo = {
  id: number;
  content: string;
  editing: boolean;
};

const Todo = () => {

  const todosList = [
    {
      id: 1,
      content: "店を予約する",
      editing: false,
    },
    {
      id: 2,
      content: "卵を買う",
      editing: false,
    },
    {
      id: 3,
      content: "郵便を出す",
      editing: false,
    },
  ];

  const [todos, setTodos] = useState<Todo[]>(todosList);

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };

  const createTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (todo: Todo) => {
    const newTodos = todos.map((_todo) => {
      return _todo.id === todo.id ? { ..._todo, ...todo } : { ..._todo };
    });
    setTodos(newTodos);
  };

  return (
    <>
      // 各々に必要なPropsを渡す
      <List todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      <Form createTodo={createTodo} />
    </>
  );
};
export default Todo;
