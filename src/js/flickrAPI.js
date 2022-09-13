const flickr = {
  key: '3352b173d96c26bb29a0f24c4ce50065',
  url: 'https://www.flickr.com/',
  getRequestUrl(tags) {
      return `${this.url}/services/rest/?method=flickr.photos.search&api_key=${this.key}&tags=${tags}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`;
  },
};

const time = new Date();
time.getHours;
let tags = '';
if (time[0] <= 5) {
  tags = 'night, stars, moon, summer';
} else if (time[0] > 5 && time[0] <= 11) {
  tags = 'morning, sun, alarm';
} else if (time[0] > 11 && time[0] <= 18) {
  tags = 'day, mountains';
} else {
  tags = 'evening, sunset';
};
const images = [];
fetch(flickr.getRequestUrl(tags))
  .then(response => {
      if (response.ok && response.status === 200) {
          return response.json();
      } else {
          return document.body.style.background = 'pink';
      };
  })
  .then(data => {
      const { photo : pictures } = data.photos;
      const filteredPhoto = pictures.filter(item => item.url_h).filter(item => item.url_h != '');
      localStorage.setItem('images', JSON.stringify(filteredPhoto));
  });