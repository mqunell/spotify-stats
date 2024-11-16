import { NextResponse } from 'next/server'
import axios from 'axios'

export const POST = async (req: Request) => {
	const body = await req.json()
	const { accessToken } = body

	const axiosConfig = { headers: { Authorization: 'Bearer ' + accessToken } }

	try {
		// Display name
		const meRes = await axios.get<ApiMe>('https://api.spotify.com/v1/me', axiosConfig)
		const displayName = meRes.data.display_name

		// Playlists initial request
		let playlistsRes = await axios.get<ApiPlaylistsMeta>(
			'https://api.spotify.com/v1/me/playlists?limit=50',
			axiosConfig,
		)
		const apiPlaylists: ApiPlaylist[] = playlistsRes.data.items

		// Playlists additional requests
		while (playlistsRes.data.next) {
			playlistsRes = await axios.get<ApiPlaylistsMeta>(playlistsRes.data.next, axiosConfig)

			// Skip [0] - it's a duplicate of the previous request's [items.length - 1]
			apiPlaylists.push(...playlistsRes.data.items.slice(1))
		}

		const playlistMetas: PlaylistMeta[] = apiPlaylists
			.map((apiPlaylist: ApiPlaylist) => ({
				name: apiPlaylist.name,
				spotifyLink: apiPlaylist.external_urls.spotify,
				apiLink: apiPlaylist.tracks.href,
			}))
			.sort((a: PlaylistMeta, b: PlaylistMeta) => a.name.localeCompare(b.name))

		return NextResponse.json({ displayName, playlistMetas })
	} catch (error) {
		console.error('error in user route')
	}

	// LOCAL CACHE
	/* const displayName = 'matt';
	const jsonData: string = fs.readFileSync('playlistMetas.json').toString();
	const playlistMetas: PlaylistMeta[] = JSON.parse(jsonData);
	return NextResponse.json({ displayName, playlistMetas }); */
}
