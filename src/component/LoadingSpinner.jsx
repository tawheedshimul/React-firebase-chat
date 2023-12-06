import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center mt-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid shadow-lg"></div>
      <p className="ml-2 text-gray-600">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;

