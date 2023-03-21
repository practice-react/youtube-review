import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchVideos() {
  const [searchParams] = useSearchParams();
  const [text, setText] = useState('');

  const search = searchParams.get('q');

  useEffect(() => setText(search || ''), [search]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // setSearchParams를 사용하려 했으나 실패했다.
    // 현재 위치한 경로에서 queryString을 추가하는 함수인데 내가 원하던것은 /videos/search?q= 처럼 search 경로로 이동후에 쿼리를 추가하는 것이었다. 그러나 setSearchParams 이전에 navigate를 사용해도 search가아닌 이전의 url에 쿼리를 갱신하는 문제가 발생했다.
    // stack flow에도 찾아봤으나 navigate를 사용하라는 말만 있을뿐 원하는 것을 찾지 못했다.
    navigate({ pathname: '/videos/search', search: `q=${text}` });
  };

  return (
    <form onSubmit={handleSubmit} className='basis-4/6 flex justify-center'>
      <input
        type='text'
        value={text}
        className='h-8 w-60 rounded-l-2xl p-2 pl-4 outline-none '
        placeholder='...Search'
        onChange={(e) => setText(e.target.value)}
      />
      <button className='p-2 h-8 w-12 bg-slate-600  rounded-r-2xl text-center'>
        <BsSearch className='text-center h-full w-full text-white' />
      </button>
    </form>
  );
}
