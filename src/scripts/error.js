
const redirectToHomePage = () => {
  const btnNewSearch = document.querySelector('.new-search__button');

  btnNewSearch.addEventListener('click', () => location.href = '../../index.html');
};

redirectToHomePage();