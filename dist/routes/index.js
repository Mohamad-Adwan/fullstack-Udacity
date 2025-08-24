import express from 'express';
import { resizeImage } from '../utilities/imageProcessor.js';
const routes = express.Router();
// Example endpoint: /api/images?filename=fjord&width=200&height=200
routes.get('/images', async (req, res) => {
    const { filename, width, height } = req.query;
    if (!filename || !width || !height) {
        return res.status(400).send('Missing parameters: filename, width, height required');
    }
    console.log(`Processing image: ${filename}, width: ${width}, height: ${height}`);
    try {
        const outputPath = await resizeImage(filename, parseInt(width), parseInt(height));
        res.sendFile(outputPath);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error processing image:', filename);
            res.status(500).send(`Error processing image: ${error.message}`);
        }
        else {
            console.error('Unknown error:', error);
            res.status(500).send('Error processing image');
        }
    }
});
export default routes;
//# sourceMappingURL=index.js.map