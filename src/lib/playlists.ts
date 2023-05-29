import fs from 'fs';

/**
 * Read the Playlists from JSON (for SSR/SSG)
 */
export const getPlaylists = (): Playlist[] => {
	const playlists: Playlist[] = JSON.parse(
		fs.readFileSync('formattedPlaylists.json').toString()
	)
		.filter(({ name }: Playlist) => name.startsWith('20') && name !== '2010s Mix')
		.sort((a: Playlist, b: Playlist) => (a.name > b.name ? -1 : 1));

	return playlists;
};
