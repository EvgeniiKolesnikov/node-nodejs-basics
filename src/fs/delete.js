import { rm } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// +6 delete.js - implement function that deletes file 'fileToRemove.txt' (if there's no file fileToRemove.txt Error with message 'FS operation failed' must be thrown)

export const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const targetFolder = 'files';
  const targetFile = 'fileToRemove.txt';
  const targetPath = join(__dirname, targetFolder, targetFile);

  await rm(targetPath).catch((err) => {
    err.message = 'FS operation failed';
    console.error(err);
  });
};

remove();