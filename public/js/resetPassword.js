/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
//-------------------------------------------//
export const SendTokenEmail = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Reset Token sent to your email!');
      window.setTimeout(() => {}, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const resetPassword = async (password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'patch',
      url: `/api/v1/users/resetPassword/${window.location.href
        .split('/')
        .at(-1)}`,
      data: {
        password,
        passwordConfirm
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Password Reset Successful!, Logging in...');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
