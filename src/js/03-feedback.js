import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onClickButton);

const LOCAL_DATA = 'feedback-form-state';
const date = {};

if (localStorage.getItem(LOCAL_DATA)) {
  const parsedData = JSON.parse(localStorage.getItem(LOCAL_DATA));
  form.elements.email.value = parsedData.email || '';
  form.elements.message.value = parsedData.message;
}
function onInput(e) {
  date[e.target.name] = e.target.value;

  const stringifyDate = JSON.stringify(date);
  localStorage.setItem(LOCAL_DATA, stringifyDate);
}

function onClickButton(e) {
  const parsedData = JSON.parse(localStorage.getItem(LOCAL_DATA));
  console.log(parsedData);

  e.preventDefault();
  localStorage.removeItem(LOCAL_DATA);
  e.currentTarget.reset();

  delete date.email;
  delete date.message;
}
