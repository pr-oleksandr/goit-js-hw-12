const list = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export function createGallery(images) {
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

export function clearGallery() {
  list.innerHTML = '';
}

export function showLoader() {
  loader.hidden = false;
}

export function hideLoader() {
  loader.hidden = true;
}
