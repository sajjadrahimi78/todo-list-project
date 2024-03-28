// how to do this project:
// form -> submit => create a new todo {id , createdAt , titlt , isCompleted}
// const todos = [] => todos.push(...)
// show todos in DOM -> create todo and show them
// filtr todos -> all completed and uncompleted
// check and remove btns
// get and save todos in local storage

// all todos saved in array
// let todos = [];
//create a global value for filter todos

let filterValue = "all";

//selectors
const todoInput = document.querySelector(".to-do-input");
const todoForm = document.querySelector(".form-container");
const todoList = document.querySelector(".to-do");
const todoFilter = document.querySelector(".filter-to-dos");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal-edit");
const inputFormModal = document.querySelector(".edit-form-container");

//every listners
todoForm.addEventListener("submit", addNewTodo);
todoFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});
backdrop.addEventListener("click", closeModal);
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
            <i class="far edit" data-todo-id=${todo.id}>&#xf044;</i>
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

  // select edit btns
  const todoEditBtn = document.querySelectorAll(".edit");
  todoEditBtn.forEach((btn) => btn.addEventListener("click", openModal));
}

function createModalTodos() {
  const todos = getAllTodos();
  
  const inputModal = document.createElement("div");
  inputModal.innerHTML = `
  <input type="text" class="to-do-input input-modal" name="" id="" data-todo-id=""/>
  <button
    class="to-do-button modal-edit-btn"
    data-todo-id=""
    type="submit"
  >
    <i class="material-icons fa">&#xf044;</i>
  </button> 
  `;
  inputModal.classList.add("to-do-input");
  inputFormModal.append(inputModal);
}
createModalTodos();

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

function openModal(e, id) {
  e.preventDefault();
  backdrop.classList.remove("hidden");
  modal.classList.remove("hidden");

  let todos = getAllTodos();
  const todoId = +e.target.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  inputFormModal.children[0].children[0].value = todo.title;
  inputFormModal.children[0].children[1].addEventListener("click", editTodos);
  inputFormModal.children[0].children[0].dataset.todoId = todoId;
}

function closeModal() {
  backdrop.classList.add("hidden");
  modal.classList.add("hidden");
}

function editTodos(e) {
  e.preventDefault();
  let todos = getAllTodos();
  const todoId = +e.target.parentElement.previousElementSibling.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  const todoValue = e.target.parentElement.previousElementSibling.value;
  todo.title = todoValue

  saveAllTodos(todos);
  filterTodos();
  closeModal()
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
