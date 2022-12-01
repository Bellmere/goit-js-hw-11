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

function onSearchBtn(e) {
    e.preventDefault();
    cleanGallery();
    const trimmedValue = refs.searchInput.value.trim();
}

console.log(refs)