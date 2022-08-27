import { useState, useEffect } from 'react';
import axios from 'axios';
import { Playlist, Track } from '@/pages/api/playlists';

type Props = {
	accessToken: string;
};

const formatTime = (duration: number): string => {
	const seconds = Math.round(duration / 1000);
	const mm = Math.floor(seconds / 60).toString();
	const ss = (seconds % 60).toString().padStart(2, '0');
	return `${mm}:${ss}`;
};

const Playlists = ({ accessToken }: Props): JSX.Element => {
	const [playlists, setPlaylists] = useState<Playlist[]>([]);

	const fetchPlaylists = async () => {
		try {
			const res = await axios.post('/api/playlists', { accessToken });
			const playlists: Playlist[] = res.data
				.filter(({ name }: Playlist) => name.startsWith('20') && name !== '2010s Mix')
				.sort((a: Playlist, b: Playlist) => (a.name > b.name ? -1 : 1));

			setPlaylists(playlists);
		} catch (error) {
			console.log(error);
			setPlaylists([]);
		}
	};

	useEffect(() => {
		fetchPlaylists();
	}, []);

	return (
		<div className="grid max-w-6xl gap-x-4">
			<p className="pl-1 font-bold">Track</p>
			<p className="font-bold">Artist</p>
			<p className="font-bold">Album</p>
			<p className="pr-1 font-bold">Time</p>
			{playlists.map((playlist: Playlist) => (
				<>
					<div className="col-span-4 flex justify-center rounded bg-slate-100 py-1">
						<a href={playlist.link} className="text-lg hover:text-blue-400">
							{playlist.name}
						</a>
					</div>

					{playlist.tracks.map((track: Track) => (
						<>
							<p className="truncate pl-1">{track.name}</p>
							<p className="truncate">
								{track.artists.map((artist) => artist.name).join(', ')}
							</p>
							<p className="truncate">
								{track.album.name}
								{track.album.type !== 'album' && '*'}
							</p>
							<p className="pr-2">{formatTime(track.duration)}</p>
						</>
					))}
				</>
			))}
		</div>
	);
};

export default Playlists;
