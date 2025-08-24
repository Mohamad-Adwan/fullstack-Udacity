import express from 'express';
import { resizeImage } from '../utilities/imageProcessor.js';
import path from 'path';
import fs from 'fs';
const routes = express.Router();
routes.get('/images', async (req, res) => {
    const { filename, width, height } = req.query;
    if (!filename || !width || !height) {
        return res
            .status(400)
            .send('Error: filename, width, and height are required');
    }
    const parsedWidth = parseInt(width);
    const parsedHeight = parseInt(height);
    if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
        return res
            .status(400)
            .send('Error: width and height must be valid numbers');
    }
    if (parsedWidth <= 0 || parsedHeight <= 0) {
        return res
            .status(400)
            .send('Error: width and height must be greater than 0');
    }
    const inputPath = path.resolve('./assets/full', `${filename}.jpg`);
    if (!fs.existsSync(inputPath)) {
        return res.status(400).send('Error: invalid filename, file not found');
    }
    console.log(`Processing image: ${filename}, width: ${parsedWidth}, height: ${parsedHeight}`);
    try {
        const outputPath = await resizeImage(filename, parsedWidth, parsedHeight);
        res.sendFile(outputPath);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error processing image:', error.message);
            res.status(500).send(`Error processing image: ${error.message}`);
        }
        else {
            console.error('Unknown error:', error);
            res.status(500).send('Error processing image');
        }
    }
});
export default routes;
