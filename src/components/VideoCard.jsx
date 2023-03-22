import React from 'react';
import formatAgo from '../util/date';
import { useNavigate } from 'react-router-dom';

export default function VideoCard({ video, id, direction }) {
  const { thumbnails, title, channelTitle, publishedAt } = video;
  const navigate = useNavigate();
  const isLow = direction === 'row';

  const handleClick = () => {
    navigate(`/videos/${id}`, {
      state: { video, id },
    });
  };

  return (
    <li
      className={`${isLow && 'flex m-2'} hover:cursor-pointer`}
      onClick={handleClick}
    >
      <img
        src={thumbnails.high.url}
        alt={title}
        className={isLow ? 'w-60 mr-2' : 'w-full'}
      />
      <div>
        <h2 className='line-clamp-2'>{title}</h2>
        <p className='mt-2 opacity-50 text-sm line-clamp-2'>{channelTitle}</p>
        <time className='text-xs '>{formatAgo(publishedAt, 'ko')}</time>
      </div>
    </li>
  );
}
