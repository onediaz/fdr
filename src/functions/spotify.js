import axios from 'axios'
import { Buffer } from 'buffer';

export const spotifyPrediction = async (input, type = 'track', limit = 10, offset = 0) => {
  try {
    if (!input) throw Error('No input provided.')
    
    const accessToken = await getSpotifyAccessToken();
    const url = 'https://api.spotify.com/v1/search';
    const { data } = await axios.get(
      url,
      {
        params: { q: input, type, limit, offset},
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    if (type === 'track') {
      // return data?.tracks?.items?.filter(song => song?.preview_url != null) ?? [];
      return await findPreviewUrls(data?.tracks?.items);
      // const trackId = data?.tracks?.items[0]?.id ?? '';
      // return findPreviewUrl(trackId);
    } else if (type === 'album') {
      return data?.albums?.items ?? [];
    }
  } catch (error) {
    throw Error(error);
  }
}

const findPreviewUrls = async (tracks) => {
  try {
    const url = process.env.EXPRESS_APP_URL + '/get-spotify-preview';
    const trackIds = tracks.map(track => track.id);

    const response = await axios.post(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trackIds)
    });
    for (let i = 0; i < response.data.length; i++) {
      tracks[i].previewUrl = response.data[i];
    }
    return tracks;
  } catch (error) {
    throw Error(error);
  }
}

export const getSpotifyAccessToken = async () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('Spotify client ID or secret is missing in environment variables')
  }
  const authString = `${clientId}:${clientSecret}`;
  const authBase64 = Buffer.from(authString).toString('base64');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${authBase64}`
        }
      } 
    );
    return response.data.access_token;
  } catch (error) {
    throw Error(error);
  }
};