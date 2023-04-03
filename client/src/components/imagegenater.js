import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
  const [text, setText] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/generateImage', { text }, { responseType: 'arraybuffer' });
      const imageBlob = new Blob([response.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Text:
          <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
        </label>
        <button type="submit">Generated Image</button>
      </form>
      {imageSrc && <img src={imageSrc} alt="Generated Image" />}
    </div>
  );
};

export default ImageGenerator;
