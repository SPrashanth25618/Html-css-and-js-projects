const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filter");

let todos = [];
let currentFilter = "all";

addTaskBtn.addEventListener("click", () => {
  addTodo(taskInput.value);
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo(taskInput.value);
});

clearCompletedBtn.addEventListener("click", clearCompleted);

function addTodo(text) {
  if (text.trim() === "") return;
  const todo = {
    id: Date.now(),
    text,
    completed: false,
  };
  todos.push(todo);
  savetodos();
  rendortodos();
  taskInput.value = "";
}

function savetodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  updateItemcnt();
  checkEmptystate();
}

function updateItemcnt() {
  const uncompletedtodos = todos.filter((todo) => !todo.completed);
  itemsLeft.textContent = `${uncompletedtodos.length} item${
    uncompletedtodos.length !== 1 ? "s" : ""
  } left`;
}

function checkEmptystate() {
  const filteredtodos = filterTodos(currentFilter);
  if (filteredtodos.length === 0) emptyState.classList.remove("hidden");
  else emptyState.classList.add("hidden");
}

function filterTodos(filter) {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

function rendortodos() {
  todosList.innerHTML = "";

  const filteredTodos = filterTodos(currentFilter);
  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    if (todo.completed) todoItem.classList.add("completed");

    const checkBoxcontainer = document.createElement("label");
    checkBoxcontainer.classList.add("checkbox-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change",() => toggletodo(todo.id));

    const checkmark = document.createElement("span");
    checkmark.classList.add("checkmark");

    checkBoxcontainer.appendChild(checkbox);
    checkBoxcontainer.appendChild(checkmark);

    const todotext = document.createElement("span");
    todotext.classList.add("todo-item-text");
    todotext.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.addEventListener("click", () => deletetodo(todo.id));

    const box = document.createElement("div");
    box.classList.add("todo-item-container");

    todoItem.appendChild(checkBoxcontainer);
    box.appendChild(todotext);
    box.appendChild(deleteBtn);
    todoItem.appendChild(box);

    todosList.appendChild(todoItem);
  });
}

function deletetodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  savetodos();
  rendortodos();
}

function toggletodo(id) {
  todos = todos.map((todo) => {
    if(todo.id === id){
      return {...todo,completed:!todo.completed}
    }
    return todo;
  });
  savetodos();
  rendortodos();
}

function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  savetodos();
  rendortodos();
}

function loadTodos() {
  const storedtodos = localStorage.getItem("todos");
  if (storedtodos) todos = JSON.parse(storedtodos);
  rendortodos();
}

filters.forEach(filter => {
  filter.addEventListener("click",() => {
    setActivefilter(filter.getAttribute("data-filter"));
  })  
});

function setActivefilter(filter){
  currentFilter = filter;

  filters.forEach(item => {
    if(item.getAttribute("data-filter") === currentFilter){
      item.classList.add("active");
    }else{
      item.classList.remove('active');
    }
  });
  rendortodos();
}

function setDate(){
  const options = {weekday:"long",month:"short",day:"numeric"};
  const today = new Date();
  dateElement.textContent = today.toLocaleDateString("en-US",options);
}

window.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  updateItemcnt();
  setDate();
});