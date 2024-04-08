import React, { useEffect, useState } from 'react';
import { useApiBanner } from '../contexts/apiBannerContext';

const ApiBanner: React.FC = () => {
  const { apiBanner, setApiBanner } = useApiBanner();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (apiBanner?.message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setApiBanner(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [apiBanner, setApiBanner]);

  const bgColor = apiBanner?.type === 'success' ? 'bg-green-600' : 'bg-red-500';

  return (
    <>
      {isVisible && (
        <div className="flex justify-center items-center w-full z-50">
          <div
            className={`fixed bottom-0 p-4 text-white w-1/5 text-center text-xl ${bgColor}`}
            style={{
              animation: 'pop-up 1s ease-in-out',
              borderRadius: '10px 10px 0 0',
            }}
          >
            <p>{apiBanner?.message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ApiBanner;
