import { input, addBtn, list, changeBtn, filterNew, filterOld, filterCompleted, filterUncompleted } from './nodes.js';
import { todos } from './initialRender.js';
import { createToDo } from './toDoCreators.js';
// import { flickr } from './flickrAPI.js';

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

    changeBtn.addEventListener('click', () => {
        const flickr = {
            key: '3352b173d96c26bb29a0f24c4ce50065',
            url: 'https://www.flickr.com/',
            getRequestUrl(tags) {
                return `${this.url}/services/rest/?method=flickr.photos.search&api_key=${this.key}&tags=${tags}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`;
            },
        };
        const time = new Date();
        time.getHours;
        let tags;
        if (time[0] <= 5) {
            tags = 'night, stars, moon, summer';
        } else if (time[0] > 5 && time[0] <= 11) {
            tags = 'morning, sun, alarm';
        } else if (time[0] > 11 && time[0] <= 18) {
            tags = 'day, mountains';
        } else {
            tags = 'evening, sunset';
        };
        fetch(flickr.getRequestUrl(tags))
            .then(response => {
                if (response.ok && response.status === 200) {
                    return response.json();
                } else {
                    return document.body.style.background = 'pink';
                };
            })
            .then(data => {
                console.log(data);
                const { photo: images } = data.photos;
                console.log(images);
                let id = 0;
                const img = new Image();
                img.src = images[id].url_h;
                img.addEventListener('load', () => {
                    document.body.style.backgroundImage = `url('${images[id].url_h}')`;
                });
                img.addEventListener('error', () => {
                    document.body.style.background = `pink`;
                });
                id++;
            });
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