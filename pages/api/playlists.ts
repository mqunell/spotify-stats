import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

const url = (userId: string) => `https://api.spotify.com/v1/users/${userId}/playlists`;

const axiosConfig = (accessToken: string) => ({
	headers: { Authorization: 'Bearer ' + accessToken },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { accessToken, userId } = req.body;

	try {
		const axiosRes = await axios.get(url(userId), axiosConfig(accessToken));
		const data = axiosRes.data;

		fs.writeFileSync('playlists.json', JSON.stringify(data, null, '\t'));
		res.status(200).json(data.items);
	} catch (error) {
		console.error(error);
	}
};

export default handler;
