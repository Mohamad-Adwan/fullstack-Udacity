import express from 'express';
import { resizeImage } from '../utilities/imageProcessor.js';
import path from 'path';
import fs from 'fs';

const routes = express.Router();

// Example endpoint: /api/images?filename=fjord&width=200&height=200
routes.get('/images', async (req, res) => {
  const { filename, width, height } = req.query;

  if (!filename || !width || !height) {
    return res.status(400).send('Error: filename, width, and height are required');
  }

  if (!/^\d+$/.test(width) || !/^\d+$/.test(height)) {
    return res.status(400).send('Error: width and height must be valid positive integers');
  }

  const w = Number(width);
  const h = Number(height);

  if (w <= 0 || h <= 0) {
    return res.status(400).send('Error: width and height must be greater than 0');
  }

  const inputPath = path.resolve('./images', `${filename}.jpg`);
  if (!fs.existsSync(inputPath)) {
    return res.status(400).send('Error: invalid filename, file not found'+inputPath);
  }

  console.log(`Processing image: ${filename}, width: ${w}, height: ${h}`);

  try {
    const outputPath = await resizeImage(filename, w, h);
    res.sendFile(outputPath);
  } catch (error) {
    console.error('Error processing image:', error instanceof Error ? error.message : error);
    res.status(500).send(`Error processing image: ${error instanceof Error ? error.message : ''}`);
  }
});

export default routes;
