const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const fs = require('fs');

router.post('/', async (req, res) => {
  const { text } = req.body;

  // Validate text input
  if (!text) {
    return res.status(400).json({ message: 'Please provide text input' });
  }

  // Generate image from text using Sharp
  const image = await sharp({
      create: {
        width: 500,
        height: 500,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite([
      {
        input: Buffer.from(text),
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  // Save image to file (optional)
  fs.writeFile('output.png', image, (err) => {
    if (err) throw err;
    console.log('Image saved');
  });

  // Send image as response
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image);
});

module.exports = router;
