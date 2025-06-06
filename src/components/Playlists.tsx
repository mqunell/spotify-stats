'use client'

import { useState, useEffect, useMemo } from 'react'
import { getMostCommonArtists, getPlaylistDurations } from '@/lib/stats'
import PlaylistsDesktop from './PlaylistsDesktop'
import PlaylistsMobile from './PlaylistsMobile'

export const filterText = (text: string, filter: string): Boolean =>
	text.toLowerCase().includes(filter.toLowerCase())

const filterTrack = ({ name, artists, album }: Track, filter: string): Boolean =>
	filterText(name, filter) ||
	filterText(artists.map((artist) => artist.name).join(''), filter) ||
	filterText(album.name, filter)

export const formatTime = (duration: number): string => {
	const seconds = Math.round(duration / 1000)
	const mm = Math.floor(seconds / 60).toString()
	const ss = (seconds % 60).toString().padStart(2, '0')
	return `${mm}:${ss}`
}

const Playlists = ({ playlists }: { playlists: Playlist[] }): JSX.Element => {
	const [displayPlaylists, setDisplayPlaylists] = useState<Playlist[]>([])
	const [showAlbums, setShowAlbums] = useState(false)
	const [filter, setFilter] = useState('')

	const playlistDurations = useMemo(() => getPlaylistDurations(playlists), [playlists])
	const mostCommonArtists = useMemo(() => getMostCommonArtists(playlists), [playlists])

	useEffect(() => {
		const filtered = playlists
			.map((playlist: Playlist) => ({
				...playlist,
				tracks: playlist.tracks.filter((track) => filterTrack(track, filter)),
			}))
			.filter(({ tracks }) => tracks.length)

		setDisplayPlaylists(filtered)
	}, [playlists, filter])

	return (
		<section className="mx-auto flex w-full max-w-xl flex-col gap-4 lg:max-w-7xl">
			<div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
				<div>
					<input
						className="mr-auto w-full rounded border border-slate-300 px-3 py-1 text-black lg:w-64"
						type="text"
						placeholder="Filter by song, artist, or album"
						onChange={(e) => setFilter(e.target.value)}
					/>
					<p>
						{displayPlaylists.length !== playlists.length && displayPlaylists.length + '/'}
						{playlists.length} Playlists
					</p>
				</div>

				<button
					type="button"
					className="rounded-sm bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-400 lg:hidden"
					onClick={() => setShowAlbums(!showAlbums)}
				>
					{showAlbums ? 'Hide' : 'Show'} albums
				</button>

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
						Most common artist{mostCommonArtists.length > 1 ? 's' : ''}:{' '}
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

			<PlaylistsMobile displayPlaylists={displayPlaylists} showAlbums={showAlbums} />
			<PlaylistsDesktop displayPlaylists={displayPlaylists} filter={filter} />
		</section>
	)
}

export default Playlists
