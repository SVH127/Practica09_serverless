import { createUser } from '../adapters/postgresAdapter.js';
import userDomain from '../domain/userDomain.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  try {
    const { username, password } = req.body;
    const hashedPassword = userDomain.hashPassword(password);
    const newUser = await createUser(username, hashedPassword);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
