import React, { useState } from "react";

type FormProps = {
  createTodo: Function;
};

const Form: React.FC<FormProps> = ({ createTodo }) => {
  const [enteredTodo, setEnteredTodo] = useState("");

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo,
    };
    createTodo(newTodo);
    setEnteredTodo("");
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="入力してね"
          value={enteredTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEnteredTodo(e.target.value)
          }
        />
        <button>+</button>
      </form>
    </div>
  );
};

export default Form;
