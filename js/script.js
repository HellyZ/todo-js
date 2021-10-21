const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoListEL = document.querySelector(".todo-list");
const todoCompletedEL = document.querySelector(".todo-completed");

function uniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function handleListItemComplete(event) {
  const todoItem = event.target.parentElement.parentElement;
  console.log(todoItem);
  let todos = JSON.parse(localStorage.getItem("todos"));

  // for (let i = 0; i < localStorage.getItem("todos").length; i++) {
  //   storedItem[i] = localStorage.getItem(localStorage.key(todoItem));
  // }
  todos[todoItem.id].completed = !todos[todoItem.id].completed;
  // localStorage.setItem("todos", "");
  localStorage.removeItem("todos");
  localStorage.setItem("todos", JSON.stringify(todos));

  if (todos[todoItem.id].completed) {
    todoItem.parentElement.removeChild(todoItem);
    todoCompletedEL.appendChild(todoItem);
  } else {
    todoCompletedEL.removeChild(todoItem);
    todoListEL.appendChild(todoItem);
  }
  event.stopPropagation();
}

function handleListItemDelete(event) {
  const todoItem = event.target.parentElement.parentElement;
  let todos = JSON.parse(localStorage.getItem("todos"));
  delete todos[todoItem.id];
  localStorage.setItem("todos", JSON.stringify(todos));
  todoItem.parentElement.removeChild(todoItem);
  event.stopPropagation();
}

function createTodoItemElement(item) {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.setAttribute("id", item.id);
  li.innerHTML = `<span class='text-todo'>${item.text}</span><div class='todo-buttons'><button class='todo-remove'></button><button class='todo-complete'></button></div>`;

  li.querySelector(".todo-complete").addEventListener(
    "click",
    handleListItemComplete
  );

  li.querySelector(".todo-remove").addEventListener(
    "click",
    handleListItemDelete
  );
  return li;
}

const displayTodos = function () {
  let todos = JSON.parse(localStorage.getItem("todos")) || {};
  console.log(todos);
  for (const [key, value] of Object.entries(todos)) {
    const li = createTodoItemElement(value);
    !value.completed ? todoListEL.appendChild(li) : todoCompletedEL.append(li);
  }
};

function handleAddTodo(event) {
  event.preventDefault();
  if (headerInput.value) {
    const newTodo = {
      id: uniqueId(),
      text: headerInput.value,
      completed: false,
    };
    let todos = JSON.parse(localStorage.getItem("todos")) || {};
    todos[newTodo.id] = newTodo;
    localStorage.setItem("todos", JSON.stringify(todos));
    headerInput.value = "";
    const li = createTodoItemElement(newTodo);

    todoListEL.appendChild(li);
  } else {
    console.log("Пустая задача");
  }
}

todoControl.addEventListener("submit", handleAddTodo);

displayTodos();
