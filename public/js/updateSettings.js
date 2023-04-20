/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
//-------------------------------------------//
export const updatesettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? `http://127.0.0.1:3000/api/v1/users/updatePassword`
        : `http://127.0.0.1:3000/api/v1/users/UpdateMe`;

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} Updated successfully!`);
      window.setTimeout(() => {
        location.assign('/me');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
