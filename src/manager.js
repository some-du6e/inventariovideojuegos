import fs from "fs";

// Function to read JSON file and convert it to a dictionary
function jsonToDictionary(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dictionary = JSON.parse(data);
        return dictionary;
    } catch (err) {
        console.error('Error reading or parsing JSON file:', err);
        return null;
    }
}



function getall() {
    // Example usage
    const dictionary = jsonToDictionary('data.json');
    console.log(dictionary["games"]);
}

export { getall };