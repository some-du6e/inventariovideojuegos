import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function jsonToDictionary(filepath) {
  try {
    // Use path.join to create proper path from src directory to data.json in root
    const absolutePath = path.join(__dirname, '..', 'data.json');
    const data = fs.readFileSync(absolutePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data file:', err);
    // Return default structure to prevent null reference errors
    return { games: {} };
  }
}
function getall() {
  const data = jsonToDictionary();
  return data.games;
}
function addgame(igdbslug, stock) {
  const data = jsonToDictionary();
  data.games[igdbslug] = stock;
  const absolutePath = path.join(__dirname, '..', 'data.json');
  fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2));
}
export {getall, addgame};