export const fetchImages = name => {
  const options = {
    headers: {
      key: '31733300-b569f31f89a42522564474d93',
    },
  };
  const url = `https://pixabay.com/api/everithing?q=${name}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url, options)
  .then(r => {
    if (!r.ok) {
        if (r.status === 404) {
            return [];
        }
        throw new Error(r.status);
    }
    return r.json();
  })
  .catch(error => {
    console.error(error);
  });
};
