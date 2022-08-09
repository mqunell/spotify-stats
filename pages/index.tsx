import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { getCookies } from 'cookies-next';

const Home = () => {
	const cookies = getCookies();
	const [accessToken, setAccessToken] = useState<string | undefined>();
	const [userData, setUserData] = useState();

	useEffect(() => {
		const { accessToken, refreshToken } = cookies;

		if (accessToken && refreshToken) {
			setAccessToken(accessToken);
			getUserData();
		}
	}, [cookies]);

	const getUserData = async () => {
		if (!accessToken) return;
		try {
			const res = await axios.post('/api/user', { accessToken });
			const data = res.data;
			console.log(data);
			setUserData(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className="flex flex-col items-start gap-2 p-4">
			{!accessToken ? (
				<a
					href="/api/login"
					className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500"
				>
					Log in with Spotify
				</a>
			) : (
				<div className="flex flex-col gap-2">
					<span>{accessToken}</span>
					<span>{JSON.stringify(userData)}</span>
				</div>
			)}
		</section>
	);
};

export default Home;
