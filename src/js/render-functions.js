import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const list = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('#load-btn');

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGallery(images) {
  const createMarkUp = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
      <a class="big-img" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" width="360px" height="152px" /></a>
      <div class="info">
      <p class="info-descr"><b>Likes:</b> ${likes}</p>
      <p class="info-descr"><b>Views:</b> ${views}</p>
      <p class="info-descr"><b>Comments:</b> ${comments}</p>
      <p class="info-descr"><b>Downloads:</b> ${downloads}</p>
      </div>
      </li>`;
      }
    )
    .join('');

  return createMarkUp;
}

export function renderFirstHtml(markup) {
  list.innerHTML = createGallery(markup);
  lightbox.refresh();
}

export function renderSecondHTML(markup) {
  list.insertAdjacentHTML('beforeend', createGallery(markup));
  lightbox.refresh();
}

export function clearGallery() {
  list.innerHTML = '';
}

export function showLoader() {
  loader.hidden = false;
}

export function hideLoader() {
  loader.hidden = true;
}

export function showLoadMoreButton() {
  loadBtn.classList.replace('load-btn-hidden', 'search-btn');
}

export function hideLoadMoreButton() {
  loadBtn.classList.replace('search-btn', 'load-btn-hidden');
}

export function smoothScroll() {
  const cards = document.querySelectorAll('.gallery-item');
  const firstNewCard = cards[cards.length - 15];

  if (!firstNewCard) return;

  const top = firstNewCard.getBoundingClientRect().top;

  window.scrollBy({
    top,
    behavior: 'smooth',
  });
}
