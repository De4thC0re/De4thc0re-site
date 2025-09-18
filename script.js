const projectsEl = document.getElementById('projects');
const githubUsername = 'De4thC0re'; // Twój nick GitHub

async function getProjectsCount() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        const data = await response.json();

        // Liczymy wszystkie repozytoria
        const totalProjects = data.length;

        // Animowany licznik
        let current = 0;
        const speed = 50;

        function increaseCounter() {
            if(current < totalProjects) {
                current++;
                projectsEl.innerText = current;
                setTimeout(increaseCounter, speed);
            }
        }

        increaseCounter();
    } catch(err) {
        console.error('Błąd pobierania repozytoriów:', err);
        projectsEl.innerText = '0';
    }
}

getProjectsCount();