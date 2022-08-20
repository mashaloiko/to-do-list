import { list } from './nodes.js';
import { createToDo } from './toDoCreators.js';

export let todos = [];

export function render () {
    if (localStorage.getItem('todos')) {
        const data = JSON.parse(localStorage.getItem('todos'));
        todos.push(...data);
    };
    const todoItems = todos.map((item) => {
        const li = createToDo(item.id, item.description, item.isCompleted, item.date);
        return li;
    });
    list.append(...todoItems);
};