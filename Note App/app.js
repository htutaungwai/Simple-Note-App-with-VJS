const form = document.getElementById("form");
const input = document.getElementById("input");
const todoUL = document.getElementById("todos");
const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
    console.log(todos)
    todos.forEach(todo => 
        adddTodo(todo))
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    adddTodo();
});

function adddTodo(todo){
    let todoText = input.value;
    if (todo){
        todoText = todo.text;
    }
    if(todoText){
        const todoEl = document.createElement("li");
        if(todo && todo.completed){
            todoEl.classList.add('completed');
        }
        todoEl.innerText = todoText;
        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");
            updateLS();
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        })
        todoUL.appendChild(todoEl);
        input.value = "";
        updateLS();
    } 
}
    


function updateLS(){
    const todosEl = document.querySelectorAll('li');
    const todos = [];
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    });

    localStorage.setItem("todos", JSON.stringify(todos))
}