import { useState, useEffect } from 'react';
import axios from 'axios';
import { Playlist, Track } from '@/pages/api/playlists';
import classNames from 'classnames';

interface GridCellProps {
	className?: string;
	filter: string;
	text: string;
}

interface PlaylistsProps {
	accessToken: string;
}

const filterText = (text: string, filter: string): Boolean =>
	text.toLowerCase().includes(filter.toLowerCase());

const filterTrack = ({ name, artists, album }: Track, filter: string): Boolean =>
	filterText(name, filter) ||
	filterText(artists.map((artist) => artist.name).join(''), filter) ||
	filterText(album.name, filter);

const formatTime = (duration: number): string => {
	const seconds = Math.round(duration / 1000);
	const mm = Math.floor(seconds / 60).toString();
	const ss = (seconds % 60).toString().padStart(2, '0');
	return `${mm}:${ss}`;
};

const GridCell = ({ className, filter, text }: GridCellProps) => {
	const classes = classNames(className, 'truncate', {
		'bg-yellow-100': filter.length && filterText(text, filter),
	});

	return <p className={classes}>{text}</p>;
};

const Playlists = ({ accessToken }: PlaylistsProps): JSX.Element => {
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [displayPlaylists, setDisplayPlaylists] = useState<Playlist[]>([]);
	const [filter, setFilter] = useState('');

	const fetchPlaylists = async () => {
		try {
			const res = await axios.post('/api/playlists', { accessToken });
			const playlists: Playlist[] = res.data;

			setPlaylists(playlists);
			setDisplayPlaylists(playlists);
		} catch (error) {
			console.log(error);
			setPlaylists([]);
			setDisplayPlaylists([]);
		}
	};

	useEffect(() => {
		fetchPlaylists();
	}, []);

	useEffect(() => {
		const filtered = playlists
			.map((playlist: Playlist) => ({
				...playlist,
				tracks: playlist.tracks.filter((track) => filterTrack(track, filter)),
			}))
			.filter(({ tracks }) => tracks.length);

		setDisplayPlaylists(filtered);
	}, [filter]);

	return (
		<section className="flex flex-col gap-4">
			<div>
				<input
					className="rounded border border-slate-300 py-1 px-3"
					type="text"
					placeholder="Song, Artist, or Album"
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>

			<div className="grid max-w-6xl gap-x-4">
				<p className="pl-1 font-bold">Track</p>
				<p className="font-bold">Artist</p>
				<p className="font-bold">Album</p>
				<p className="pr-1 font-bold">Time</p>
				{displayPlaylists.map((playlist: Playlist) => (
					<>
						<div className="col-span-4 flex justify-center rounded bg-slate-100 py-1">
							<a href={playlist.link} className="text-lg hover:text-blue-400">
								{playlist.name}
							</a>
						</div>

						{playlist.tracks.map((track: Track) => (
							<>
								<GridCell className="pl-1" filter={filter} text={track.name} />
								<GridCell
									filter={filter}
									text={track.artists.map((artist) => artist.name).join(', ')}
								/>
								<GridCell
									filter={filter}
									text={`${track.album.name}${track.album.type !== 'album' ? '*' : ''}`}
								/>
								<GridCell
									className="pr-1"
									filter={filter}
									text={formatTime(track.duration)}
								/>
							</>
						))}
					</>
				))}
			</div>
		</section>
	);
};

export default Playlists;
