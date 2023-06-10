import { NextResponse } from 'next/server';
import axios from 'axios';

export const POST = async (req: Request) => {
	const body = await req.json();
	const { accessToken } = body;

	try {
		const axiosRes = await axios.get('https://api.spotify.com/v1/me', {
			headers: { Authorization: 'Bearer ' + accessToken },
		});
		const data = axiosRes.data;

		return NextResponse.json(data);
	} catch (error) {
		console.error('error in user route');
	}
};
