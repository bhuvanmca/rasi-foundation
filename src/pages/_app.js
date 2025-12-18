import '@/styles/globals.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-spin"></div>
          <div className="w-16 h-16 border-4 border-transparent border-t-red-600 rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading && <LoadingScreen />}
      <Component {...pageProps} />
    </>
  );
}
