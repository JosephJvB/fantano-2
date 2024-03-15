import type {
  ISpotifyPaginatedResponse,
  ISpotifyTrack,
} from 'jvb-spotty-models'
import { chunkList } from '../util/chunkList'

export const getBasicAuthHeaders = () => {
  const basicAuth = Buffer.from(
    [
      import.meta.env.SPOTIFY_CLIENT_ID,
      import.meta.env.SPOTIFY_CLIENT_SECRET,
    ].join(':')
  ).toString('base64')

  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${basicAuth}`,
  }
}

export const getAllTracks = async (trackIds: string[]) => {
  const batches = chunkList(trackIds, 100)

  const responses = await Promise.all(batches.map((b) => getTracks(b)))

  return responses.flat()
}

const getTracks = async (trackIds: string[]) => {
  const searchParams = new URLSearchParams({
    trackIds: trackIds.join(','),
  })

  const response = await fetch(
    'https://api.spotify.com/v1/tracks?' + searchParams,
    {
      method: 'get',
      headers: {
        Authorization: getBasicAuthHeaders().Authorization,
      },
    }
  )

  const json = await response.json()

  if (!response.ok) {
    throw new Error('getTracks failed:\n' + JSON.stringify(json))
  }

  return (json as { tracks: ISpotifyTrack[] }).tracks
}

export const requestAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    headers: getBasicAuthHeaders(),
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: import.meta.env.SPOTIFY_REFRESH_TOKEN,
    }),
  })

  const json = await response.json()

  if (!response.ok) {
    throw new Error('requestAccessToken failed:\n' + JSON.stringify(json))
  }

  return (json as { access_token: string }).access_token
}
