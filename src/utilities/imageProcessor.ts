import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const fullDir = path.join(path.resolve(), 'images');
const thumbDir = path.join(path.resolve(), 'images/thumb');

export const resizeImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string> => {
  const inputPath = path.join(fullDir, `${filename}.jpg`);
  const outputPath = path.join(thumbDir, `${filename}_${width}x${height}.jpg`);

  if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir, { recursive: true });
  }

  if (fs.existsSync(outputPath)) {
    return outputPath;
  }

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input image not found: ${inputPath}`);
  }

  await sharp(inputPath).resize(width, height).toFile(outputPath);
  return outputPath;
};
