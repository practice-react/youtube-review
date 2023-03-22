import React from 'react';
import formatAgo from '../util/date';
import { useNavigate } from 'react-router-dom';

export default function VideoCard({ video, id }) {
  const { thumbnails, title, description, publishedAt } = video;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/videos/${id}`, {
      state: { video, id },
    });
  };

  return (
    <div className='hover:cursor-pointer' onClick={handleClick}>
      <img src={thumbnails.high.url} alt={title} className='min-w-full ' />
      <div className='p-2'>
        <h2 className='line-clamp-2'>{title}</h2>
        <p className='mt-2 opacity-50 text-sm line-clamp-2'>{description}</p>
        <time className='text-xs '>{formatAgo(publishedAt, 'ko')}</time>
      </div>
    </div>
  );
}
