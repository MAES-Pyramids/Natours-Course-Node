/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
//-------------------------------------------//
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'Get',
      url: '/api/v1/users/logout'
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Safely Logging out  ........');

      window.setTimeout(() => {
        location.assign('/login');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};

// data-user=`${JSON.stringify(user)}`
// const userData = document.getElementById('user');
