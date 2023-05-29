interface PlaylistDuration {
	name: string;
	duration: number; // ms
}

interface ShortestLongest {
	shortest: PlaylistDuration;
	longest: PlaylistDuration;
}

interface ArtistCount {
	artist: string;
	count: number;
}
