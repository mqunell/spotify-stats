'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Playlists from './Playlists';

interface Props {
	accessToken: string;
	playlistMetas: PlaylistMeta[];
}

const FetchWrapper = ({ playlistMetas }: Props) => {
	const [playlists, setPlaylists] = useState<Playlist[]>([]);

	useEffect(() => {
		const fetchPlaylistsTracks = async () => {
			try {
				const res = await axios.post('/api/playlistsTracks', { playlistMetas });
				const playlists: Playlist[] = res.data;

				setPlaylists(playlists);
			} catch (error) {
				console.log('api fail');
			}
		};

		fetchPlaylistsTracks();
	}, [playlistMetas]);

	return <Playlists playlists={playlists} />;
};

export default FetchWrapper;
