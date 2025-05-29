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
			apiPlaylists.push(...playlistsRes.data.items)
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
		console.debug('error in user route', error)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}

	// LOCAL CACHE
	/* const displayName = 'matt';
	const jsonData: string = fs.readFileSync('playlistMetas.json').toString();
	const playlistMetas: PlaylistMeta[] = JSON.parse(jsonData);
	return NextResponse.json({ displayName, playlistMetas }); */
}
