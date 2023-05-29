import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { getMostCommonArtists, getPlaylistDurations } from '@/lib/stats';

interface Props {
	playlists: Playlist[];
}

interface GridCellProps {
	className?: string;
	filter: string;
	text: string;
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

const Playlists = ({ playlists }: Props): JSX.Element => {
	const [displayPlaylists, setDisplayPlaylists] = useState<Playlist[]>([]);
	const [filter, setFilter] = useState('');

	const playlistDurations = useMemo(() => getPlaylistDurations(playlists), [playlists]);
	const mostCommonArtists = useMemo(() => getMostCommonArtists(playlists), [playlists]);

	useEffect(() => {
		const filtered = playlists
			.map((playlist: Playlist) => ({
				...playlist,
				tracks: playlist.tracks.filter((track) => filterTrack(track, filter)),
			}))
			.filter(({ tracks }) => tracks.length);

		setDisplayPlaylists(filtered);
	}, [playlists, filter]);

	if (!playlists.length) return <p>Loading...</p>;

	return (
		<section className="flex flex-col gap-4 p-4">
			<div className="flex items-center gap-4">
				<input
					className="mr-auto rounded border border-slate-300 py-1 px-3"
					type="text"
					placeholder="Song, Artist, or Album"
					onChange={(e) => setFilter(e.target.value)}
				/>

				<p>
					{displayPlaylists.length !== playlists.length && displayPlaylists.length + '/'}
					{playlists.length} Playlists
				</p>
				{mostCommonArtists.length && mostCommonArtists[0].count > 1 && (
					<p>
						Most common artist{mostCommonArtists.length ? 's' : ''}:{' '}
						{mostCommonArtists.length
							? mostCommonArtists
									.map((mca) => mca.artist)
									.sort()
									.join(', ')
							: mostCommonArtists[0].artist}{' '}
						({mostCommonArtists[0].count})
					</p>
				)}
				{playlistDurations && (
					<>
						<p>
							Shortest playlist: {playlistDurations.shortest.name} (
							{formatTime(playlistDurations.shortest.duration)})
						</p>
						<p>
							Longest playlist: {playlistDurations.longest.name} (
							{formatTime(playlistDurations.longest.duration)})
						</p>
					</>
				)}
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
