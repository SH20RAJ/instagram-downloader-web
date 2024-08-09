import React, { useState, useEffect } from 'react';

const InstagramReelFetcher = () => {
  const [reelUrl, setReelUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState('');

  const fetchReelDetails = async (url) => {
    try {
      const response = await fetch(`https://nextbot.shade.cool/api/insta?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (data.data && data.data.post_video_url) {
        setVideoData(data.data);
        setError('');
      } else {
        setError('Failed to fetch the reel details.');
      }
    } catch (err) {
      setError('An error occurred while fetching the reel details.');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setReelUrl(text);
    } catch (err) {
      setError('Failed to paste the URL.');
    }
  };

  useEffect(() => {
    if (reelUrl) {
      fetchReelDetails(reelUrl);
    }
  }, [reelUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Instagram Reel Fetcher</h1>
      <div className="w-full max-w-md">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter Instagram Reel URL"
            value={reelUrl}
            onChange={(e) => setReelUrl(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handlePaste}
            className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Paste
          </button>
        </div>
      </div>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {videoData && (
        <div className="mt-8 w-full max-w-md">
          <img
            src={videoData.post_video_thumbnail}
            alt="Thumbnail"
            className="w-full rounded mb-4"
          />
          <video
            controls
            src={videoData.post_video_url}
            className="w-full rounded"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default InstagramReelFetcher;
