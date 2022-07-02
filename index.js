const btnGetPosts = document.querySelector('.btn__get-posts');
const btnAddPost = document.querySelector('.btn__add-post');
const container = document.querySelector('.container');

function getUsers(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');

  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);

    callback(response);
  });

  xhr.addEventListener('error', () => {
    console.log('Error');
  });

  xhr.send();
}

function addUser(body, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://jsonplaceholder.typicode.com/users');

  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);

    callback(response);
  });

  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

  xhr.addEventListener('error', () => {
    console.log('Error');
  });

  xhr.send(body);
}

function cardTemplate(user) {
  const cardWrap = document.createElement('div');
  cardWrap.classList.add('card-wrap');
  const card = document.createElement('div');
  card.classList.add('card');
  const userName = document.createElement('h4');
  userName.classList.add('card__user-name');
  userName.textContent = user.name;
  const userCity = document.createElement('p');
  userCity.classList.add('card__user-city');
  userCity.textContent = `City: ${user.address.city}`;
  const userCompany = document.createElement('p');
  userCompany.classList.add('card__user-company');
  userCompany.textContent = `Company: ${user.company.name}`;
  const userPhone = document.createElement('p');
  userPhone.classList.add('card__user-phone');
  userPhone.textContent = `Mobile: ${user.phone}`;
  const userEmail = document.createElement('p');
  userEmail.classList.add('card__user-email');
  userEmail.textContent = `Email: ${user.email}`;

  card.appendChild(userName);
  card.appendChild(userCity);
  card.appendChild(userCompany);
  card.appendChild(userPhone);
  card.appendChild(userEmail);
  cardWrap.appendChild(card);

  return cardWrap;
}

function renderUser(response) {
  const fragment = document.createDocumentFragment();
  response.forEach(user => {
    const card = cardTemplate(user);
    fragment.appendChild(card);
  });
  container.appendChild(fragment);
}

btnGetPosts.addEventListener('click', e => {
  getUsers(renderUser);
});

btnAddPost.addEventListener('click', e => {
  const newUser = {
    id: 999,
    name: 'Maria Qoorpy',
    email: 'MarQoo@gmail.com',
    address: {
      street: 'Kulas Light',
      city: 'Kiev',
      zipcode: '92998-3874'
    },
    phone: '+380508162432',
    company: {
      name: 'QooIP',
      catchPhrase: 'Multi-layered client-server neural-net avc'
    }
  };

  addUser(JSON.stringify(newUser), response => {
    const card = cardTemplate(response);
    container.insertAdjacentElement('afterbegin', card);
  });
});
