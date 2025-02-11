import express from 'express'
import cors from 'cors'

// Initialize Express app
const app = express();

// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic home route for the API
app.get('/', (_req, res) => {
    res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication')
});

app.get('/get-spotify-preview', async function(_req, res) {
  const {trackId} = _req.query;
  try {
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;
    let previewUrl = "";

    const htmlPage = await fetch(embedUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.text());
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlPage, 'text/html');
    const script = doc.querySelector('script[type="application/ld+json"]');
    if (script) {
      console.log(JSON.parse(script.innerHTML));
      // previewUrl = script.src;
    }
    return previewUrl;

  } catch (error) {
    throw Error(error);
  }
});

const port = process.env.PORT || 3080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});