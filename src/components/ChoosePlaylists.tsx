'use client';

import { useState } from 'react';

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
	const [regex, setRegex] = useState<string>('');

	const toggle = (apiLink) => {
		setSelectedPlaylists((prev) =>
			prev.includes(apiLink) ? prev.filter((p) => p !== apiLink) : [...prev, apiLink]
		);
	};

	const toggleRegex = () => {
		const re = new RegExp(regex);
		const selected = playlistMetas.filter((d) => re.test(d.name)).map((d) => d.name);
		setSelectedPlaylists(selected);
	};

	if (!playlistMetas.length) return <p>Loading...</p>;

	return (
		<>
			<div className="flex gap-2">
				<input
					type="text"
					className="rounded-sm border border-black px-3 py-1"
					placeholder="Regex"
					value={regex}
					onChange={(e) => setRegex(e.target.value)}
				/>
				<button
					type="button"
					className="rounded-sm bg-sky-500 px-3 py-1 text-white hover:bg-sky-400"
					onClick={() => toggleRegex()}
				>
					Regex
				</button>
			</div>

			<div className="grid grid-cols-4 gap-2">
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

			<div className="flex gap-2">
				<button
					type="button"
					className="rounded-sm bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-400"
					onClick={() => console.log({ selectedPlaylists })}
				>
					Test
				</button>
				<button
					type="button"
					className="rounded-sm bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-400"
					onClick={() => submitPlaylists()}
				>
					Submit playlists
				</button>
			</div>
		</>
	);
};

export default ChoosePlaylists;
