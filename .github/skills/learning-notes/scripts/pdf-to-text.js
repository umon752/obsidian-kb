import { readFile } from 'fs/promises';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node pdf-to-text.js <path-to-pdf>');
  process.exit(1);
}

const dataBuffer = await readFile(filePath);
const data = await pdfParse(dataBuffer);
process.stdout.write(data.text);
