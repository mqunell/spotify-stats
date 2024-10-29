'use client';

import { useEffect, useState } from 'react';
import { getCookies } from 'cookies-next';
import ChoosePlaylists from '@/components/ChoosePlaylists';
import Login from '@/components/Login';
import axios from 'axios';
import Playlists from '@/components/Playlists';
import Loading from '@/components/Loading';

const Home = () => {
	const cookies = getCookies();
	const [accessToken, setAccessToken] = useState<string | undefined>();
	const [refreshToken, setRefreshToken] = useState<string | undefined>();

	const [userData, setUserData] = useState<UserData>({
		loading: false,
		displayName: '',
		playlistMetas: [],
		error: null,
	});

	const [selectedPlaylistLinks, setSelectedPlaylistLinks] = useState<string[]>([]);
	const [showChoosePlaylists, setShowChoosePlaylists] = useState<boolean>(true);
	const [fetchedPlaylists, setFetchedPlaylists] = useState<Playlist[]>([]);

	useEffect(() => {
		setAccessToken(cookies.accessToken);
		setRefreshToken(cookies.refreshToken);
	}, [cookies]);

	useEffect(() => {
		const getAuthData = async () => {
			setUserData((prev) => ({ ...prev, loading: true }));

			try {
				const res = await axios.post('/api/user', { accessToken });
				const { displayName, playlistMetas } = res.data;
				setUserData((prev) => ({ ...prev, displayName, playlistMetas }));
			} catch (error) {
				setUserData((prev) => ({ ...prev, error }));
				console.error('getAuthData error', error);
			}

			setUserData((prev) => ({ ...prev, loading: false }));
		};

		if (!accessToken) {
			setUserData({ loading: false, displayName: '', playlistMetas: [], error: '' });
		} else {
			getAuthData();
		}
	}, [accessToken]);

	const fetchPlaylistsTracks = async () => {
		console.log('spl length in function', selectedPlaylistLinks.length);

		const playlistMetas = userData.playlistMetas.filter(({ apiLink }) =>
			selectedPlaylistLinks.includes(apiLink)
		);

		try {
			const res = await axios.post('/api/playlistsTracks', { playlistMetas });
			const playlists: Playlist[] = res.data;

			setFetchedPlaylists(playlists);
		} catch (error) {
			console.log('api fail');
		}
	};
	console.log('spl length outside of function', selectedPlaylistLinks.length);

	// TODO: Something about all these returns...
	if (cookies.error) return <p>{JSON.stringify(cookies.error)}</p>; // Debugging - probably won't see this anymore (does it even work?)
	if (!accessToken) return <Login />;
	if (userData.loading) return <Loading />;
	if (userData.error) return <p>{userData.error}</p>;

	if (showChoosePlaylists) {
		return (
			<>
				<h1 className="text-xl">Hello, {userData.displayName}</h1>
				<ChoosePlaylists
					playlistMetas={userData.playlistMetas}
					selectedPlaylists={selectedPlaylistLinks}
					setSelectedPlaylists={setSelectedPlaylistLinks}
					submitPlaylists={() => {
						setShowChoosePlaylists(false);
						fetchPlaylistsTracks();
					}}
				/>
			</>
		);
	}

	if (!fetchedPlaylists.length) {
		return <Loading quantity={selectedPlaylistLinks.length} />;
	}

	return (
		<>
			<Playlists playlists={fetchedPlaylists} />

			<button
				type="button"
				className="mx-auto rounded-sm bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-400"
				onClick={() => {
					setShowChoosePlaylists(true);
					setFetchedPlaylists([]);
				}}
			>
				Change playlists
			</button>
		</>
	);
};

export default Home;
