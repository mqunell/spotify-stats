'use client';

import { useContext, useEffect, useState } from 'react';
// import Head from 'next/head';
import { getCookies } from 'cookies-next';
import FetchWrapper from '@/components/FetchWrapper';
import ChoosePlaylists from '@/components/ChoosePlaylists';
import Login from '@/components/Login';
import axios from 'axios';

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

	const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
	const [showChoosePlaylists, setShowChoosePlaylists] = useState<boolean>(true);

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

	const filterPlaylistMetas = () =>
		userData.playlistMetas.filter((pm) => selectedPlaylists.includes(pm.apiLink));

	// Debugging - probably won't see this anymore (does it even work?)
	if (cookies.error) return <p>{JSON.stringify(cookies.error)}</p>;
	if (!accessToken) return <Login />;
	if (userData.loading) return <p>Loading...</p>;
	if (userData.error) return <p>{userData.error}</p>;

	return showChoosePlaylists ? (
		<>
			<h1 className="text-xl">Hello, {userData.displayName}</h1>
			<p>Access: {accessToken}</p>
			<p>Refresh: {refreshToken}</p>
			<ChoosePlaylists
				playlistMetas={userData.playlistMetas}
				selectedPlaylists={selectedPlaylists}
				setSelectedPlaylists={setSelectedPlaylists}
				submitPlaylists={() => setShowChoosePlaylists(false)}
			/>
		</>
	) : (
		<>
			<FetchWrapper accessToken={accessToken} playlistMetas={filterPlaylistMetas()} />

			<button
				type="button"
				className="rounded-sm bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-400"
				onClick={() => setShowChoosePlaylists(true)}
			>
				Change playlists
			</button>
		</>
	);
};

export default Home;
