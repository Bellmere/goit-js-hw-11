export default function getRefs() {
  return {
    searchBar: document.querySelector('.search-toolbar'),
    formEl: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-form-input'),
    searchBtn: document.querySelector('.search-form-button'),
    galleryEl: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
    sentinel: document.querySelector('#sentinel'),
    sentinelText: document.querySelector('.sentinel__text'),
  };
}
