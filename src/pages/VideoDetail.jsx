import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChannelProfile from '../components/ChannelProfile';
import formatAgo from '../util/date';

export default function VideoDetail() {
  const {
    state: { video, id },
  } = useLocation();
  const [isOpened, setIsOpened] = useState(false);

  const { title, description, channelId, channelTitle, publishedAt } = video;

  const hanleClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <section className='flex flex-col lg:flex-row'>
      <section className='basis-4/6'>
        <iframe
          width='100%'
          height='640'
          src={`https://www.youtube.com/embed/${id}`}
          title='YouTube video player'
          frameBorder='0'
          name={title}
          allow='accelerometer; autoplay; clipboard-write; 
    encrypted-media; gyroscope; picture-in-picture'
        ></iframe>
        <article className='p-4 mb-10'>
          <h2 className='text-2xl'>{title}</h2>
          <ChannelProfile channelId={channelId} title={channelTitle} />
          <div
            className={`relative bg-gray-100 px-4 rounded-lg ${
              !isOpened && 'line-clamp-3 hover:cursor-pointer hover:bg-gray-300'
            }`}
            onClick={!isOpened ? hanleClick : null}
          >
            <time className='font-bold text-sm'>
              {new Date(publishedAt).toLocaleString('ko', {
                dateStyle: 'long',
              })}
            </time>
            <p className='w-72'>{description}</p>
            {!isOpened ? (
              <button className='absolute left-60 top-12 font-bold'>
                더보기
              </button>
            ) : (
              <button className='my-4 ml-2 p-2 font-bold' onClick={hanleClick}>
                간략히
              </button>
            )}
          </div>
        </article>
      </section>
      <article className='basis-2/6'></article>
    </section>
  );
}
