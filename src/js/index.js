// how to do this project:
// form -> submit => create a new todo {id , createdAt , titlt , isCompleted}
// const todos = [] => todos.push(...)
// show todos in DOM -> create todo and show them

// all todos saved in array
let todos = [];
//create a global value for filter todos
let filterValue = "all";

//selectors
const todoInput = document.querySelector(".to-do-input");
const todoForm = document.querySelector(".form-container");
const todoList = document.querySelector(".to-do");
const todoFilter = document.querySelector(".filter-to-dos");
// const todoRemoveBtn = document.querySelector(".trash");

//every listners
todoForm.addEventListener("submit", addNewTodo);
todoFilter.addEventListener("change", (e) => {
    filterValue = e.target.value;
    filterTodos()
});
// todoRemoveBtn.addEventListener("click", removeTodos)

//functions
function addNewTodo(e) {
  // stap refresh page (submitted type)
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

  todos.push(newTodo);

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
            <i style="font-size: 20px" class="far click" data-todo-id=${
              todo.id
            } >&#xf05d;</i>
            <i style="font-size: 20px" class="far trash" data-todo-id=${
              todo.id
            } > &#xf014;</i>
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
  const todoId = +e.target.dataset.todoId;
  todos = todos.filter((t) => t.id !== todoId);
  filterTodos();
}

function checkTodos(e) {
  const todoId = +e.target.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  filterTodos();
}

//local
