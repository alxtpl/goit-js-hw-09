function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// console.log(color);
// .disabled = true;
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyNode = document.querySelector('body');
startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);
let timerId = null;

function onStart() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    console.log('start');
    timerId = setInterval(() => {
        const color = getRandomHexColor();

        console.log(`backgroundColor:  ${color}`);
        bodyNode.style.backgroundColor = color;
    }, 1000);
}

function onStop() {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    console.log('stop');
    clearInterval(timerId);
    console.log(`Interval with id ${timerId} has stopped!`);
}