import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catDesc = document.querySelector('.cat-description');
const catImg = document.querySelector('.cat-img');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

document.addEventListener('DOMContentLoaded', () => {
  fillBreedSelect();
});

async function fillBreedSelect() {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    loader.style.display = 'none';
  } catch (error) {
    error.style.display = 'block';
  }
}

breedSelect.addEventListener('change', async () => {
  const selectedCat = breedSelect.value;
  loader.style.display = 'block';
  catDesc.style.display = 'none';
  error.style.display = 'none';

  try {
    const catData = await fetchCatByBreed(selectedCat);
    displaycatDesc(catData[0]);
  } catch (error) {
    error.style.display = 'block';
  }
});

function displaycatDesc(cat) {
  const catImage = document.createElement('img');
  catImage.src = cat.url;

  const catName = document.createElement('h2');
  catName.textContent = `${cat.breeds[0].name}`;

  const catDescription = document.createElement('p');
  catDescription.textContent = `${cat.breeds[0].description}`;

  const catTemperament = document.createElement('p');
  catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

  catImg.innerHTML = '';
  catImg.appendChild(catImage);
  catDesc.innerHTML = '';
  catDesc.appendChild(catName);
  catDesc.appendChild(catDescription);
  catDesc.appendChild(catTemperament);

  catDesc.style.display = 'flex';
  loader.style.display = 'none';
}

function showLoader() {
  loader.classList.remove('hidden');
  breedSelect.classList.add('hidden');
  catDesc.classList.add('hidden');
  error.classList.add('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
  breedSelect.classList.remove('hidden');
}

breedSelect.addEventListener('change', async () => {
  const selectedCat = breedSelect.value;

  showLoader();

  try {
    const catData = await fetchCatByBreed(selectedCat);
    displaycatDesc(catData[0]);
  } catch (error) {
    error.classList.remove('hidden');
  } finally {
    hideLoader();
  }
});
