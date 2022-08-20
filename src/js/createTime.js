import { clock } from './nodes.js';

function addLeadingZero(a) {
    return a < 10 ? '0' + a : a;
}

export function createTime() {
    const currentTime = new Date();
    let h = addLeadingZero(currentTime.getHours());
    let m = addLeadingZero(currentTime.getMinutes());
    clock.textContent = (`${h} : ${m}`);
};
setInterval(createTime, 500);