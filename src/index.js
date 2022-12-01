import getRefs from './js/refs';
import Notiflix from 'notiflix';
import { fetchImages } from './js/fetcImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = getRefs();
let pageNumber = 1;
let galleryLightBox = new SimpleLightbox('.gallery a');

refs.loadMore.style.display = 'none';

refs.searchBtn.addEventListener('click', onSearchBtn);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearchBtn(e) {
    e.preventDefault();
    cleanGallery();
    const trimmedValue = refs.searchInput.value.trim();

    if (trimmedValue) {
        fetchImages(trimmedValue, pageNumber).then(r => {
            if (r.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }
            else {
                renderImages(r.hits);
                Notiflix.Notify.success(`Hooray! We found ${r.totalHits} images.`);
                console.log(r.totalHits);
                refs.loadMore.style.display = 'block';
                galleryLightBox.refresh();
            }
        });
    }
};

function onLoadMore(e) {
    e.preventDefault();
    pageNumber += 1;
    const trimmedValue = refs.searchInput.value.trim();
    refs.loadMore.style.display = 'none';
    fetchImages(trimmedValue, pageNumber).then(r => {
        if (r.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
                renderImages(r.hits);
                Notiflix.Notify.success(`Hooray! We found ${r.totalHits} images.`);
                refs.loadMore.style.display = 'block';
                galleryLightBox.refresh();
             if (r.length > r.totalHits) {
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                refs.loadMore.style.display = 'none';
            }
        }
        //  else if (r.length > max){
        //     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        //     refs.loadMore.style.display = 'none';
        //  }
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
    refs.galleryEl.innerHTML += markup;
}

function cleanGallery() {
    refs.galleryEl.innerHTML = '';
    pageNumber = 1;
    refs.loadMore.style.display = 'none';
  }

console.log(refs)