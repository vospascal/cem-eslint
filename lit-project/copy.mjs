import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Define the source file path and destination directory
const sourceFilePath = path.join(__dirname, 'template', 'index.html');
const destinationDir = path.join(__dirname, 'dist');

// Extract the filename from the source file path
const filename = path.basename(sourceFilePath);

// Construct the destination file path
const destinationFilePath = path.join(destinationDir, filename);

// Copy the file
fs.copyFile(sourceFilePath, destinationFilePath, (error) => {
  if (error) {
    console.error('Error copying file:', error);
  } else {
    console.log('File copied successfully!');
  }
});
