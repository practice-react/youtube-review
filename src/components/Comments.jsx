import React from 'react';
import { useYoutubeContext } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import formatAgo from '../util/date';
import { v4 as uuidv4 } from 'uuid';
import { BiLike, BiDislike } from 'react-icons/bi';

export default function Comments({ id }) {
  const { youtube } = useYoutubeContext();
  const { data: comments, isLoading } = useQuery(['comments', id], () => {
    return youtube.comments(id);
  });

  if (isLoading) return <div>...Loading</div>;

  console.log(comments);
  return (
    <ul className='border-solid border-t border-t-stone-400 m-2 p-2 '>
      {comments.map(
        ({
          publishedAt,
          textDisplay,
          authorDisplayName,
          authorProfileImageUrl,
        }) => (
          <li key={uuidv4()} className='mb-4 w-full'>
            <div className='flex w-full gap-3 items-center'>
              <img
                src={authorProfileImageUrl}
                className='rounded-full h-full'
              />
              <div>
                <div className='flex items-center gap-2'>
                  <h3 className='font-bold'>{authorDisplayName}</h3>
                  <time className='text-sm opacity-50'>
                    {formatAgo(publishedAt, 'ko')}
                  </time>
                </div>
                <p>{textDisplay}</p>
                <div className='flex gap-3 text-xl p-2'>
                  <BiLike />
                  <BiDislike />
                </div>
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
