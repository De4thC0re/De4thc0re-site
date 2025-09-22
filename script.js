// Loader
window.addEventListener('load', ()=>{
    setTimeout(()=>{
        document.getElementById('loader').classList.add('hide');
        setTimeout(()=>{
            document.getElementById('content').style.display='block';
            fetchGitHubStats();
            startTyping();
            initParticles();
        },1000);
    },1500);
});

// Animowane liczniki z GitHub API
function fetchGitHubStats(){
    const username = 'de4thc0re'; // <-- wpisz swój nick GitHub
    fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(data => {
            animateCounter(document.getElementById('repos'), data.public_repos);
            animateCounter(document.getElementById('followers'), data.followers);
            animateCounter(document.getElementById('commits'), 523); // statycznie, bo commits wymagają innego endpointu
        });
}

function animateCounter(el, target){
    el.innerText = '0';
    const update = () => {
        const current = +el.innerText;
        const increment = target / 100;
        if(current < target){
            el.innerText = `${Math.ceil(current + increment)}`;
            setTimeout(update, 20);
        } else {
            el.innerText = target;
        }
    };
    update();
}

// Terminal z losowym kodem
const terminalEl = document.getElementById('terminal');
const cursor = document.createElement('span');
cursor.className='cursor';
terminalEl.appendChild(cursor);

const codeLines = [
    "console.log('Witaj, Świecie');",
    "function add(a,b){",
    "  return a+b;",
    "}",
    "console.log(add(5,7));",
    "let x = 10;",
    "x += 5;",
    "console.log(x);",
    "const hello = name => `Cześć, ${name}!`;",
    "console.log(hello('De4thC0re'));"
];

let lineIndex = 0;

function typeLine(line, callback){
    let charIndex = 0;
    cursor.style.display='none';
    const interval = setInterval(()=>{
        terminalEl.innerHTML += line[charIndex];
        charIndex++;
        if(charIndex === line.length){
            clearInterval(interval);
            terminalEl.innerHTML += "<br>";
            cursor.style.display='inline-block';
            if(callback) callback();
        }
    },50);
}

function typeNextLine(){
    if(lineIndex < codeLines.length){
        typeLine(codeLines[lineIndex], ()=>{
            lineIndex++;
            setTimeout(typeNextLine, 600);
        });
    } else {
        setTimeout(()=>{
            terminalEl.innerHTML = '';
            lineIndex = 0;
            typeNextLine();
        }, 2000);
    }
}

function startTyping(){
    lineIndex = 0;
    terminalEl.innerHTML = '';
    terminalEl.appendChild(cursor);
    typeNextLine();
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