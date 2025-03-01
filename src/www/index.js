function main() {
  console.log('Hello World!');
  // get the games from the server
  fetch('/api/getall')
    .then(response => response.json())
    .then(data => {
      const list = document.querySelector('md-list');
      // Clear existing content
      list.innerHTML = '';

      // For each game in data
      Object.entries(data).forEach(([slug, entries]) => {
        // For each copy of the game
        entries.forEach(entry => {
          // Create list item for game
          const listItem = document.createElement('md-list-item');
          listItem.setAttribute('type', 'link');
          listItem.setAttribute('href', `https://www.igdb.com/games/${slug}`);
          listItem.setAttribute('target', '_blank');

          // Add headline (game name)
          const headline = document.createElement('div');
          headline.slot = 'headline';
          headline.textContent = slug
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase()); // Format the name
          listItem.appendChild(headline);

          // Add supporting text (stock info)
          const supportingText = document.createElement('div');
          supportingText.slot = 'supporting-text';
          supportingText.textContent = `En inventario: ${entry.in_stock}`;
          listItem.appendChild(supportingText);

          // Add placeholder image
          const img = document.createElement('img');
          img.slot = 'start';
          img.style.width = '56px';
          img.style.height = '56px';
          img.src = 'https://placehold.co/56x56/gray/white?text=...';
          listItem.appendChild(img);

          // Add icon
          const icon = document.createElement('i');
          icon.className = 'mdi mdi-eye-arrow-right';
          icon.slot = 'end';
          listItem.appendChild(icon);

          // Add to list
          list.appendChild(listItem);

          // Fetch game cover
          fetch(`/api/getgameinfo?id=${slug}`)
            .then(res => res.json())
            .then(gameInfo => {
              if (
                gameInfo.data &&
                gameInfo.data.game &&
                gameInfo.data.game.coverSrc
              ) {
                img.src = gameInfo.data.game.coverSrc;
              }
              // Update the headline with actual game name
              if (
                gameInfo.data &&
                gameInfo.data.game &&
                gameInfo.data.game.name
              ) {
                headline.textContent = gameInfo.data.game.name;
              }
            })
            .catch(err => {
              console.error(`Failed to load cover for ${slug}:`, err);
            });
        });
      });
    });
  // get rid of loader
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
  let konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];
  let konamiIndex = 0;

  document.addEventListener('keydown', function (e) {
    // Get the key pressed
    const key = e.key.toLowerCase();

    // Check if it's the expected key in the sequence
    const expectedKey = konamiCode[konamiIndex].toLowerCase();

    if (key === expectedKey) {
      // Move to next key in sequence
      konamiIndex++;

      // If completed the sequence
      if (konamiIndex === konamiCode.length) {
        triggerEasterEgg();
        konamiIndex = 0; // Reset
      }
    } else {
      konamiIndex = 0; // Reset if wrong key
    }
  });
}
function triggerEasterEgg() {
  // Create flashbang div
  const flashbang = document.createElement('div');
  flashbang.style.position = 'fixed';
  flashbang.style.top = '0';
  flashbang.style.left = '0';
  flashbang.style.width = '100%';
  flashbang.style.height = '100%';
  flashbang.style.backgroundColor = 'white';
  flashbang.style.opacity = '0';
  flashbang.style.zIndex = '9999';
  flashbang.style.transition = 'opacity 0.1s';
  document.body.appendChild(flashbang);

  // Show the white screen
  setTimeout(() => {
    flashbang.style.opacity = '1';

    // Play flashbang sound effect
    const flashbangSound = new Audio('assets/flashbang.mp3');
    flashbangSound.volume = 0.8;

    // Wait for flashbang sound to finish before showing LeBron
    flashbangSound.onended = () => {
      // Fade the white a bit
      flashbang.style.opacity = '0.7';

      // Add LeBron image
      const lebron = document.createElement('div');
      lebron.style.position = 'fixed';
      lebron.style.top = '50%';
      lebron.style.left = '50%';
      lebron.style.transform = 'translate(-50%, -50%)';
      lebron.style.zIndex = '10000';
      lebron.innerHTML = `
        <img src="/assets/sunshine.png" 
         style="max-width: 80vw; max-height: 80vh; border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,0.8);">
      `;
      document.body.appendChild(lebron);

      // Play sunshine music
      const sunshineMusic = new Audio('assets/sunshine.mp3');
      sunshineMusic.volume = 0.7;
      sunshineMusic.playbackRate = 1.5;
      sunshineMusic.play();

      // Remove after 5 seconds
      setTimeout(() => {
        lebron.style.transition = 'transform 1s, opacity 1s';
        lebron.style.transform = 'translate(-50%, -50%) scale(0.1)';
        lebron.style.opacity = '0';
        flashbang.style.transition = 'opacity 1s';
        flashbang.style.opacity = '0';

        setTimeout(() => {
          document.body.removeChild(lebron);
          document.body.removeChild(flashbang);
          sunshineMusic.pause();
        }, 1000);
      }, 10000);
    };

    // Start playing the flashbang sound
    flashbangSound.play();
  }, 100);
}
function titlestuff() {
  const titles = [
    'Xxx_Inventario_xxx',
    'xXx_Inventario_xxx',
    'xxX_Inventario_xxx',
    'xxx_Inventario_Xxx',
    'xxx_Inventario_xXx',
    'xxx_Inventario_xxX',
  ];
  let index = 0;
  const stupidahhtitle = document.getElementById('sigmaboytitle');
  setInterval(() => {
    document.title = titles[index];
    stupidahhtitle.innerText = titles[index];
    index = (index + 1) % titles.length;
  }, 500);
}

document.addEventListener('DOMContentLoaded', main);
document.addEventListener('DOMContentLoaded', titlestuff);
document.getElementById('add-button').addEventListener('click', function () {
  window.location.href = '/add/';
});
document.getElementById('options-button').addEventListener('click', function () {
  window.location.href = '/options/';
});