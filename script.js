// Loader
window.addEventListener('load', ()=>{
    setTimeout(()=>{
        document.getElementById('loader').classList.add('hide');
        setTimeout(()=>{
            document.getElementById('content').style.display='block';
            animateCounters();
            initParticles();
        },1000);
    },1500);
});

// Animowane liczniki (możesz podmienić na API)
function animateCounters() {
    const counters = [
        {el: document.getElementById('commits'), target: 523},
        {el: document.getElementById('repos'), target: 12},
        {el: document.getElementById('followers'), target: 42}
    ];
    counters.forEach(counter => {
        counter.el.innerText = '0';
        const update = () => {
            const current = +counter.el.innerText;
            const increment = counter.target / 100;
            if(current < counter.target){
                counter.el.innerText = `${Math.ceil(current + increment)}`;
                setTimeout(update, 20);
            } else {
                counter.el.innerText = counter.target;
            }
        };
        update();
    });
}

// Proste particles
function initParticles(){
    const container = document.getElementById('particles');
    for(let i=0;i<50;i++){
        const p = document.createElement('div');
        p.className='particle';
        p.style.left=Math.random()*100+'%';
        p.style.top=Math.random()*100+'%';
        p.style.width=p.style.height=(Math.random()*3+1)+'px';
        p.style.animationDuration=(Math.random()*3+2)+'s';
        container.appendChild(p);
    }
}

// --- opcjonalnie: dynamiczne pobieranie danych z GitHub API ---
/*
fetch('https://api.github.com/users/twojNick')
  .then(res => res.json())
  .then(data => {
      document.getElementById('repos').dataset.target = data.public_repos;
      document.getElementById('followers').dataset.target = data.followers;
      animateCounters();
  });
*/