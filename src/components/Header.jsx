import React from 'react';
import { BsYoutube } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import SearchVideos from './SearchVideos';

export default function Header() {
  return (
    <header className='flex items-center w-full gap-8 px-8 py-4 bg-black'>
      <Link to='/'>
        <div className='flex w-full items-center gap-3 text-3xl basis-2/6'>
          <BsYoutube className='text-youtube' />
          <h1 className='text-white'>YOUTUBE</h1>
        </div>
      </Link>
      <SearchVideos />
    </header>
  );
}
