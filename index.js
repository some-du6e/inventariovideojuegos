// ▀█▀ ▒█▀▄▀█ ▒█▀▀█ ▒█▀▀▀█ ▒█▀▀█ ▀▀█▀▀ ░█▀▀█ ▒█▄░▒█ ▀▀█▀▀ 　 ▒█▀▀█ ░█▀▀█ ▒█▀▀█ ▒█░▄▀ ░█▀▀█ ▒█▀▀█ ▒█▀▀▀ 
// ▒█░ ▒█▒█▒█ ▒█▄▄█ ▒█░░▒█ ▒█▄▄▀ ░▒█░░ ▒█▄▄█ ▒█▒█▒█ ░▒█░░ 　 ▒█▄▄█ ▒█▄▄█ ▒█░░░ ▒█▀▄░ ▒█▄▄█ ▒█░▄▄ ▒█▀▀▀ 
// ▄█▄ ▒█░░▒█ ▒█░░░ ▒█▄▄▄█ ▒█░▒█ ░▒█░░ ▒█░▒█ ▒█░░▀█ ░▒█░░ 　 ▒█░░░ ▒█░▒█ ▒█▄▄█ ▒█░▒█ ▒█░▒█ ▒█▄▄█ ▒█▄▄▄
import lebronjames from "lebronjamesiscute"
/////////////////////////
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getall, addgame } from './src/manager.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the src/www directory
app.use(express.static(path.join(__dirname, 'src/www')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/www/index.html'));
});

app.get('/api/sell', (req, res) => {
  const query = req.query;
  console.log(query);
  res.send(query);
});

app.get('/api/add', (req, res) => {
  const query = req.query;
  const overwrite = query.overwrite === 'true';
  
  try {
    const result = addgame(query.igdbslug, query.stock, overwrite);
    
    // If game exists and not forcing overwrite, return 409 Conflict
    if (result.exists && !overwrite) {
      return res.status(409).send(result);
    }
    
    res.send(result);
    console.log(result);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.get('/api/getall', (req, res) => {
  res.send(getall());
});

app.get('/api/getgameinfo', async (req, res) => {
  const query = req.query;
  const gameid = query.id;
  await fetch("https://www.igdb.com/gql", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "content-type": "application/json",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Priority": "u=4"
    },
    "referrer": `https://www.igdb.com/games/${gameid}`,
    "body": `{\"operationName\":\"GetGamePageData\",\"variables\":{\"gameSlug\":\"${gameid}\"},\"query\":\"query GetGamePageData($gameSlug: String!) {\\n  game(input: {slug: $gameSlug}) {\\n    id\\n    slug\\n    name\\n    summary\\n    storyline\\n    backgroundImage\\n    disabled\\n    category\\n    categoryName\\n    editionsCount\\n    game {\\n      id\\n      slug\\n      name\\n      __typename\\n    }\\n    developers {\\n      id\\n      slug\\n      name\\n      __typename\\n    }\\n    coverSrc(imageType: \\\"cover_big\\\")\\n    genres {\\n      id\\n      name\\n      slug\\n      __typename\\n    }\\n    rating {\\n      userRating\\n      userRatingsCount\\n      criticRating\\n      criticRatingsCount\\n      __typename\\n    }\\n    isReleased\\n    platforms {\\n      id\\n      name\\n      shortcut\\n      slug\\n      __typename\\n    }\\n    wantPlayingPlayedCounts {\\n      Want\\n      Playing\\n      Played\\n      __typename\\n    }\\n    videos {\\n      id\\n      createdAt\\n      name\\n      videoId\\n      __typename\\n    }\\n    reviewsCount\\n    reviews {\\n      slug\\n      game {\\n        id\\n        __typename\\n      }\\n      user {\\n        id\\n        __typename\\n      }\\n      __typename\\n    }\\n    listEntryCounts\\n    versionParent {\\n      id\\n      name\\n      slug\\n      __typename\\n    }\\n    screenshots {\\n      id\\n      imageUrl\\n      __typename\\n    }\\n    displayReleaseDate {\\n      id\\n      releaseDate\\n      regionName\\n      category\\n      releaseDateStatus {\\n        id\\n        name\\n        __typename\\n      }\\n      __typename\\n    }\\n    formattedDisplayReleaseDate\\n    displayStatus\\n    hasPendingChange\\n    pendingLocalizedChanges {\\n      id\\n      originalId\\n      region\\n      __typename\\n    }\\n    __typename\\n  }\\n  quickListData(input: {slug: $gameSlug}) {\\n    quickListTypes {\\n      id\\n      name\\n      iconName\\n      __typename\\n    }\\n    statuses {\\n      id\\n      name\\n      iconName\\n      quickListTypeId\\n      __typename\\n    }\\n    selectedListEntry {\\n      id\\n      platforms {\\n        id\\n        __typename\\n      }\\n      listEntryStatusId\\n      list {\\n        name\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\"}`,
    "method": "POST",
    "mode": "cors"
}).then(response => response.json()).then(data => {
    console.log(data);
    res.send(data);
})

});
app.get('/api/getigdbidfromurl', async (req, res) => {
  const query = req.query;
  if (!query.url.startsWith('https://igdb.com')) {
    console.log('whatdaflip');
    res.send({ error: 'what the hell is that link bruh 😭' });
    return;
  }
  var gameid = query.url.split('/')[4];
  const response = await fetch('https://www.igdb.com/gql', {
    credentials: 'include',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0',
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'content-type': 'application/json',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors', // cors does not work bruhh
      'Sec-Fetch-Site': 'same-origin',
      Priority: 'u=4',
    },
    referrer: `https://www.igdb.com/games/${gameid}`,
    body: `{"operationName":"GetGamePageAboutRelatedData","variables":{"gameSlug":"${gameid}"},"query":"query GetGamePageAboutRelatedData($gameSlug: String!) {\\n  game(input: {slug: $gameSlug}) {\\n    id\\n    featuredEvents {\\n      id\\n      name\\n      slug\\n      startTime\\n      startZone\\n      eventLogo {\\n        cloudinaryId\\n        eventLogoImageId\\n        __typename\\n      }\\n      __typename\\n    }\\n    gamesBundled {\\n      id\\n      name\\n      slug\\n      coverSrc(imageType: \\"cover_big\\")\\n      displayReleaseDate {\\n        id\\n        releaseDate\\n        __typename\\n      }\\n      rating {\\n        userRating\\n        __typename\\n      }\\n      genres {\\n        id\\n        name\\n        __typename\\n      }\\n      __typename\\n    }\\n    episodes {\\n      id\\n      name\\n      slug\\n      coverSrc(imageType: \\"cover_big\\")\\n      displayReleaseDate {\\n        id\\n        releaseDate\\n        __typename\\n      }\\n      rating {\\n        userRating\\n        __typename\\n      }\\n      genres {\\n        id\\n        name\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  similarGames(input: {slug: $gameSlug}) {\\n    coverSrc(imageType: \\"cover_big\\")\\n    genres {\\n      id\\n      name\\n      slug\\n      __typename\\n    }\\n    rating {\\n      userRating\\n      __typename\\n    }\\n    slug\\n    title\\n    __typename\\n  }\\n}"}`,
    method: 'POST',
    mode: 'cors',
  });
  const data = await response.json();
  var luhgameid = data.data.game.id;
  console.log(data.data.game.id);

  // res.send({id:data.data.game.id});
  res.send(data)
});
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
})
