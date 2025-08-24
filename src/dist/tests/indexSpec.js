/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import { resizeImage } from '../../utilities/imageProcessor.js';

describe('Image processing', () => {
  const testFile = path.resolve('./assets/full/fjord.jpg');
  const outputFile = path.resolve('./assets/thumb/fjord-200x200.jpg');

  it('should process image without throwing error', async () => {
    await expectAsync(
      resizeImage('fjord', 200, 200)
    ).not.toThrow();
  });

  it('should create output file', async () => {
    await resizeImage('fjord', 200, 200);
    const exists = fs.existsSync(outputFile);
    expect(exists).toBeTrue();
  });

  it('should throw error for invalid file', async () => {
    await expectAsync(
      resizeImage('invalidFile', 200, 200)
    ).toBeRejected();
  });

  it('should throw error for invalid width/height', async () => {
    await expectAsync(
      resizeImage('fjord', -100, 200)
    ).toBeRejected();
  });
});
