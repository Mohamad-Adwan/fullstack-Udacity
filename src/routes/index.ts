import express from 'express';
import path from 'path';
import fs from 'fs';
import { resizeImage } from '../utilities/imageProcessor.js';

const routes = express.Router();

routes.get('/images', async (req, res) => {
  const { filename, width, height } = req.query;

  if (!filename) return res.status(400).send('Error: filename is required');
  if (!width) return res.status(400).send('Error: width is required');
  if (!height) return res.status(400).send('Error: height is required');

  if (!/^\d+$/.test(width as string) || !/^\d+$/.test(height as string)) {
    return res.status(400).send('Error: width and height must be valid positive integers');
  }

  const w = Number(width);
  const h = Number(height);

  if (w <= 0 || h <= 0) {
    return res.status(400).send('Error: width and height must be greater than 0');
  }
  const inputPath = path.resolve('./images', `${filename}.jpg`);

  if (!fs.existsSync(inputPath)) {
    return res.status(400).send('Error: invalid filename, file not found');
  }

  try {
    const outputPath = await resizeImage(filename as string, w, h);
    res.sendFile(outputPath);
  } catch (error) {
    console.error('Error processing image:', error instanceof Error ? error.message : error);
    res.status(500).send(`Error processing image: ${error instanceof Error ? error.message : ''}`);
  }
});

export default routes;
