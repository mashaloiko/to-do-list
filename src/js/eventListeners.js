import { input, addBtn, list, changeBtn, filterNew, filterOld, filterCompleted, filterUncompleted } from './nodes.js';
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
    let id = 0;
    changeBtn.addEventListener('click', () => {
        const images = JSON.parse(localStorage.getItem('images')) || [] ;
        document.body.style.backgroundImage = `url('${images[id].url_h}')`;
        id = (id + 1 + images.length) % images.length;
    });

    filterNew.addEventListener('click', () => {
        const tasks = list.querySelectorAll('.tasks__item');
        tasks.forEach((task) => {
            task.style.order = '0';
        });
        list.style.flexDirection = 'column-reverse';
    });

    filterOld.addEventListener('click', () => {
        const tasks = list.querySelectorAll('.tasks__item');
        tasks.forEach((task) => {
            task.style.order = '0';
        });
        list.style.flexDirection = 'column';
    });

    filterCompleted.addEventListener('click', () => {
        list.style.flexDirection = 'column';
        const tasks = list.querySelectorAll('.tasks__item');
        tasks.forEach((task) => {
            if (!task.classList.contains('completed')) {
                task.style.order = '2';
            } else {
                task.style.order = '1';
            };
        });
    });

    filterUncompleted.addEventListener('click', () => {
        const tasks = list.querySelectorAll('.tasks__item');
        list.style.flexDirection = 'column';
        tasks.forEach((task) => {
            if (!task.classList.contains('completed')) {
                task.style.order = '1';
            } else {
                task.style.order = '2';
            };
        });
    })
};