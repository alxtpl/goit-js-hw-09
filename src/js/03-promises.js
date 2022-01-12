import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);

const firstDelayNode = document.querySelector('[name="delay"]');
const delayStepNode = document.querySelector('[name="step"]');
const amountNode = document.querySelector('[name="amount"]');
const createBtn = document.querySelector('[type="submit"]').addEventListener('click', onCreate);

function onCreate(e) {
    e.preventDefault();
    console.log('Create');
    //   console.log('firstDelayNode', firstDelayNode.value);
    //   console.log('firstDelayNode', delayStepNode.value);
    console.log('amountNode', amountNode.value);
    let delayVar = +firstDelayNode.value;
    let positionVar = +delayStepNode.value;
    for (let index = 0; index < amountNode.value; index++) {
        createPromise(positionVar, delayVar)
            .then(({ position, delay }) => {
                Notify.success(`✅ Fulfilled promise ${index + 1} in ${delay}ms`);
                console.log(`✅ Fulfilled promise ${index + 1} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notify.failure(`❌ Rejected promise ${index + 1} in ${delay}ms`);
                console.log(`❌ Rejected promise ${index + 1} in ${delay}ms`);
            });
        delayVar += positionVar;
    }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}