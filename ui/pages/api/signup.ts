import { NextApiRequest, NextApiResponse } from 'next';
import { apiBaseUrl } from '@/constants';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body;
	const resp = await axios.post(`${apiBaseUrl}/auth/signup`, body);
	res.status(200).json(resp.data);
}
