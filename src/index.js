import getRefs from './js/refs';
import Notiflix from 'notiflix';
import { fetchImages } from './js/fetcImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';

const refs = getRefs();
refs.searchBar.style.cssText = `
    position: sticky;
    top: 0;
    z-index: 999;
`;

let pageNumber = 1;
let galleryLightBox = new SimpleLightbox('.gallery a');
let trimmedValue = '';

const options = {
  rootMargin: '150px',
};

refs.loadMore.style.display = 'none';
const observer = new IntersectionObserver(onEntry, options);

refs.searchBtn.addEventListener('click', throttle(onSearchBtn, 300));
// window.addEventListener('scroll', throttle(infinityScroll, 600));
// window.addEventListener('resize', throttle(infinityScroll, 600));

function onSearchBtn(e) {
  e.preventDefault();
  // window.scrollTo({ top: 0, behavior: 'instant' });
  trimmedValue = refs.searchInput.value.trim();
  cleanGallery();

  if (trimmedValue) {
    onClickRenderImages();
  } else {
    return Notiflix.Notify.failure('Field must be filled!');
  }
}

 function onClickRenderImages() {
  fetchImages(trimmedValue, pageNumber).then(r => {
    if (!r.data.totalHits) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (!r.data.hits.length) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      console.log(pageNumber);
      renderImages(r.data.hits);
      Notiflix.Notify.success(`Hooray! We found ${r.data.totalHits} images.`);
      galleryLightBox.refresh();
    }
  });
}

// async function infinityScroll(e) {
//   const height = document.body.offsetHeight;
//   const screenHeight = window.innerHeight;
//   const scrolled = window.scrollY;
//   const threshold = height - screenHeight / 4;
//   const position = scrolled + screenHeight;

//   if (trimmedValue && position >= threshold) {
//       pageNumber += 1;
//       await onClickRenderImages();
//   }
// }

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && trimmedValue) {
      pageNumber += 1;
      onClickRenderImages();
    };
});
}

observer.observe(refs.sentinel);

 function renderImages(images) {
  const markup = images
    .map(image => {
      return `
        <div class="photo-card">
            <a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
              </p>
              <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>
              </p>
              <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span>
              </p>
            </div>
        </div>
        `;
    })
    .join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

function cleanGallery() {
  pageNumber = 1;
  refs.galleryEl.innerHTML = '';
}
