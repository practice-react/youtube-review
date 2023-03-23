import React, { useDeferredValue, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useYoutubeContext } from '../context/YoutubeApiContext';
import Observer from '../common/Observer';

export default function Videos() {
  const { youtube } = useYoutubeContext();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');
  const [nextPageToken, setNextPageToken] = useState('');
  const deferredToken = useDeferredValue(nextPageToken);
  const [videos, setVideos] = useState([]);
  const { data } = useQuery(
    ['videos', search, deferredToken],
    async () => youtube.search(deferredToken, search),
    {
      staleTime: 1000 * 60 * 5,
      suspense: true,
    }
  );

  useEffect(() => {
    setVideos((videos) => videos.concat(data.videos));
  }, [data.videos]);

  return (
    <main>
      <ul className='grid gap-3 mt-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {videos.length !== 0 &&
          videos.map((videoData) => (
            <VideoCard
              key={uuidv4()} // 왜 똑같은 놈 취급하지?
              video={videoData.snippet}
              id={videoData.id}
            />
          ))}
      </ul>
      <Observer nextPage={setNextPageToken} token={data.nextPageToken} />
    </main>
  );
}
