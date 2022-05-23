import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const handler = async (req: VercelRequest, res: VercelResponse) => {
	const { address, email } = req.body;

	if (!address) {
		return res.status(400).json({ error: "Address passed in body is invalid" });
	}

	try {
		const user = await client.user.create({
			data: {
				did: address,
				email,
				profile: {
					create: {
						address: null,
						name: null,
						notifications: {
							create: []
						}
					}
				}
			},
		});

		return res.status(200).json(user);
	} catch (error: any) {
		return res.status(500).send(error.message);
	}
};

export default handler;
