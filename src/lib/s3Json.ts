export type S3PlaylistJson = {
  id: string
  name: string
  description: string
  trackIds: string[]
}

export const loadS3PlaylistsJson = async () => {
  const response = await fetch(
    'https://tony2stack-web-assets.s3.eu-west-2.amazonaws.com/json/spotify-playlists.json'
  )
  const json = await response.json()

  if (!response.ok) {
    throw new Error(
      [
        `loadS3PlaylistsJson failed. status:${response.status}`,
        JSON.stringify(json),
      ].join('\n')
    )
  }

  return json as S3PlaylistJson[]
}
