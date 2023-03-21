import React, { createContext, useContext } from 'react';
import FakeYoutube from '../api/fakeYoutue';
import Youtube from '../api/youtube';
import YoutubeClient from '../api/youtubeClient';

const client = new FakeYoutube();
// const client = new YoutubeClient();
const youtube = new Youtube(client);

const YoutubeApiContext = createContext();

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeContext() {
  return useContext(YoutubeApiContext);
}
