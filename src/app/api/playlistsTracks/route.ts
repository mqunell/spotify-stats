import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

const axiosConfig = (accessToken: string) => ({
	headers: { Authorization: 'Bearer ' + accessToken },
});

const rateLimit = () => new Promise((resolve, reject) => setTimeout(resolve, 2000));

const getTracks = async (accessToken: string, tracksUrl: string): Promise<Track[]> => {
	try {
		const axiosRes = await axios.get(tracksUrl, axiosConfig(accessToken));
		const data: ApiPlaylistTracksMeta = axiosRes.data;

		const formattedTracks = data.items.map((item: ApiPlaylistTrack) => {
			const { name, artists, album, duration_ms, external_urls } = item.track;

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
			};
		});

		return formattedTracks;
	} catch (error) {
		console.error('getTracks', error);
		return [];
	}
};

/**
 * Retrieve data from Spotify, format and write it to JSON, and return (for API)
 */
export const POST = async (req: Request) => {
	const body = await req.json();

	const accessToken = cookies().get('accessToken')?.value as string;
	const playlistMetas: PlaylistMeta[] = body.playlistMetas;

	try {
		const formattedPlaylists: Playlist[] = [];

		while (playlistMetas.length) {
			console.log('waiting');
			await rateLimit();

			const metasToFetch: PlaylistMeta[] = playlistMetas.splice(0, 3);
			console.log('getting tracks for', metasToFetch.map((pm) => pm.name).join(', '));

			const playlistPromises: Promise<Playlist>[] = metasToFetch.map(
				async (pm: PlaylistMeta) => ({
					name: pm.name,
					link: pm.spotifyLink,
					tracks: await getTracks(accessToken, pm.apiLink),
				})
			);

			const playlists: Playlist[] = await Promise.all(playlistPromises);
			formattedPlaylists.push(...playlists);
		}

		// fs.writeFileSync(
		// 	'formattedPlaylists3.json',
		// 	JSON.stringify(formattedPlaylists, null, '\t')
		// );

		return NextResponse.json(formattedPlaylists);
	} catch (error) {
		console.error('handler', error);
		return [];
	}
};
