import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

const playlistsUrl = 'https://api.spotify.com/v1/me/playlists?limit=50';

const axiosConfig = (accessToken: string) => ({
	headers: { Authorization: 'Bearer ' + accessToken },
});

const getTracks = async (accessToken: string, tracksUrl: string) => {
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
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { accessToken } = req.body;

	try {
		const axiosRes = await axios.get(playlistsUrl, axiosConfig(accessToken));
		const data: ApiPlaylistsMeta = axiosRes.data;

		const formattedPlaylistsPromises = data.items.map(async (item: ApiPlaylist) => ({
			name: item.name,
			link: item.external_urls.spotify,
			tracks: await getTracks(accessToken, item.tracks.href),
		}));

		const formattedPlaylists: Playlist[] = await Promise.all(formattedPlaylistsPromises);

		/* fs.writeFileSync(
			'formattedPlaylists.json',
			JSON.stringify(formattedPlaylists, null, '\t')
		); */

		res.status(200).json(formattedPlaylists);
	} catch (error) {
		console.error('handler', error);
		return [];
	}
};

export default handler;
