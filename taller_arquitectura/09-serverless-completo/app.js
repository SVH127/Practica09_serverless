function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

let userId = localStorage.getItem('userId');
if (userId) {
    hide('loginSection');
    show('taskSection');
    loadTasks();
}

async function register() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p })
    });
    if (res.ok) alert('Registrado con éxito');
    else alert('Error al registrar');
}

async function login() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p })
    });
    if (res.ok) {
        const data = await res.json();
        localStorage.setItem('userId', data.userId);
        userId = data.userId;
        hide('loginSection');
        show('taskSection');
        loadTasks();
    } else alert('Credenciales incorrectas');
}

async function logout() {
    localStorage.removeItem('userId');
    userId = null;
    hide('taskSection');
    show('loginSection');
}

async function loadTasks() {
    if (!userId) return;
    const res = await fetch(`/api/tasks/${userId}`);
    const tasks = await res.json();
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${t.title}</span>
            ${t.completed ? '✅' : `<button onclick="completeTask('${t.id}')">Completar</button>`}
        `;
        list.appendChild(li);
    });
}

async function addTask() {
    const title = document.getElementById('taskTitle').value;
    if (!title) return;
    const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: parseInt(userId), title })
    });
    if (res.ok) {
        document.getElementById('taskTitle').value = '';
        loadTasks();
    }
}

async function completeTask(id) {
    const res = await fetch(`/api/tasks/${id}`, { method: 'PATCH' });
    if (res.ok) loadTasks();
}
