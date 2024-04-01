// global variables
let filterValue = "all";
let todoEditId = null;

//selectors
const todoInput = document.querySelector(".to-do-input");
const todoForm = document.querySelector(".form-container");
const todoList = document.querySelector(".to-do");
const todoFilter = document.querySelector(".filter-to-dos");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal-edit");
const modalInput = document.querySelector(".input-modal");
const modalEditBtn = document.querySelector(".modal-edit-btn");

//every listners
todoForm.addEventListener("submit", addNewTodo);
todoFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});
backdrop.addEventListener("click", closeModal);
modalEditBtn.addEventListener("click", editTodos);
document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodos(todos);
});

//functions => web API
function addNewTodo(e) {
  e.preventDefault();

  // user should added todo
  if (!todoInput.value.trim()) {
    alert(`
    Nothing added to todo list!
    please enter your jobs to do it :)`);
    return null;
  }

  // create new todo
  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };

  // todos.push(newTodo);
  saveTodos(newTodo);

  filterTodos();
}

function createTodos(todos) {
  // create todos in DOM
  let result = "";

  todos.forEach((todo) => {
    result += `
    <li class="todo ${todo.isCompleted ? "completed" : "uncompleted"}">
        <p class="todo-title ">${todo.title}</p>
        <span>
            <p class="createdAt">${new Date(todo.createdAt).toLocaleDateString(
              "fa-IR"
            )}</p>
            <i class="far edit" onclick="openModal(event)" data-todo-id=${
              todo.id
            }>&#xf044;</i>
            <i class="far click" data-todo-id=${todo.id} >&#xf05d;</i>
            <i class="far trash" data-todo-id=${todo.id} > &#xf014;</i>
        </span>
    </li>
    `;
  });

  todoList.innerHTML = result;
  todoInput.value = "";

  // select remove btns
  const todoRemoveBtn = document.querySelectorAll(".trash");
  todoRemoveBtn.forEach((btn) => btn.addEventListener("click", removeTodos));

  // select check btns
  const todoCheckBtn = document.querySelectorAll(".click");
  todoCheckBtn.forEach((btn) => btn.addEventListener("click", checkTodos));

}

function filterTodos() {
  const todos = getAllTodos();

  switch (filterValue) {
    case "all":
      createTodos(todos);
      break;

    case "completed": {
      const filteredTodos = todos.filter((t) => t.isCompleted);
      createTodos(filteredTodos);
      break;
    }

    case "uncompleted": {
      const filteredTodos = todos.filter((t) => !t.isCompleted);
      createTodos(filteredTodos);
      break;
    }

    default:
      createTodos(todos);
  }
}

function removeTodos(e) {
  let todos = getAllTodos();

  const todoId = +e.target.dataset.todoId;

  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodos(todos);
  filterTodos();
}

function checkTodos(e) {
  let todos = getAllTodos();

  const todoId = +e.target.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}

function findOneTodo(id) {
  const todos = getAllTodos();
  const todo = todos.find((t) => t.id === id);
  return todo;
}

function openModal(e) {
  e.preventDefault();
  backdrop.classList.remove("hidden");
  modal.classList.remove("hidden");

  todoEditId = +e.target.dataset.todoId;
  const todo = findOneTodo(todoEditId);
  modalInput.value = todo.title;
}

function closeModal() {
  backdrop.classList.add("hidden");
  modal.classList.add("hidden");
}

function editTodos() {
  const todos = getAllTodos();
  const todo = todos.find((t) => t.id === todoEditId);
  todo.title = modalInput.value.trim();
  saveAllTodos(todos);
  filterTodos();
  closeModal();
}

//local
function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodos(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
