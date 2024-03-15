import type { ISpotifyTrack } from 'jvb-spotty-models'

// limited to 50? even tho docs say 100
// https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
// chunking anything above 50 caused this error:
// {"error":{"status":400,"message":"too many ids requested"}}
export const PAGE_LIMIT = 50

let ACCESS_TOKEN: string | undefined
let BASIC_TOKEN: string | undefined

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
  await setBasicToken()

  // limited to 50? even tho docs say 100
  // https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
  // chunking anything above 50 caused this error:
  // {"error":{"status":400,"message":"too many ids requested"}}

  const allTracks: ISpotifyTrack[] = []
  for (let i = 0; i < trackIds.length; i += PAGE_LIMIT) {
    const batch = trackIds.slice(i, i + PAGE_LIMIT)
    const tracks = await getTracks(batch)

    allTracks.push(...tracks)
  }

  return allTracks
}

const getTracks = async (trackIds: string[]) => {
  const searchParams = new URLSearchParams({
    ids: trackIds.join(','),
  })

  const response = await fetch(
    'https://api.spotify.com/v1/tracks?' + searchParams,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${BASIC_TOKEN}`,
      },
    }
  )

  const json = await response.json()

  if (!response.ok) {
    throw new Error(
      [
        `getTracks failed. status:${response.status}`,
        JSON.stringify(json),
      ].join('\n')
    )
  }

  return (json as { tracks: ISpotifyTrack[] }).tracks
}

const requestAccessToken = async () => {
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
    throw new Error(
      [
        `requestAccessToken failed. status:${response.status}`,
        JSON.stringify(json),
      ].join('\n')
    )
  }

  return (json as { access_token: string }).access_token
}
const setBasicToken = async () => {
  if (!BASIC_TOKEN) {
    BASIC_TOKEN = await requestBasicToken()
  }
  return BASIC_TOKEN
}
const requestBasicToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: import.meta.env.SPOTIFY_CLIENT_ID,
      client_secret: import.meta.env.SPOTIFY_SECRET,
    }),
  })

  const json = await response.json()

  if (!response.ok) {
    throw new Error(
      [
        `requestBasicToken failed. status:${response.status}`,
        JSON.stringify(json),
      ].join('\n')
    )
  }

  return (json as { access_token: string }).access_token
}
