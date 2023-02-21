import React, { useState } from "react";
import { Todo } from "./Todo";

type ItemProps = {
  todo: Todo;
  complete: Function;
  updateTodo: Function;
};

export const Item: React.FC<ItemProps> = ({ todo, complete, updateTodo }) => {
  const [editingContent, setEditingContent] = useState(todo.content);

  const editMode = () => {
    const newTodo = {
      ...todo,
      editing: !todo.editing,
    };
    updateTodo(newTodo);
  };

  const confirmContent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      ...todo,
      content: editingContent,
      editing: !todo.editing,
    };
    updateTodo(newTodo);
  };

  return (
    <div key={todo.id}>
      <form onSubmit={confirmContent} style={{ display: "inline" }}>
        <span onDoubleClick={editMode}>
          {todo.editing ? (
            <input
              type="text"
              placeholder="入力してね"
              value={editingContent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditingContent(e.target.value)
              }
            />
          ) : (
            todo.content
          )}
        </span>
      </form>
      <button onClick={() => complete(todo.id)}>-</button>
    </div>
  );
};
