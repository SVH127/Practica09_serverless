const { createTask } = require('../../adapters/postgresAdapter.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  try {
    const { userId, title } = req.body;
    const newTask = await createTask(userId, title);
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
