'use client';

interface Props {
	playlistMetas: PlaylistMeta[];
	selectedPlaylists: string[];
	setSelectedPlaylists: Function;
	submitPlaylists: Function;
}

const ChoosePlaylists = ({
	playlistMetas,
	selectedPlaylists,
	setSelectedPlaylists,
	submitPlaylists,
}: Props) => {
	const toggle = (apiLink: string) => {
		setSelectedPlaylists((prev: string[]) =>
			prev.includes(apiLink) ? prev.filter((p) => p !== apiLink) : [...prev, apiLink]
		);
	};

	const toggleRegex = (input: string) => {
		if (!input) {
			setSelectedPlaylists([]);
			return;
		}

		const re = new RegExp(input);
		const selected = playlistMetas.filter((d) => re.test(d.name)).map((d) => d.apiLink);
		setSelectedPlaylists(selected);
	};

	if (!playlistMetas.length) return <p>Loading...</p>;

	return (
		<>
			<p>Choose up to 5 playlists</p>

			<div className="grid w-full grid-cols-playlistTitles gap-2">
				{playlistMetas.map(({ name, apiLink }) => (
					<label key={apiLink} className="flex items-center gap-1">
						<input
							type="checkbox"
							checked={selectedPlaylists.includes(apiLink)}
							onChange={() => toggle(apiLink)}
						/>
						{name}
					</label>
				))}
			</div>

			<div className="mt-2 flex gap-2">
				<input
					type="text"
					className="rounded-sm border border-black px-3 py-1"
					placeholder="Regex matcher"
					onChange={(e) => toggleRegex(e.target.value)}
				/>

				<button
					type="button"
					className="rounded-sm bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-400 disabled:bg-emerald-800"
					disabled={selectedPlaylists.length === 0 || selectedPlaylists.length > 5}
					onClick={() => submitPlaylists()}
				>
					Submit playlists
				</button>
			</div>
		</>
	);
};

export default ChoosePlaylists;
