import type { NextApiRequest, NextApiResponse } from 'next';

const ApiTest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, senha } = req.body;

    console.log(process.env.API_URL);

    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: senha }),
    });

    const r = await response.json();

    console.log(r);

    return res.status(200).json({ r });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default ApiTest;
