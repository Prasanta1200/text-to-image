import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [text, setText] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/generate-image', { text }, { responseType: 'arraybuffer' });
      const imageSrc = URL.createObjectURL(new Blob([response.data]));
      setImageSrc(imageSrc);
      setError(null);
    } catch (error) {
      setImageSrc(null);
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <button type="submit">Generate Image</button>
      </form>
      {error && <p>Error: {error}</p>}
      {imageSrc && <img src={imageSrc} alt="Generated Image" />}
    </div>
  );
}

export default App;
