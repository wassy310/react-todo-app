import React from 'react'
import { Item } from "./Item";
import { Todo } from "./Todo";

type Listprops = {
  todos: Todo[];
  deleteTodo: Function;
  updateTodo: Function;
};

const List: React.FC<Listprops> = ({ todos, deleteTodo, updateTodo }) => {
  const complete = (id: number) => {
    deleteTodo(id);
  };
  return (
    <div>
      {todos.map((todo) => {
        return (
          <Item
            key={todo.id}
            todo={todo}
            complete={complete}
            updateTodo={updateTodo}
          />
        );
      })}
    </div>
  );
};

export default List;
