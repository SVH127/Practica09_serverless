const { getUserByUsername } = require('../adapters/postgresAdapter.js');
const userDomain = require('../domain/userDomain.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user || !userDomain.comparePassword(password, user.password)) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    return res.status(200).json({ message: 'Login exitoso', userId: user.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
