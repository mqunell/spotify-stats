import { useEffect, useState } from 'react';
// import Head from 'next/head';
import axios from 'axios';
import { getCookies } from 'cookies-next';
import Playlists from '../components/playlists';
import Link from 'next/link';

type UserData = {
	loading: boolean;
	data: {
		display_name: string;
		id: string;
	};
	error: string;
};

const Home = () => {
	const cookies = getCookies();
	const [accessToken, setAccessToken] = useState<string | undefined>();
	const [userData, setUserData] = useState<UserData>({
		loading: false,
		data: null,
		error: '',
	});

	useEffect(() => {
		const { accessToken, refreshToken } = cookies;

		if (accessToken && refreshToken) {
			setAccessToken(accessToken);
			getUserData();
		}
	}, [cookies]);

	const getUserData = async () => {
		if (!accessToken || userData.loading || userData.data) return;

		setUserData((prev) => ({ ...prev, loading: true }));

		try {
			const res = await axios.post('/api/user', { accessToken });
			const data = res.data;
			console.log(data);
			setUserData((prev) => ({ ...prev, data }));
		} catch (error) {
			setUserData((prev) => ({ ...prev, error }));
			console.error(error);
		} finally {
			setUserData((prev) => ({ ...prev, loading: false }));
		}
	};

	const getOutput = () => {
		if (!accessToken) {
			return (
				<>
					<h1 className="text-xl">Music Time 🎸 🥁</h1>
					<p>Authenticate with Spotify for the Full Experience™️</p>
					<Link href="/api/login">
						<a className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500">
							Log in with Spotify 🤙
						</a>
					</Link>
				</>
			);
		}

		if (userData.loading) return <p>Loading...</p>;

		if (userData.error) return <p>{userData.error}</p>;

		return (
			<>
				<h1 className="text-xl">Hello, {userData.data?.display_name}</h1>
				<Playlists accessToken={accessToken} userId={userData.data?.id} />
			</>
		);
	};

	return <section className="flex flex-col items-start gap-2 p-4">{getOutput()}</section>;
};

export default Home;
