import React from 'react';
import dateConversion from '../util/data';

export default function VideoCard({ video }) {
  const { thumbnails, title, description, channelTitle, publishedAt } = video;

  return (
    <div className=''>
      <img src={thumbnails.high.url} alt={title} className='min-w-full' />
      <div className='p-2'>
        <h2 className='line-clamp-2'>{title}</h2>
        <p className='mt-2 opacity-50 text-sm line-clamp-2'>{description}</p>
        <time className='text-xs '>{dateConversion(publishedAt)}</time>
      </div>
    </div>
  );
}
