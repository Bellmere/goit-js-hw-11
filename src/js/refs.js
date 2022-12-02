export default function getRefs() {
  return {
    formEl: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-form-input'),
    searchBtn: document.querySelector('.search-form-button'),
    galleryEl: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
  };
}
