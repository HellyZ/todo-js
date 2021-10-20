const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoListEL = document.querySelector(".todo-list");
const todoCompletedEL = document.querySelector(".todo-completed");

function uniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const init = function () {
  for (let i = 0, length = localStorage.length; i < length; i++) {
    const key = localStorage.key(i);
    const value = localStorage[key];
  }
};

function handleListItemComplete(event) {
  const todoItem = event.target.parentElement.parentElement;
  let storedItem = JSON.parse(localStorage.getItem(todoItem.id));
  storedItem.completed = !storedItem.completed;
  localStorage.setItem(storedItem.id, JSON.stringify(storedItem));
  if (storedItem.completed) {
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
  localStorage.removeItem(todoItem.id);
  todoItem.parentElement.removeChild(todoItem);
  event.stopPropagation();
}

const displayTodos = function () {
  const todos = Object.values(localStorage).map((i) => {
    return JSON.parse(i);
  });
  todos.forEach(function (item) {
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

    !item.completed ? todoListEL.appendChild(li) : todoCompletedEL.append(li);

  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (headerInput.value) {
    const newTodo = {
      id: uniqueId(),
      text: headerInput.value,
      completed: false,
    };
    console.log(newTodo);
    localStorage.setItem(newTodo.id, JSON.stringify(newTodo));
    headerInput.value = "";
    document.location.reload();
  } else {
    console.log("Пустая задача");
  }
});

init();
displayTodos();
