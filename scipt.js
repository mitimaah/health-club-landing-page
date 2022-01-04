'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const form = document.querySelector('.modal__form');
const username = document.getElementById('username');
const surname = document.getElementById('surname');
// const age = document.getElementById('age');
const email = document.getElementById('email');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav__links');
const navLink = document.querySelectorAll('.nav__link');

////////////////////////////
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

///////////////////////////////////////
// Page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////
// FORM MODAL WINDOW
const openModal = function (e) {
  // e.preventDefault();
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
  // const ageValue = age.value.trim();
  const emailValue = email.value.trim();
  let inputValidated = true;

  if (usernameValue.length < 1) {
    setErrorFor(username, 'Wprowadź imię');
    inputValidated = false;
  } else {
    setSuccessFor(username);
  }

  if (surnameValue.length < 1) {
    setErrorFor(surname, 'Wprowadź nazwisko');
    inputValidated = false;
  } else {
    setSuccessFor(surname);
  }

  // if (ageValue === '') {
  //   setErrorFor(age, 'Wprowadź wiek');
  //   inputValidated = false;
  // } else {
  //   setSuccessFor(age);
  // }

  if (emailValue.length < 1) {
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

//////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();

    // lub poniżej inny sposób
    // if (e.key === 'ArrowLeft') prevSlide();
    // e.key === 'ArrowRight' && nextSlide();
  });
};
slider();

// HAMBURGER
///////////////////////////////////////
hamburger.addEventListener('click', mobileMenu);
navLink.forEach(n => n.addEventListener('click', closeMenu));

function mobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}
///////////////////////////////////////
