/**
 * Get the shortest and longest playlists
 */
export const getPlaylistDurations = (playlists: Playlist[]): ShortestLongest => {
	if (!playlists || !playlists.length) {
		return null;
	}

	let shortest: PlaylistDuration;
	let longest: PlaylistDuration;

	playlists.forEach(({ name, tracks }: Playlist) => {
		const duration = tracks.reduce((acc, track) => acc + track.duration, 0);

		if (!shortest || duration < shortest.duration) shortest = { name, duration };
		if (!longest || duration > longest.duration) longest = { name, duration };
	});

	return { shortest, longest };
};

/**
 * Count the primary artist that shows up in the most unique playlists
 */
export const getMostCommonArtists = (playlists: Playlist[]): ArtistCount[] => {
	if (!playlists || !playlists.length) {
		return [];
	}

	const artistCounts: { [key: string]: number } = {};

	playlists.forEach((playlist: Playlist) => {
		// Build set of artists in the playlist
		const uniqueArtists = new Set();
		// playlist.tracks.forEach((track: Track) => uniqueArtists.add(track.artists[0].name));
		playlist.tracks.forEach((track: Track) =>
			track.artists.forEach((artist) => uniqueArtists.add(artist.name))
		);

		// Initialize/increment their counts
		uniqueArtists.forEach((artist: string) => {
			const prevCount = artistCounts[artist] || 0;
			artistCounts[artist] = prevCount + 1;
		});
	});

	const maxCount = Math.max(...Object.values(artistCounts));
	const mostCommon = Object.keys(artistCounts)
		.filter((artist: string) => artistCounts[artist] === maxCount)
		.map((artist: string) => ({ artist, count: maxCount }));

	return mostCommon;
};
