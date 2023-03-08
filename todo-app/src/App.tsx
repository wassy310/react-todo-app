import { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
};

export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setText('');
  };

  const handleEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id == id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
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
          return (
            <li key = {todo.id}>
              <input
                type = "checkbox"
                checked = {todo.checked}
                onChange = {() => console.log('checked')}
              />
              <input
                type = "text"
                value = {todo.value}
                onChange = {(e) => handleEdit(todo.id, e.target.value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
