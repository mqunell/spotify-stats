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

const formatTime = (duration: number): string => {
	const seconds = Math.round(duration / 1000);
	const mm = Math.floor(seconds / 60).toString();
	const ss = (seconds % 60).toString().padStart(2, '0');
	return `${mm}:${ss}`;
};

const GridCell = ({ className, filter, text }: GridCellProps) => (
	<p
		className={classNames(className, 'truncate', {
			'bg-yellow-100': filter.length ? text.includes(filter) : false,
		})}
	>
		{text}
	</p>
);

const Playlists = ({ accessToken }: PlaylistsProps): JSX.Element => {
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [displayPlaylists, setDisplayPlaylists] = useState<Playlist[]>([]);
	const [filter, setFilter] = useState('');

	const fetchPlaylists = async () => {
		try {
			const res = await axios.post('/api/playlists', { accessToken });
			const playlists: Playlist[] = res.data
				.filter(({ name }: Playlist) => name.startsWith('20') && name !== '2010s Mix')
				.sort((a: Playlist, b: Playlist) => (a.name > b.name ? -1 : 1));

			setPlaylists(playlists);
			setDisplayPlaylists(playlists);
		} catch (error) {
			console.log(error);
			setPlaylists([]);
			setDisplayPlaylists([]);
		}
	};

	const includesFilter = (str: string) =>
		str.toLowerCase().includes(filter.toLowerCase());

	const filterName = ({ name }: Track) => includesFilter(name);

	const filterArtists = ({ artists }: Track) =>
		includesFilter(artists.map((artist) => artist.name).join(''));

	const filterAlbum = ({ album }: Track) => includesFilter(album.name);

	useEffect(() => {
		fetchPlaylists();
	}, []);

	useEffect(() => {
		const filtered = filter.length
			? displayPlaylists
					.map((playlist: Playlist) => ({
						...playlist,
						tracks: playlist.tracks.filter(
							(track) => filterName(track) || filterArtists(track) || filterAlbum(track)
						),
					}))
					.filter(({ tracks }) => tracks.length)
			: playlists;

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
									text={`${track.album.name}${track.album.type !== 'album' && '*'}`}
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
