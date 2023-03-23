import React, { useEffect, useRef } from 'react';
// 만약 Observer에서 useQuery 생성했다면 어떻게 됐을까?
// 일단 props로 받아야 할것은 nextPageToken과 id, type,setComments이다.
// useQuery(['comments',id,nextPageToken],()=>{ return youtube[type](id,nextPageToken)})
// 받아온 데이터를 이용해 state를 변경하겠지.
// 뭐가 더 좋을까?

export default function Observer({ nextPage, token }) {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          nextPage(token);
        }
      });
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect(observerRef.current);
  }, [token]);

  return (
    <div ref={observerRef}>
      <div className='w-20 h-20 rounded-full flex justify-center items-center	bg-gradient-to-r from-cyan-500 to-blue-500 animate-spin'>
        <div className='bg-white w-10 h-10 rounded-full'></div>
      </div>
    </div>
  );
}
