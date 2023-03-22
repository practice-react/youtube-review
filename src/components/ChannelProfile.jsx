import React from 'react';
import { useYoutubeContext } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function ChannelProfile({ channelId, title }) {
  const { youtube } = useYoutubeContext();
  const { data: imgURL, isLoading } = useQuery(['channels', channelId], () => {
    return youtube.channelsImgURL(channelId);
  });

  if (isLoading) return <div>{title}</div>;

  return (
    <div className='flex items-center gap-3 my-2'>
      {imgURL && (
        <img src={imgURL} alt={title} className='w-10 h-10 rounded-full' />
      )}
      <p className='text-lg opacity-70'>{title}</p>
    </div>
  );
}
