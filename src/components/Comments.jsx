import React, { useDeferredValue, useEffect, useState } from 'react';
import { useYoutubeContext } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import formatAgo from '../util/date';
import { BiLike, BiDislike } from 'react-icons/bi';
import Observer from '../common/Observer';

export default function Comments({ id }) {
  const { youtube } = useYoutubeContext();
  const [nextPageToken, setNextPageToken] = useState('');

  // 트러블 슈팅: 옵져버에 의해 데이터를 재요청하면 susepense의 fallback이 호출되어 Comments가 히든으로감춰졌다가 요청완료시 다시 보여주는
  // 동작이 발생했다. 사용자 입장에서는 commensts가 사라졌다 다시 나오니 scroll에 이상이 발생한듯 보인다.
  // 초기렌더링 시에만 fallback을 호출해야한다.
  // 해결: useDeferredValue를 사용하여 suspense의 fallback 재사용을 방지했다. useQuery의 키값으로 deferred를 저장하면,
  // 재요청시 useDeferredValue 훅으로 인해 이전에 저장된 값을 사용하고 있다가. 모든 데이터 요청을 완료하면
  // 리렌더링을 통해 새로운 값을 보여주게 된다.
  const deferredNextPageToken = useDeferredValue(nextPageToken);
  const { data } = useQuery(
    ['comments', id, deferredNextPageToken],
    async () => {
      return youtube.comments(id, deferredNextPageToken);
    },
    { staleTime: 1000 * 60 * 10, suspense: true }
  );
  const [comments, setComments] = useState([]);
  const [isRerendering, serIsRerendering] = useState(false);

  useEffect(() => {
    setComments((comments) => comments.concat(data.comments));
  }, [data.comments]);

  return (
    <ul className='border-solid border-t border-t-stone-400 m-2 p-2'>
      <button onClick={() => serIsRerendering(!isRerendering)}>Cick</button>
      {comments &&
        comments.map(
          ({
            publishedAt,
            textDisplay,
            authorDisplayName,
            authorProfileImageUrl,
            id,
          }) => (
            <li key={id} className='mb-4 w-full'>
              <div className='flex w-full gap-3 items-center'>
                <img
                  src={authorProfileImageUrl}
                  className='rounded-full h-full'
                  alt='NO'
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
      <Observer nextComments={setNextPageToken} token={data.nextPageToken} />
    </ul>
  );
}
