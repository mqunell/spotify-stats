import { formatTime } from './Playlists';

interface Props {
	displayPlaylists: Playlist[];
	showAlbums: boolean;
}

const PlaylistsMobile = ({ displayPlaylists, showAlbums }: Props) => (
	<div className="flex flex-col gap-2 lg:hidden">
		{displayPlaylists.map((playlist: Playlist) => (
			<div key={playlist.link}>
				{/* Title */}
				<div className="flex justify-center rounded bg-slate-100 py-1 dark:bg-slate-600">
					<a
						href={playlist.link}
						className="text-lg hover:text-blue-400 dark:text-slate-100"
					>
						{playlist.name}
					</a>
				</div>

				<div className="divide-y divide-dotted">
					{/* Tracks */}
					{playlist.tracks.map((track: Track) => (
						<div key={track.link} className="flex justify-between p-2">
							<div className="flex flex-col">
								<span className="font-bold leading-tight">{track.name}</span>
								{showAlbums && (
									<span className="pl-1 leading-none">
										<span className="text-xs italic">on </span>
										<span className="text-sm">
											{track.album.name}
											{track.album.type !== 'album' ? '*' : ''}
										</span>
									</span>
								)}
								<span className="pl-1 leading-none">
									{showAlbums && <span className="text-xs italic">by </span>}
									<span className="text-sm">
										{track.artists.map((artist) => artist.name).join(', ')}
									</span>
								</span>
							</div>
							<span>{formatTime(track.duration)}</span>
						</div>
					))}
				</div>
			</div>
		))}
	</div>
);

export default PlaylistsMobile;
