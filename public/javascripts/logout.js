const button = document.querySelector('#logout');

button.addEventListener('click', (e) => {
  e.preventDefault();

  const instance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  instance.delete('/login')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    window.location.replace("/");
  });

});