/// <reference types="astro/client" />
interface ImportMetaEnv {
  // TODO: it would be cool to load this from AWS parameter store instead of storing in env vars
  readonly PUBLIC_SPOTIFY_REDIRECT_URL: string
  readonly SPOTIFY_CLIENT_ID: string
  readonly SPOTIF_SECRET: string
}
