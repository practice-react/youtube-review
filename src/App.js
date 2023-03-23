import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { YoutubeApiProvider } from './context/YoutubeApiContext';
import { Suspense } from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Header />
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>...Loading</div>}>
            <Outlet />
          </Suspense>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </>
  );
}

export default App;
