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
    const spanDate = createElement('span', 'tasks__date');
    const desc = createElement('p', 'tasks__desc');

    li.className = isCompleted ? 'tasks__item completed' : 'tasks__item';
    spanDate.append(date);
    li.append(label, spanDate, button);
    li.dataset.id = id;
    desc.append(description);
    label.append(input, desc);
    input.type = 'checkbox';
    input.checked = isCompleted;
    button.append('X');

    return li;
};