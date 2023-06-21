type PlaylistDuration = {
	name: string;
	duration: number; // ms
};

type ShortestLongest = {
	shortest: PlaylistDuration;
	longest: PlaylistDuration;
} | null;

type ArtistCount = {
	artist: string;
	count: number;
};
