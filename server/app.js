const express = require('express');
const sharp = require('sharp');
const app = express();
const cors = require('cors');

// app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/generate-image', async (req, res) => {
  const text = req.body.text;
  const width = req.body.width || 400;
  const height = req.body.height || 400;
  const color = req.body.color || '#000000';

  const textOptions = {
    fontFamily: 'Arial',
    fontSize: 500,
    color: color,
    gravity: 'center',
  };

  const image = sharp({
    create: {
      width: 1600,
      height: 1200,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });

  const textOverlay = await sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
   .composite([
      {
        input: Buffer.from(
          `<svg><text x="50%" y="100%" text-anchor="middle">${text}</text></svg>`
        ),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();

  // const result = await image.resize(width, height).composite([{ input: textOverlay }]).png().toBuffer();
  const result = await image
  .resize(width, height)
  .composite([{ input: textOverlay }])
  .resize(width, height)
  .png()
  .toBuffer();


  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': result.length,
   
  });

  res.end(result);
});


app.listen(5000, () => {
  console.log('Server started on port 5000');
});
