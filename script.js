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

const username = 'de4thc0re';
let allCodeLines = [];

async function fetchGitHubStats(){
    try {
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await reposRes.json();
        animateCounter(document.getElementById('repos'), repos.length);

        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const user = await userRes.json();
        animateCounter(document.getElementById('followers'), user.followers);

        let totalCommits = 0;
        let totalLines = 0;

        for(let repo of repos){
            const commitsRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`);
            const linkHeader = commitsRes.headers.get('Link');
            let commitsCount = 0;
            if(linkHeader){
                const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
                if(match) commitsCount = parseInt(match[1]);
            } else {
                const commits = await commitsRes.json();
                commitsCount = commits.length;
            }
            totalCommits += commitsCount;

            const contentsRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/contents`);
            const files = await contentsRes.json();
            for(let file of files){
                if(file.type === 'file'){
                    const text = await fetch(file.download_url).then(r=>r.text());
                    const lines = text.split('\n');
                    totalLines += lines.length;
                    allCodeLines.push(...lines);
                }
            }
        }

        animateCounter(document.getElementById('commits'), totalCommits);
        animateCounter(document.getElementById('lines'), totalLines);

    } catch(e){
        animateCounter(document.getElementById('commits'), 523);
        animateCounter(document.getElementById('repos'), 12);
        animateCounter(document.getElementById('followers'), 42);
        animateCounter(document.getElementById('lines'), 1024);
        allCodeLines = [
            "console.log('Witaj, Świecie');",
            "let x = 10;",
            "x += 5;",
            "console.log(x);"
        ];
    }
}

function animateCounter(el, target){
    el.innerText = '0';
    const update = ()=>{
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

const terminalEl = document.getElementById('terminal');
const cursor = document.createElement('span');
cursor.className='cursor';
terminalEl.appendChild(cursor);

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
    },30);
}

function typeNextLine(){
    if(allCodeLines.length === 0) return;
    const line = allCodeLines[Math.floor(Math.random() * allCodeLines.length)];
    typeLine(line, ()=>{
        setTimeout(typeNextLine, 400);
    });
}

function startTyping(){
    terminalEl.innerHTML = '';
    terminalEl.appendChild(cursor);
    typeNextLine();
}

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