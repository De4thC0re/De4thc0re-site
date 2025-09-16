// Funkcja animująca licznik
function animateCounter(id, target) {
    let count = 0;
    const el = document.getElementById(id);
    const increment = target / 100; // dzielimy na 100 kroków
    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        el.textContent = Math.floor(count);
    }, 20);
}

// Funkcja pobierająca repozytoria z GitHub API
async function fetchRepos() {
    try {
        const response = await fetch('https://api.github.com/users/De4thC0re/repos?per_page=100');
        const data = await response.json();
        const totalRepos = data.length; // tylko publiczne repo
        animateCounter('projects-count', totalRepos);
    } catch (error) {
        console.error('Błąd pobierania repo:', error);
        document.getElementById('projects-count').textContent = '0';
    }
}

// Uruchamiamy pobieranie po załadowaniu strony
window.addEventListener('DOMContentLoaded', fetchRepos);