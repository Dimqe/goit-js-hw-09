import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';


let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
if (formData.email) form.elements.email.value = formData.email;
if (formData.message) form.elements.message.value = formData.message;


form.addEventListener(
  'input',
  throttle(event => {
    formData = {
      email: form.elements.email.value,
      message: form.elements.message.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();

  console.log('Form data:', formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = {};
});
