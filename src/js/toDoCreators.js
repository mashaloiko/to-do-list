function createElement (tagName, className, action) {
    const element = document.createElement(tagName);

    if (className !== '') {
        element.className = className;
    }

    if (action) {
        element.dataset.action = action;
    }

    return element;
}

export function createToDo(id, description = '', isCompleted, date) {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const button = createElement('button', 'tasks__remove', 'remove');
    
    li.className = isCompleted ? 'tasks__item completed' : 'tasks__item';

    li.append(label, date, button);
    li.dataset.id = id;
    label.append(input, description);
    input.type = 'checkbox';
    input.className = 'tasks__checkbox';
    input.checked = isCompleted;
    input.dataset.action = 'mark';
    button.append('X');

    return li;
};