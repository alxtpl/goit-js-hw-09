// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

// import Notiflix from 'notiflix';

const inputNode = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');
let daysNode = document.querySelector('[data-days]');
let hoursNode = document.querySelector('[data-hours]');
let minutesNode = document.querySelector('[data-minutes]');
let secondsNode = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', onStart);

startBtn.disabled = true;
let timeGap = null;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        timeGap = selectedDates[0] - options.defaultDate;
        console.log(timeGap);

        console.log(selectedDates[0]);
        console.log(options.defaultDate);
        console.log(options.defaultDate > selectedDates[0]);
        if (options.defaultDate > selectedDates[0]) {
            window.alert('Please choose a date in the future');
            startBtn.disabled = true;
            return;
        }
        startBtn.disabled = false;
        clearInterval(timerId);
    },
};
flatpickr(inputNode, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function onStart() {
    console.log('Start');
    startBtn.disabled = true;
    timerId = setInterval(() => {
        if (timeGap > 1000) {
            timeGap -= 1000;
            const { days, hours, minutes, seconds } = convertMs(timeGap);

            daysNode.textContent = days;
            hoursNode.textContent = hours;
            minutesNode.textContent = minutes;
            secondsNode.textContent = seconds;
        } else {
            clearInterval(timerId);
        }

        console.log(timeGap);
        console.log(convertMs(timeGap));
    }, 1000);
}

function pad(value) {
    return String(value).padStart(2, '0');
}