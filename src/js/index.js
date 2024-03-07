// how to do this project:
// form -> submit => create a new todo {id , createdAt , titlt , isCompleted}
// const todos = [] => todos.push(...)
// show todos in DOM -> create todo and show them

// all todos saved in array
const todos = [];

//selectors
const todoInput = document.querySelector(".to-do-input");
const todoForm = document.querySelector(".form-container");
const todoList = document.querySelector(".to-do");
const todoFilter = document.querySelector(".filter-to-dos");

//every listners
todoForm.addEventListener("submit", addNewTodo);
todoFilter.addEventListener("change", filterTodos);

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

  createTodos(todos);
}

function createTodos(todos) {
  // create todos in DOM
  let result = "";

  todos.forEach((todo) => {
    result += `
    <li class="todo">
        <p class="todo-title">${todo.title}</p>
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
}

function filterTodos(e) {
  const filter = e.target.value;


  switch (filter) {
    case "all": 
      createTodos(todos);
      break;
    
    case "completed":{ 
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

//local

