import axios from 'axios'
import { Buffer } from 'buffer';

export const spotifyPrediction = async (input, type = 'track', limit = 10, offset = 0) => {
  try {
    if (!input) throw Error('No input provided.')
    
    const accessToken = await getSpotifyAccessToken()
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
      return data?.tracks?.items?.filter(song => song?.preview_url != null) ?? []
    } else if (type === 'album') {
      return data?.albums?.items ?? []
    }
  } catch (error) {
    console.log('Error fetching Spotify Api', error)
    throw Error(error)
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
    )
    return response.data.access_token
  } catch (error) {
    console.error('Error obtaining Spotify access token:', error)
    throw error
  }
};