import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Utility to convert images to WebP
export const convertImagesToWebp = async (files) => {
  const convertedFiles = {};

  for (const field in files) {
    convertedFiles[field] = [];

    for (const file of files[field]) {
      if (!file?.path) {
        console.warn(`Skipping invalid file object:`, file);
        continue;
      }

      const originalPath = file.path;
      const ext = path.extname(file.originalname).toLowerCase();

      // Only convert image files
      if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
        console.warn(`Skipping non-image file: ${file.originalname}`);
        convertedFiles[field].push(file); // keep original
        continue;
      }

      const newFilename = `${path.parse(file.filename).name}.webp`;
      const newPath = path.join(path.dirname(file.path), newFilename);

      try {
        await sharp(originalPath)
          .webp({ quality: 50 }) // quality must be number
          .toFile(newPath);

        // Remove original file
        fs.unlinkSync(originalPath);

        convertedFiles[field].push({
          ...file,
          filename: newFilename,
          path: newPath,
        });
      } catch (err) {
        console.error(`Error converting ${file.originalname}:`, err);
        convertedFiles[field].push(file); // keep original on error
      }
    }
  }

  return convertedFiles;
};