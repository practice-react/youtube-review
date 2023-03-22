import axios from 'axios';

export default class FakeYoutube {
  search() {
    return axios.get('/videos/search.json');
  }

  mostPopular() {
    return axios.get('/videos/popular.json');
  }

  channels() {
    return axios.get('/videos/channel.json');
  }
}
