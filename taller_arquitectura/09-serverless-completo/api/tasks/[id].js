const { getTasksByUser, completeTask } = require('../../adapters/postgresAdapter.js');
const taskDomain = require('../../domain/taskDomain.js');

module.exports = async function handler(req, res) {
  const { id } = req.query; 
  if (req.method === 'GET') {
    try {
      const tasks = await getTasksByUser(id);
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } 
  if (req.method === 'PATCH') {
    try {
      taskDomain.markAsCompleted(id); 
      const result = await completeTask(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
};
