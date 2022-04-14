# lavaclient-manager
Migrated from centra to undici REST and Spotify manager for lavaclient.

>>> Warning: This migration was forcused for performance of lavaclient for my Discord bot Ruqa, however you can use this repo to migrate official lavaclient, keep in mind use it on your own risk.

## How to migrate?
If you want to add this migration to official lavaclient, go ahead and clone that lavaclient repository and replace `node_modules/lavaclient/lib/node/REST.ts` with this repository `REST.ts` (lavaclient-rest).

For Spotify do the same just replace `node_modules/@lavaclient/spotify/dist/SpotifyManager.ts` with this repository `SpotifyManager.ts` (spotify).
