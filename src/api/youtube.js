// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=bts&key={{key}}
//https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key={{key}}

export default class Youtube {
  constructor(client) {
    this.client = client;
  }

  search(keyword) {
    return keyword ? this.#searchVideos(keyword) : this.#mostPopular();
  }

  #searchVideos(keyword) {
    return this.client
      .search({
        params: {
          part: 'snippet',
          maxResults: '25',
          q: keyword,
        },
      })
      .then(({ data }) =>
        data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  //part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key={{key}}

  #mostPopular() {
    return this.client
      .mostPopular({
        params: {
          part: 'snippet',
          chart: 'mostpopular',
          maxResults: 25,
        },
      })
      .then(({ data }) => data.items);
  }
}
