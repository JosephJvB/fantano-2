export const SPOTIFY_TOKEN_COOKIE = 'spotify-token'

export const getSpotifyCookie = () => {
  if (typeof document === 'undefined') {
    return undefined
  }

  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${SPOTIFY_TOKEN_COOKIE}=`))
    ?.split('=')[1]
}
