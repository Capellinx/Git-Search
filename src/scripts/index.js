const btnSearchUser = document.querySelector('.index__button');
const inputSearch = document.querySelector('.index__input');

const fecthUserData = async (userValue) => {
  const response = await fetch(`https://api.github.com/users/${userValue}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  }).then((res) => {
    if(res.ok) {
      return res.json();
    }else {
      location.href = './src/pages/error.html';
    };
  });
  return response;
};

const verifyMessage = async (userValue) => {
  const response = await fecthUserData(userValue);

  if (response.massage === 'Not Found' || response.massage == '') {
    location.href = './src/pages/error.html';
  } else {
    localStorage.setItem("@githuUserInfo", JSON.stringify(response));
    location.href = './src/pages/profile.html';
  };
};

const searchUser = async () => {
  const user = inputSearch.value;
  user == '' ? alert('Digite um usuário existente') : await verifyMessage(user);
}

btnSearchUser.addEventListener('click', searchUser);  