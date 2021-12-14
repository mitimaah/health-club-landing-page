'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const form = document.querySelector('.modal__form');
const username = document.getElementById('username');
const surname = document.getElementById('surname');
const age = document.getElementById('age');
const email = document.getElementById('email');

// DROPDOWN MENU
function dropdownMenu() {
  document.getElementById('dropdownMenu').classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.onclick = e => {
  if (!e.target.matches('.nav__link')) {
    let dropdowns = document.getElementsByClassName('dropdown-content');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

// FORM
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

form.addEventListener('submit', e => {
  e.preventDefault(); //prevent form from submitting

  console.log(checkInputs());

  if (checkInputs()) {
    form.submit();
  }
});

function checkInputs() {
  // trim to remove the whitespaces
  const usernameValue = username.value.trim();
  const surnameValue = surname.value.trim();
  const ageValue = age.value.trim();
  const emailValue = email.value.trim();
  let inputValidated = true;

  if (usernameValue === '') {
    setErrorFor(username, 'Wprowadź imię');
    inputValidated = false;
  } else {
    setSuccessFor(username);
  }

  if (surnameValue === '') {
    setErrorFor(surname, 'Wprowadź nazwisko');
    inputValidated = false;
  } else {
    setSuccessFor(surname);
  }

  if (ageValue === '') {
    setErrorFor(age, 'Wprowadź wiek');
    inputValidated = false;
  } else {
    setSuccessFor(age);
  }

  if (emailValue === '') {
    setErrorFor(email, 'Wprowadź adres e-mail');
    inputValidated = false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Niepoprawny adres e-mail');
    inputValidated = false;
  } else {
    setSuccessFor(email);
  }

  return inputValidated;
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
