'use client';

import { useState, useEffect, useMemo, Fragment } from 'react';
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
		'bg-emerald-100 dark:bg-emerald-700': filter.length && filterText(text, filter),
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
		<section className="flex w-[1200px] flex-col gap-4">
			<div className="flex justify-between gap-4">
				<div>
					<input
						className="mr-auto w-64 rounded border border-slate-300 px-3 py-1 text-black"
						type="text"
						placeholder="Filter by song, artist, or album"
						onChange={(e) => setFilter(e.target.value)}
					/>
					<p>
						{displayPlaylists.length !== playlists.length &&
							displayPlaylists.length + '/'}
						{playlists.length} Playlists
					</p>
				</div>

				{playlistDurations && (
					<div>
						<p>
							Shortest: {playlistDurations.shortest.name} (
							{formatTime(playlistDurations.shortest.duration)})
						</p>
						<p>
							Longest: {playlistDurations.longest.name} (
							{formatTime(playlistDurations.longest.duration)})
						</p>
					</div>
				)}
				{mostCommonArtists.length && mostCommonArtists[0].count > 1 && (
					<p className="max-w-xl">
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
			</div>

			<div className="grid w-full gap-x-4">
				<p className="pl-1 font-bold">Track</p>
				<p className="font-bold">Artist</p>
				<p className="font-bold">Album</p>
				<p className="pr-1 font-bold">Time</p>
				{displayPlaylists.map((playlist: Playlist) => (
					<Fragment key={playlist.link}>
						<div className="col-span-4 flex justify-center rounded bg-slate-100 py-1 dark:bg-slate-600">
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
					</Fragment>
				))}
			</div>
		</section>
	);
};

export default Playlists;
