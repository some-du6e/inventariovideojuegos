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
function addgame(igdbslug, stock, overwrite = false) {
  // Validate inputs
  if (!igdbslug) {
    return { error: 'Missing game ID' };
  }

  const data = jsonToDictionary();

  // Check if game already exists
  if (data.games[igdbslug] && data.games[igdbslug].length > 0) {
    // If not forcing overwrite, return info about existing game
    if (!overwrite) {
      return {
        exists: true,
        game: igdbslug,
        currentEntries: data.games[igdbslug],
        message:
          'Game already exists in inventory. Set overwrite=true to add anyway.',
      };
    }
  }

  // Initialize array if needed
  if (!data.games[igdbslug]) {
    data.games[igdbslug] = [];
  }

  // Add new entry
  data.games[igdbslug].push({
    igdb_slug: igdbslug,
    in_stock: stock,
  });

  const absolutePath = path.join(__dirname, '..', 'data.json');
  fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2));

  // Return success response
  return {
    success: true,
    game: igdbslug,
    stock: stock,
    overwritten: overwrite && data.games[igdbslug].length > 1,
  };
}
function wipegames() {
  const absolutePath = path.join(__dirname, '..', 'data.json');
  fs.writeFileSync(absolutePath, JSON.stringify({ games: {} }, null, 2));
}
export { getall, addgame, wipegames };
