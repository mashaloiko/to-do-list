import { render } from './js/initialRender.js';
import { eventListeners } from './js/eventListeners.js';
import { createTime } from './js/createTime.js';
import { getUser } from './js/requests.js';
render();
eventListeners();
createTime();
getUser();