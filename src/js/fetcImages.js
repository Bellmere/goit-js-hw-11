import axios from 'axios';

export const fetchImages = async (inputValue, pageNr) => {
  const options = {
    headers: {
      key: '31733300-b569f31f89a42522564474d93',
    },
  };
  const url = `https://pixabay.com/api/?key=${options.headers.key}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNr}`;

  return await axios
    .get(url)
    .then(async r => {
      console.log(pageNr);
      console.log(r);
      return await r;
    })
    .catch(error => {
      if (error.r) {
        console.log(error.r.data);
        console.log(error.r.status);
        console.log(error.r.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
    });
};
