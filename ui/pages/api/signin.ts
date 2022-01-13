import { NextApiRequest, NextApiResponse } from 'next';
import { apiBaseUrl } from '@/constants';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body;
	axios
		.post(`${apiBaseUrl}/auth/signin`, body)
		.then(response => {
			const data = response.data.accessToken;
			res.status(response.status).json({ token: data });
		})
		.catch(error => {
			res.status(error.response.status).json({});
		});
}
