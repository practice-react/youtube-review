import axios from 'axios';

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=bts&key={{key}}
// https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=[YOUR_API_KEY] HTTP/1.1

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

  channels(params) {
    return this.httpClient.get('channels', params);
  }
}
