/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
//-------------------------------------------//
export const updatesettings = async (data, type) => {
  try {
    if (type === 'password')
      document.querySelector('.save-password').textContent = 'Updating...';
    if (type === 'data')
      document.querySelector('.save-settings').textContent = 'Updating...';

    const url =
      type === 'password'
        ? `/api/v1/users/updatePassword`
        : `/api/v1/users/UpdateMe`;

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} Updated successfully!`);
      if (type === 'password')
        document.querySelector('.save-password').textContent = 'Save password';
      if (type === 'data')
        document.querySelector('.save-settings').textContent = 'Save settings';

      window.setTimeout(() => {
        location.assign('/me');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    if (type === 'password')
      document.querySelector('.save-password').textContent = 'Save password';
    if (type === 'data')
      document.querySelector('.save-settings').textContent = 'Save settings';
  }
};
