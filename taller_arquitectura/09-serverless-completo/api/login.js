import { getUserByUsername } from '../adapters/postgresAdapter.js';
import userDomain from '../domain/userDomain.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user || !userDomain.comparePassword(password, user.password)) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }
    return res.status(200).json({ message: 'Login exitoso', userId: user.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
