import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
  const { type } = useParams(); // Extract the 'type' parameter from the URL
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [article, setArticle] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [score, setScore] = useState(0);
  const [verified, setVerified] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (type === 'video' && video) formData.append('video', video);
    if (type === 'image' && image) formData.append('image', image);
    if (type === 'text' && article) formData.append('article', article);

    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResponse(res.data);
      const postData = {
        videopath, // Or the actual path if available after uploading
        videoTitle,
        username: "rajeshtanguturi",
        description,
        score: Math.floor((response.probability - 50) * 2),
        verified: response.prediction == "Fake" ? false : true,
      };

      await axios.post('http://localhost:5000/creatorpost', postData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setResponse((prevResponse) => ({
        ...prevResponse,
        success: 'Data posted to MongoDB successfully!',
      }));
    } catch (error) {
      console.error('Error posting data:', error);
      setResponse({ error: 'Failed to submit data' });
    }



  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Submit Your {type.charAt(0).toUpperCase() + type.slice(1)}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'video' && (
            <div className="flex flex-col">
              <label className="text-lg">Title</label>
              <textarea
                value={article}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="p-2 border rounded"
                rows="1"
              />
              <label className="text-lg">Upload Video</label>
              <input type="file" onChange={(e) => {
                setVideo(e.target.files[0]);
                if (e.target.files[0]) {
                  setVideoTitle(e.target.files[0].name); // Set the filename as the video title
                }
              }} className="p-2 border rounded" />
              {video && video.name && (
                <p className="text-sm mt-2">Selected File: {video.name}</p> // Display the filename
              )}
            </div>
          )}

          {type === 'image' && (
            <div className="flex flex-col">

              <label className="text-lg">Upload Image</label>

              <input type="file" onChange={(e) => setImage(e.target.files[0])} className="p-2 border rounded" />
            </div>
          )}

          {type === 'text' && (
            <div className="flex flex-col">
              <label className="text-lg">Article</label>
              <textarea
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                className="p-2 border rounded"
                rows="6"
              />
            </div>
          )}

          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Submit</button>
        </form>

        {response && (
          <div className="mt-6">
            {response.error ? (
              <p className="text-red-600">{response.error}</p>
            ) : (
              <p className="text-green-600">Post submitted successfully!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
