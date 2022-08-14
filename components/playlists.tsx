import { useState, useEffect } from 'react';
import axios from 'axios';

type Props = {
	accessToken: string;
	userId: string;
};

const Playlists = ({ accessToken, userId }: Props): JSX.Element => {
	const [playlists, setPlaylists] = useState([]);

	const fetchPlaylists = async () => {
		try {
			const res = await axios.post('/api/playlists', { accessToken, userId });
			const data = res.data;
			setPlaylists(data);
		} catch (error) {
			console.log(error);
			setPlaylists([]);
		}
	};

	useEffect(() => {
		fetchPlaylists();
	}, []);

	return (
		<div className="flex flex-col divide-y">
			{playlists.map((playlist) => (
				<pre className="p-1 text-xs" key={playlist.id}>
					{playlist.name}
				</pre>
			))}
		</div>
	);
};

export default Playlists;
