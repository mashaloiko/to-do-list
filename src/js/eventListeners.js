import { input, addBtn, list } from './nodes.js';
import { todos } from './initialRender.js';
import { createToDo } from './toDoCreators.js';

export function eventListeners() {
    input.addEventListener ('input', (event) => {
        addBtn.disabled = event.currentTarget.value === '';
    });
    
    addBtn.addEventListener('click', () => {
        const todo = {
            id: todos.length >= 1 ? todos.at(-1).id + 1 : 1,
            description: input.value,            
            isCompleted: false,
            date: new Date().toLocaleString(),
        };
        input.value = '';
        addBtn.disabled = true;
        const newTodoItem = createToDo(todo.id, todo.description, todo.isCompleted, todo.date);
    
        list.append(newTodoItem);
    
        todos.push(todo);
    
        const jsonTodos = JSON.stringify(todos);
        localStorage.setItem('todos', jsonTodos);
    });
    
    list.addEventListener('click', (event) => {
        switch(event.target.dataset.action) {
            case 'remove': {
                const li = event.target.closest('.tasks__item');
                li.remove();
                const index = todos.findIndex(todo => todo.id === +li.dataset.id);
                todos.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify(todos));
                break;
            }
            case 'mark': {
                const li = event.target.closest('.tasks__item');
                li.classList.toggle('completed');
                const todo = todos.find(todo => todo.id === +li.dataset.id);
                todo.isCompleted = !todo.isCompleted;
                localStorage.setItem('todos', JSON.stringify(todos));
                break;
            }
            default: break;
        }
    });
};