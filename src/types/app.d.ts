type Playlist = {
	name: string;
	link: string;
	tracks: Track[];
};

type Track = {
	name: string;
	duration: number; // ms
	link: string;
	artists: {
		name: string;
		link: string;
	}[];
	album: {
		name: string;
		link: string;
		type: string;
	};
};
