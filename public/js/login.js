/* eslint-disable */
document.querySelector('.form--login').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});

async function login(email, password) {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      alert('Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert(`${err.response.data.message}`);
  }
}
