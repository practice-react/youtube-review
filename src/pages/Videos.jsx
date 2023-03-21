import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import Youtube from '../api/youtube';

const youtube = new Youtube();

export default function Videos() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');
  const { data: videos, isLoading } = useQuery(
    ['videos', search],
    () => youtube.search('hi'),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  if (isLoading) return <div>...Loading</div>;

  return (
    <main>
      <ul className='grid gap-2 mt-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {videos.map((videoData) => (
          <VideoCard key={videoData.id} video={videoData.snippet} />
        ))}
      </ul>
    </main>
  );
}
