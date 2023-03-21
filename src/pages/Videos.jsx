import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useYoutubeContext } from '../context/YoutubeApiContext';

export default function Videos() {
  const { youtube } = useYoutubeContext();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');
  const { data: videos, isLoading } = useQuery(
    ['videos', search],
    () => youtube.search(search),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  if (isLoading) return <div>...Loading</div>;
  console.log(videos);
  return (
    <main>
      <ul className='grid gap-2 mt-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {videos.map((videoData) => (
          <VideoCard key={uuidv4()} video={videoData.snippet} />
        ))}
      </ul>
    </main>
  );
}
