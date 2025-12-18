import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const loadBtn = document.querySelector('#load-btn');
const list = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', handlerSubmit);
loadBtn.addEventListener('click', onClick);
loadBtn.classList.replace('search-btn', 'load-btn-hidden');

hideLoader();

let page = 1;

async function handlerSubmit(event) {
  event.preventDefault();

  const searchValue = input.value;
  clearGallery();
  showLoader();

  try {
    const res = await getImagesByQuery(searchValue, page);

    if (res.data.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
      });
    } else {
      list.innerHTML = createGallery(res.data.hits);
      lightbox.refresh();
      loadBtn.classList.replace('load-btn-hidden', 'search-btn');
    }
  } catch (error) {
    iziToast.show({
      message: `${error}`,
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#fff',
    });
  } finally {
    hideLoader();
  }
}

async function onClick(event) {
  page += 1;
  loadBtn.disabled = true;
  try {
    const searchValue = input.value;
    const res = await getImagesByQuery(searchValue, page);
    const totalPages = Math.floor(res.data.total / res.data.hits.length);

    list.insertAdjacentHTML('beforeend', createGallery(res.data.hits));
    lightbox.refresh();

    if (page >= totalPages) {
      loadBtn.classList.replace('search-btn', 'load-btn-hidden');
    }
  } catch (error) {
    iziToast.show({
      message: `${error}`,
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#fff',
    });
  } finally {
    loadBtn.disabled = false;
  }
}
