import axios from 'axios';

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=bts&key={{key}}

export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3/',
      params: { key: process.env.REACT_APP_YOUTUBE_KEY },
    });
  }

  search(params) {
    return this.httpClient.get('search', params);
  }

  mostPopular(params) {
    return this.httpClient.get('videos', params);
  }
}
