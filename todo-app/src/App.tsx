import { useState } from 'react';

type Todo = {
  value: string;
};

export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
    };

    setTodos([newTodo, ...todos]);

    setText('');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <form
        onSubmit = {(e) => {
        e.preventDefault();
        handleSubmit();
        }}
      >
        <input
          type = "text"
          value = {text}
          onChange = {(e) => handleChange(e)}
        />
        <input
          type = "submit"
          value = "追加"
          onSubmit = {handleSubmit}
        />
      </form>
      <ul>
        {todos.map((todo) => {
          return <li>{todo.value}</li>;
        })}
      </ul>
    </div>
  );
};
