import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';

const formatApiPlaylists = (items: ApiPlaylist[]): PlaylistMeta[] => {
	return items.map((apiPlaylist: ApiPlaylist) => ({
		name: apiPlaylist.name,
		spotifyLink: apiPlaylist.external_urls.spotify,
		apiLink: apiPlaylist.tracks.href,
	}));
};

export const POST = async (req: Request) => {
	// LOCAL CACHE
	const displayName = 'matt';
	const jsonData: string = fs.readFileSync('playlistMetas.json').toString();
	const playlistMetas: PlaylistMeta[] = JSON.parse(jsonData);
	return NextResponse.json({ displayName, playlistMetas });

	/* const body = await req.json();
	const { accessToken } = body;

	const axiosConfig = { headers: { Authorization: 'Bearer ' + accessToken } };

	try {
		// Display name
		const meRes = await axios.get('https://api.spotify.com/v1/me', axiosConfig);
		const meData: ApiMe = meRes.data;
		const displayName = meData.display_name;

		// Playlists initial request
		let playlistsRes = await axios.get(
			'https://api.spotify.com/v1/me/playlists?limit=50',
			axiosConfig
		);
		let playlistsData: ApiPlaylistsMeta = playlistsRes.data;
		const playlistMetas: PlaylistMeta[] = formatApiPlaylists(playlistsData.items);

		// Playlists additional requests
		while (playlistsData.next) {
			playlistsRes = await axios.get(playlistsData.next, axiosConfig);
			playlistsData = playlistsRes.data;
			playlistMetas.push(...formatApiPlaylists(playlistsData.items));
		}

		return NextResponse.json({ displayName, playlistMetas });
	} catch (error) {
		console.error('error in user route');
	} */
};
