import { NextResponse } from 'next/server'
import axios from 'axios'
import { RATE_LIMIT_DELAY, RATE_LIMIT_REQUESTS } from '@/lib/constants'
import { getCookie } from '@/lib/cookies'

const axiosConfig = (accessToken: string) => ({
	headers: { Authorization: 'Bearer ' + accessToken },
})

const rateLimit = () => new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_DELAY))

const getTracks = async (accessToken: string, tracksUrl: string): Promise<Track[]> => {
	try {
		const axiosRes = await axios.get(tracksUrl, axiosConfig(accessToken))
		const data: ApiPlaylistTracksMeta = axiosRes.data

		const formattedTracks = data.items.map((item: ApiPlaylistTrack) => {
			const { name, artists, album, duration_ms, external_urls } = item.track

			return {
				name,
				duration: duration_ms,
				link: external_urls.spotify,
				artists: artists.map((artist) => ({
					name: artist.name,
					link: artist.external_urls.spotify,
				})),
				album: {
					name: album.name,
					link: album.external_urls.spotify,
					type: album.album_type,
				},
			}
		})

		return formattedTracks
	} catch (error) {
		console.error('getTracks', error)
		return []
	}
}

/**
 * Retrieve data from Spotify, format and write it to JSON, and return (for API)
 */
export const POST = async (req: Request) => {
	const body = await req.json()

	const accessToken = await getCookie('accessToken')
	const playlistMetas: PlaylistMeta[] = body.playlistMetas
	const formattedPlaylists: Playlist[] = []

	try {
		while (playlistMetas.length) {
			console.log('waiting')
			await rateLimit()

			const metasToFetch: PlaylistMeta[] = playlistMetas.splice(0, RATE_LIMIT_REQUESTS)
			console.log('getting tracks for', metasToFetch.map((pm) => pm.name).join(', '))

			const playlistPromises: Promise<Playlist>[] = metasToFetch.map(async (pm: PlaylistMeta) => ({
				name: pm.name,
				link: pm.spotifyLink,
				tracks: await getTracks(accessToken!, pm.apiLink),
			}))

			const playlists: Playlist[] = await Promise.all(playlistPromises)
			formattedPlaylists.push(...playlists)
		}

		// fs.writeFileSync(
		// 	'formattedPlaylistsCache.json',
		// 	JSON.stringify(formattedPlaylists, null, '\t')
		// );
	} catch (error) {
		console.error('handler', error)
	}

	return NextResponse.json(formattedPlaylists)
}
