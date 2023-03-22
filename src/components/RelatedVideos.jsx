import React from 'react';
import { useYoutubeContext } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';
import { v4 as uuidv4 } from 'uuid';

export default function RelatedVideos({ id }) {
  const { youtube } = useYoutubeContext();
  const { data: videos, isLoading } = useQuery(['releted', id], () => {
    return youtube.relatedVideos(id);
  });

  if (isLoading) return <div>...Loading</div>;
  console.log(videos);
  return (
    <ul>
      {videos.map(({ snippet, id }) => (
        <VideoCard key={uuidv4()} video={snippet} id={id} direction='row' />
      ))}
    </ul>
  );
}
