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
    const label = createElement('label', 'tasks__label');
    const input = createElement('input', 'tasks__checkbox', 'mark');
    const button = createElement('button', 'tasks__remove', 'remove');
    const span = createElement('span', 'tasks__date');

    li.className = isCompleted ? 'tasks__item completed' : 'tasks__item';
    span.append(date);
    li.append(label, span, button);
    li.dataset.id = id;
    label.append(input, description);
    input.type = 'checkbox';
    input.checked = isCompleted;
    button.append('X');

    return li;
};