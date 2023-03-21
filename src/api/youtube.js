import axios from 'axios';

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=bts&key={{key}}

export default class Youtube {
  // constructor() {
  //   this.httpClient = axios.create({
  //     baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  //     params: { key: REACT_APP_YOUTUBE_KEY },
  //   });
  // }

  search(keyword) {
    return keyword ? this.#searchVideos(keyword) : this.#mostPopular();
  }

  #searchVideos(keyword) {
    return axios.get(`/videos/search.json`).then(({ data }) => {
      return data.items.map((item) => ({ ...item, id: item.id.videoId }));
    });
  }

  #mostPopular() {
    return axios.get('/videos/popular.json').then(({ data }) => data.items);
  }
}
