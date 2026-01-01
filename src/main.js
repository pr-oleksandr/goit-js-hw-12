import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  showLoadMoreButton,
  hideLoadMoreButton,
  renderFirstHtml,
  renderSecondHTML,
  clearGallery,
  showLoader,
  hideLoader,
  smoothScroll,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const loadBtn = document.querySelector('#load-btn');
const list = document.querySelector('.gallery');

form.addEventListener('submit', handlerSubmit);
loadBtn.addEventListener('click', onClick);

hideLoader();

let page = 1;
let totalPages;
let currentValue = '';

async function handlerSubmit(event) {
  event.preventDefault();
  hideLoadMoreButton();

  page = 1;
  totalPages = null;

  currentValue = input.value.trim();

  if (!currentValue) {
    iziToast.show({
      message: 'Ну і шо мені шукати? Напиши шось',
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#fff',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const res = await getImagesByQuery(currentValue, page);

    if (res.data.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
      });
    } else {
      renderFirstHtml(res.data.hits);
      const perPage = res.config.params.per_page;

      totalPages = Math.ceil(res.data.totalHits / perPage);

      if (page < totalPages) {
        showLoadMoreButton();
      } else {
        iziToast.show({
          message:
            'We are sorry, but you have reached the end of search results',
          position: 'topRight',
          backgroundColor: '#6c8cff',
        });
      }
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
  hideLoadMoreButton();
  showLoader();
  try {
    const res = await getImagesByQuery(currentValue, page);

    renderSecondHTML(res.data.hits);
    smoothScroll();

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.show({
        message: 'We are sorry, but you have reached the end of search results',
        position: 'topRight',
        backgroundColor: '#6c8cff',
      });
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
