// Liczniki animowane
function animateCounter(id, target) {
    let count = 0;
    const el = document.getElementById(id);
    const increment = target / 100; // proste przyspieszenie
    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        el.textContent = Math.floor(count);
    }, 20);
}

animateCounter('projects-count', 12);
animateCounter('hours-count', 350);
animateCounter('commits-count', 420);