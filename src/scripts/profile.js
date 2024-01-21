
const btnChangeUser = document.querySelector('.profile__change-user--button');
const avatarUser = document.querySelector('.profile__image');
const userLogin = document.querySelector('.profile__username');
const userName = document.querySelector('.profile__name');

btnChangeUser.addEventListener('click', () => {
  location.href = '../../index.html';
  localStorage.clear();
});

const getUserFormLocalStorage = async () => {
  const userInfoJson = await JSON.parse(localStorage.getItem("@githuUserInfo"));
  renderUserInfo(userInfoJson);

  return userInfoJson;
};

const renderUserInfo = (object) => {
  userLogin.innerText = object.login;
  avatarUser.src = object.avatar_url;
  userName.innerText = object.name;
};

const fetchUserRepositories = async () => {
  const userData = await getUserFormLocalStorage();
  const repositories = await fetch(`https://api.github.com/users/${userData.login}/repos`,)
  .then(res => res.json());

  const ul = document.querySelector('.profile__ul');
  ul.innerHTML = ''
  
  repositories.forEach(repos => {
    const list = document.createElement('li');
    const title = document.createElement('h4');
    const paragaph = document.createElement('p');
    const link = document.createElement('a');

    title.innerText = repos.name;
    paragaph.innerText = repos.description || 'Sem descrição';
    link.innerText = "Repositŕoio";
    link.href = repos.html_url;
    link.target = "_blank";

    list.append(title, paragaph, link);
    ul.appendChild(list)
  });
};

await fetchUserRepositories()