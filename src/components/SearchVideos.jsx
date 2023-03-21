import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

export default function SearchVideos() {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className='basis-4/6 flex justify-center'>
      <input
        type='text'
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
