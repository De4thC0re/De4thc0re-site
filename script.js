window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hide');
        setTimeout(() => {
            document.getElementById('content').style.display = 'block';
        }, 1000);
    }, 2000);
});

const terminalEl = document.getElementById('terminal');
const cursor = document.createElement('span');
cursor.className = 'cursor';
terminalEl.appendChild(cursor);

for(let i=0;i<50;i++){
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random()*3+2) + 's';
    particle.style.width = particle.style.height = (Math.random()*3+1) + 'px';
    terminalEl.appendChild(particle);
}