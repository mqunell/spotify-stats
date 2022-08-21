import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const url = 'https://api.spotify.com/v1/me';

const axiosConfig = (accessToken: string) => ({
	headers: { Authorization: 'Bearer ' + accessToken },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { accessToken } = req.body;

	try {
		const axiosRes = await axios.get(url, axiosConfig(accessToken));
		const data = axiosRes.data;
		res.status(200).json(data);
	} catch (error) {
		console.error(error);
	}
};

export default handler;
