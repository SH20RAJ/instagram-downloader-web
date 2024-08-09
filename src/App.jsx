import React, { useState, useEffect } from 'react';

const InstagramReelFetcher = () => {
  const [reelUrl, setReelUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState('');

  const fetchReelDetails = async () => {
    try {
      const response = await fetch(`https://nextbot.shade.cool/api/insta?url=${encodeURIComponent(reelUrl)}`);
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
      fetchReelDetails();
    }
  }, [reelUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 text-white">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-center">Instagram Reel Downloader</h1>
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Enter Instagram Reel URL"
            value={reelUrl}
            onChange={(e) => setReelUrl(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handlePaste}
            className="ml-2 bg-purple-500 text-white p-3 rounded hover:bg-purple-600 transition duration-200"
          >
            Paste
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <button
            onClick={fetchReelDetails}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200 mr-2"
          >
            Fetch Video
          </button>
          {videoData && (
            <a
              href={videoData.post_video_url}
              download
              className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition duration-200 ml-2 text-center"
            >
              Download
            </a>
          )}
        </div>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {videoData && (
          <div className="mt-8">
            <img
              src={videoData.post_video_thumbnail}
              alt="Thumbnail"
              className="w-full rounded-lg mb-4"
            />
            <video
              controls
              src={videoData.post_video_url}
              className="w-full rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
      <div className="mt-8 text-sm text-center text-gray-200">
        <p>
          Disclaimer: This tool is for educational purposes only. We are not affiliated with Instagram, and we do not support the unauthorized downloading or distribution of content. 
        </p>
        <p className="mt-2">
          <a href="#" className="underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default InstagramReelFetcher;
