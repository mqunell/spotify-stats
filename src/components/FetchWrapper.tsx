import { useState, useEffect } from 'react';
import axios from 'axios';
import Playlists from './Playlists';

interface Props {
	selectedPlaylists: PlaylistMeta[];
}

const FetchWrapper = ({ selectedPlaylists }: Props): JSX.Element => {
	const [playlists, setPlaylists] = useState<Playlist[]>([]);

	const fetchPlaylists = async () => {
		try {
			const res = await axios.post('/api/playlists', {}); // todo: update this
			const playlists: Playlist[] = res.data;

			setPlaylists(playlists);
		} catch (error) {
			console.log('FetchWrapper fetchPlaylists error');
			setPlaylists([]);
		}
	};

	useEffect(() => {
		fetchPlaylists();
	}, []);

	return <Playlists playlists={playlists} />;
};

export default FetchWrapper;
