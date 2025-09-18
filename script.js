// Projekty (przykład) – możesz podmienić na fetch z GitHub API
const projects = [
    { name: "Projekt1", icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png" },
    { name: "Projekt2", icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png" },
    { name: "Projekt3", icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png" },
    { name: "Projekt4", icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png" }
];

const container = document.getElementById('projects-container');

projects.forEach(proj => {
    const card = document.createElement('div');
    card.classList.add('project-card');

    const img = document.createElement('img');
    img.src = proj.icon;
    img.alt = proj.name;

    const name = document.createElement('p');
    name.textContent = proj.name;

    card.appendChild(img);
    card.appendChild(name);

    container.appendChild(card);
});