import { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if(!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos([newTodo, ...todos]);
    setText('');
  };

  const handleEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if(todo.id === id) {
        todo.value = value;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if(todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if(todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="submit"
          value="追加"
          onSubmit={handleSubmit}
        />
      </form>
      <ul>
        {todos.map((todo) => {
          return(
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleCheck(todo.id, todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleRemove(todo.id, todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
