import { constants } from 'fs';
import { stat, copyFile, mkdir, readdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// +10 copy.js - implement function that copies folder 'files' with all its content into folder 'files_copy' at the same level (if files folder doesn't exists or files_copy has already been created Error with message 'FS operation failed' must be thrown)

export const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const targetFolder = 'files';
  const copyFolder = targetFolder + '_copy';
  const targetPath = join(__dirname, targetFolder);
  const copyPath = join(__dirname, copyFolder);

  let canCopy = false;

  // if files folder doesn't exists => Error
  await stat(targetPath)
    .then(() => {
      canCopy = true;
    })
    .catch((err) => {
      err.message = 'FS operation failed';
      console.error(err);
      canCopy = false;
    });

  // add copyPath folder
  if (canCopy) {
    await mkdir(copyPath).catch((err) => {
      err.message = 'FS operation failed';
      console.error(err);
      canCopy = false;
    });
  }

  // copy folders
  if (canCopy) {
    const targetFilesArray = await readdir(targetPath);
    targetFilesArray.forEach((targetFile) => {
      const targetFilePath = join(targetPath, targetFile);
      const copyFilePath = join(copyPath, targetFile);
      copyFile(targetFilePath, copyFilePath, constants.COPYFILE_EXCL);
    });
  }
};

copy();