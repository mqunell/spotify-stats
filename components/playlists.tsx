import { useState, useEffect } from 'react';
import axios from 'axios';
import { Playlist, Track } from '../pages/api/playlists';

type Props = {
	accessToken: string;
	userId: string;
};

const Playlists = ({ accessToken, userId }: Props): JSX.Element => {
	const [playlists, setPlaylists] = useState<Playlist[]>([]);

	const fetchPlaylists = async () => {
		try {
			const res = await axios.post('/api/playlists', { accessToken, userId });
			const data = res.data;
			setPlaylists(data);
		} catch (error) {
			console.log(error);
			setPlaylists([]);
		}
	};

	useEffect(() => {
		fetchPlaylists();
	}, []);

	return (
		<div className="flex flex-col gap-4 divide-y">
			{playlists
				.sort((a, b) => (a.name < b.name ? -1 : 1))
				.map((playlist: Playlist) => (
					<div key={playlist.name} className="p-4">
						<a href={playlist.link} className="hover:text-blue-400">
							{playlist.name}
						</a>

						<div className="grid grid-cols-4 gap-2 pl-2">
							{playlist.tracks.map((track: Track) => (
								<>
									<p>{track.name}</p>
									<p>{track.artists.map((artist) => artist.name)}</p>
									<p>
										{track.album.name} ({track.album.type})
									</p>
									<p>{track.duration / 1000}</p>
								</>
							))}
						</div>
					</div>
				))}
		</div>
	);
};

export default Playlists;
