const API_BASE_URL = '';
let currentUserId = null;

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    alert('Registrado con éxito. Ahora inicia sesión.');
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (res.ok) {
        const data = await res.json();
        currentUserId = data.userId;
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('app-section').style.display = 'block';
        loadTasks();
    } else {
        alert('Credenciales incorrectas');
    }
}

async function loadTasks() {
    const res = await fetch(`${API_BASE_URL}/api/tasks/${currentUserId}`);
    const tasks = await res.json();
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach(t => {
        list.innerHTML += `<li>${t.title} ${t.completed ? '<span>✅</span>' : `<button onclick="completeTask(${t.id})">Completar</button>`}</li>`;
    });
}

async function createTask() {
    const title = document.getElementById('task-title').value;
    await fetch(`${API_BASE_URL}/api/tasks`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId, title })
    });
    document.getElementById('task-title').value = '';
    loadTasks();
}

async function completeTask(taskId) {
    await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, { method: 'PATCH' });
    loadTasks();
}