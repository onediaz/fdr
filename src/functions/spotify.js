import axios from 'axios'
import { Buffer } from 'buffer';

export const spotifyPrediction = async (input, type = 'track', limit = 1, offset = 0) => {
  try {
    if (!input) throw Error('No input provided.')
    
    const accessToken = await getSpotifyAccessToken();
    console.log('Access token: ', accessToken);
    const url = 'https://api.spotify.com/v1/search'
    const { data } = await axios.get(
      url,
      {
        params: { q: input, type, limit, offset},
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )
    if (type === 'track') {
      // return data?.tracks?.items?.filter(song => song?.preview_url != null) ?? [];
      return data?.tracks?.items?.map(song => {
        const previewUrl = findPreviewUrl(song?.id, accessToken);
        return { ...song, preview_url: previewUrl }
      }) ?? [];
      // const trackId = data?.tracks?.items[0]?.id ?? '';
      // return findPreviewUrl(trackId);
    } else if (type === 'album') {
      return data?.albums?.items ?? []
    }
  } catch (error) {
    console.log('Error fetching Spotify Api', error)
    throw Error(error)
  }
}

const findPreviewUrl = async (trackId, accessToken) => {
  try {
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;
    let previewUrl = "";

    const htmlPage = await fetch(embedUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
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
}

export const getSpotifyAccessToken = async () => {
  // if (localStorage.getItem('spotifyAccessToken')) {
  //   return localStorage.getItem('spotifyAccessToken');
  // }
  // const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientId = 'e42e96d133a348ad8794b951042bbe35';
  // const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const clientSecret = '75689b32bd4c4d63bd115119edf7d225';
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
    )
    // localStorage.setItem('spotifyAccessToken', response.data.access_token).expiresIn(response.data.expires_in);
    return response.data.access_token
  } catch (error) {
    console.error('Error obtaining Spotify access token:', error)
    throw error
  }
};