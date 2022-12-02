import getRefs from './js/refs';
import Notiflix from 'notiflix';
import { fetchImages } from './js/fetcImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = getRefs();
let pageNumber = 1;
let galleryLightBox = new SimpleLightbox('.gallery a');
let trimmedValue = '';

refs.loadMore.style.display = 'none';

refs.searchBtn.addEventListener('click', onSearchBtn);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearchBtn(e) {
    e.preventDefault();
    cleanGallery();
    trimmedValue = refs.searchInput.value.trim();

    if (trimmedValue) {
        onClickRenderImages();
    }
    else {
       return Notiflix.Notify.failure('Field must be filled!');
    }
};

function onLoadMore(e) {
    e.preventDefault();
    pageNumber += 1;
    refs.loadMore.style.display = 'none';
    onClickRenderImages();
};

function onClickRenderImages() {
    fetchImages(trimmedValue, pageNumber).then(r => {
        if (r.data.totalHits === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        else {
            renderImages(r.data.hits);
            Notiflix.Notify.success(`Hooray! We found ${r.data.totalHits} images.`);
            refs.loadMore.style.display = 'block';
            galleryLightBox.refresh();
        }
    });
};

function renderImages(images) {
    const markup = images.map(image => {
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
        `
    }).join('');
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

function cleanGallery() {
    refs.galleryEl.innerHTML = '';
    pageNumber = 1;
    refs.loadMore.style.display = 'none';
  }