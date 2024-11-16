import { Fragment } from 'react'
import clsx from 'clsx'
import { filterText, formatTime } from './Playlists'

interface GridCellProps {
	className?: string
	filter: string
	text: string
}

interface Props {
	displayPlaylists: Playlist[]
	filter: string
}

const GridCell = ({ className, filter, text }: GridCellProps) => {
	const classes = clsx(className, 'truncate', {
		'bg-emerald-100 dark:bg-emerald-700': filter.length && filterText(text, filter),
	})

	return <p className={classes}>{text}</p>
}

const PlaylistsDesktop = ({ displayPlaylists, filter }: Props) => (
	<div className="hidden w-full gap-x-4 lg:grid">
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

				{playlist.tracks.map((track: Track, index: number) => (
					<Fragment key={`${playlist.link}-${track.link}-${index}`}>
						<GridCell className="pl-1" filter={filter} text={track.name} />
						<GridCell
							filter={filter}
							text={track.artists.map((artist) => artist.name).join(', ')}
						/>
						<GridCell
							filter={filter}
							text={`${track.album.name}${track.album.type !== 'album' ? '*' : ''}`}
						/>
						<GridCell className="pr-1" filter={filter} text={formatTime(track.duration)} />
					</Fragment>
				))}
			</Fragment>
		))}
	</div>
)

export default PlaylistsDesktop
