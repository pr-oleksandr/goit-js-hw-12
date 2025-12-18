import axios from 'axios';

const API_KEY = '53452930-453d1b75f98a5875cf6a66d5c';

export async function getImagesByQuery(query, page) {
  const result = await axios('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return result;
}
