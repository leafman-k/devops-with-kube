const apiBase = 'http://localhost:8081';

const fetchTodos = async () => {
  const response = await fetch(`${apiBase}/todos`);
  const todos = await response.json();
  const todosContainer = document.getElementById('todos');
  todosContainer.innerHTML = ''; 
  todos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.innerHTML = `
      <strong>${todo.title}</strong>
    `;
    todosContainer.appendChild(todoDiv);
  });
};

const addTodo = async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;

  const response = await fetch(`${apiBase}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  if (response.ok) {
    document.getElementById('todoForm').reset(); 
    fetchTodos(); 
  } else {
    const error = await response.json();
    alert(`Error: ${error.error}`);
  }
};

document.getElementById('todoForm').addEventListener('submit', addTodo);

fetchTodos();