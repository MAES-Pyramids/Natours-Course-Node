/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { bookTour } from './stripe';
import { updatesettings } from './updateSettings';
import { SendTokenEmail, resetPassword } from './resetPassword';
//-------------------------------------------//
const mapBox = document.getElementById('map');
const bookBtn = document.getElementById('book-tour');
const ResetButton = document.querySelector('#Reset');
const loginForm = document.querySelector('.form--login');
const resetForm = document.querySelector('.form--reset');
const signupForm = document.querySelector('.form--signup');
const logoutBtn = document.querySelector('.nav__el--logout');
const UpdatePassForm = document.querySelector('.form--updatePass');
const updateSettingsBtn = document.querySelector('.form-user-data');
const updatePasswordBtn = document.querySelector('.form-user-password');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}
if (resetForm) {
  resetForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    SendTokenEmail(email);
    ResetButton.textContent = 'Processing...';
  });
}
if (UpdatePassForm) {
  UpdatePassForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    resetPassword(password, passwordConfirm);
    ResetButton.textContent = 'Processing...';
  });
}
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
if (updateSettingsBtn) {
  updateSettingsBtn.addEventListener('submit', function(event) {
    event.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updatesettings(form, 'data');
  });
}
if (updatePasswordBtn) {
  updatePasswordBtn.addEventListener('submit', function(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const newPasswordConfirm = document.getElementById('password-confirm')
      .value;
    updatesettings(
      { currentPassword, newPassword, newPasswordConfirm },
      'password'
    );
  });
}
if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
//-------------------------------------------//
