const API = "http://backend:8080";

async function fetchTasks() {
  try {
    const res = await fetch(`${API}/tasks`);
    const data = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    data.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.title;
      list.appendChild(li);
    });

  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

async function addTask() {
  const input = document.getElementById("taskInput");

  if (!input.value) return;

  try {
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: input.value })
    });

    input.value = "";
    fetchTasks();

  } catch (err) {
    console.error("Error adding task:", err);
  }
}

fetchTasks();
