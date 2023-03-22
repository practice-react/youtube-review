// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=bts&key={{key}}
//https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key={{key}}
//https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key={{key}}

export default class Youtube {
  constructor(client) {
    this.client = client;
  }

  search(keyword) {
    return keyword ? this.#searchVideos(keyword) : this.#mostPopular();
  }

  channelsImgURL(id) {
    return this.client
      .channels({
        params: {
          part: 'snippet',
          id,
        },
      })
      .then((res) => res.data.items[0].snippet.thumbnails.high.url);
  }

  //https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key={{key}}

  relatedVideos(id) {
    return this.client
      .reletedVideos(id, {
        params: {
          part: 'snippet',
          relatedToVideoId: id,
          type: 'video',
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
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
