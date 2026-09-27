const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL); 

async function createUser(username, passwordHash) {
  const result = await sql`INSERT INTO users (username, password) VALUES (${username}, ${passwordHash}) RETURNING *`;
  return result[0];
}
async function getUserByUsername(username) {
  const result = await sql`SELECT * FROM users WHERE username = ${username}`;
  return result[0];
}
async function createTask(userId, title) {
  const result = await sql`INSERT INTO tasks (user_id, title, completed) VALUES (${userId}, ${title}, false) RETURNING *`;
  return result[0];
}
async function getTasksByUser(userId) {
  return await sql`SELECT * FROM tasks WHERE user_id = ${userId}`;
}
async function completeTask(taskId) {
  const result = await sql`UPDATE tasks SET completed = true WHERE id = ${taskId} RETURNING *`;
  return result[0];
}

module.exports = { createUser, getUserByUsername, createTask, getTasksByUser, completeTask };
