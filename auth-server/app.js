import express from 'express'
import cors from 'cors'
import { getSpotifyPreviewUrl } from './functions/spotify.js';

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

app.post('/get-spotify-preview', async function(_req, res) {
  try {
    const tracks = JSON.parse(_req.body['body']);
    const newTracks = await Promise.all(tracks.map(async (trackId) => {
      const previewUrl = await getSpotifyPreviewUrl(trackId);
      return previewUrl;
    }));

    return res.send(newTracks);

  } catch (error) {
    throw Error(error);
  }
});

const port = process.env.PORT || 3080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});