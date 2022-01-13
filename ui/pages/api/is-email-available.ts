import { NextApiRequest, NextApiResponse } from 'next';
import { apiBaseUrl } from '@/constants';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body;
	axios
		.post(`${apiBaseUrl}/auth/user/email/available`, body)
		.then(response => {
			const result = response.data.result;
			res.status(response.status).json({ result });
		})
		.catch(error => {
			res.status(error.response.status).json({});
		});
}
