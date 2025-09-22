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
const fallbackStats = {
    commits: 120,
    projects: 3,
    followers: 0,
    lines: 2011
};
let allCodeLines = [];

async function fetchGitHubStats(){
    try {
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await reposRes.json();
        animateCounter(document.getElementById('repos'), repos.length, 50);

        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const user = await userRes.json();
        animateCounter(document.getElementById('followers'), user.followers, 30);

        let totalCommits = 0;
        let totalLines = 0;

        for(let repo of repos){
            try{
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

                totalLines += await countLinesRecursive(username, repo.name);
            }catch(e){
                console.warn('Błąd w repo', repo.name, e);
            }
        }

        animateCounter(document.getElementById('commits'), totalCommits || fallbackStats.commits, 10);
        animateCounter(document.getElementById('lines'), totalLines || fallbackStats.lines, 5);

    } catch(e){
        console.warn('GitHub API error, używam fallback', e);
        animateCounter(document.getElementById('commits'), fallbackStats.commits, 10);
        animateCounter(document.getElementById('repos'), fallbackStats.projects, 50);
        animateCounter(document.getElementById('followers'), fallbackStats.followers, 30);
        animateCounter(document.getElementById('lines'), fallbackStats.lines, 5);
        allCodeLines = [
            "console.log('Hello World');",
            "let x = 10;",
            "x += 5;",
            "function add(a,b){ return a+b; }",
            "document.querySelector('h1').textContent = 'De4thC0re';",
            "for(let i=0;i<10;i++){ console.log(i); }"
        ];
    }
}

async function countLinesRecursive(owner, repo, path=''){
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
    const items = await res.json();
    let lines = 0;
    for(let item of items){
        if(item.type === 'file' && /\.(js|ts|java|py|html|css)$/i.test(item.name)){
            const text = await fetch(item.download_url).then(r=>r.text());
            const fileLines = text.split('\n');
            lines += fileLines.length;
            allCodeLines.push(...fileLines);
        } else if(item.type === 'dir' && !/(node_modules|dist|build)/i.test(item.name)){
            lines += await countLinesRecursive(owner, repo, item.path);
        }
    }
    return lines;
}

function animateCounter(el, target, speed){
    el.innerText = '0';
    const update = ()=>{
        const current = +el.innerText;
        const increment = Math.ceil(target / speed);
        if(current < target){
            el.innerText = Math.min(current + increment, target);
            setTimeout(update, 50);
        } else {
            el.innerText = target;
        }
    };
    update();
}

// Terminal
const terminalEl = document.getElementById('terminal');
const cursor = document.createElement('span');
cursor.className = 'cursor';
terminalEl.appendChild(cursor);

function startTyping(){
    terminalEl.innerHTML = '';
    terminalEl.appendChild(cursor);
    typeFetching();
}

function typeFetching(){
    const fetchingText = "Fetching code...";
    let charIndex = 0;
    cursor.style.display = 'none';
    const interval = setInterval(()=>{
        terminalEl.innerHTML += fetchingText[charIndex];
        charIndex++;
        if(charIndex === fetchingText.length){
            clearInterval(interval);
            terminalEl.innerHTML += "<br>";
            cursor.style.display = 'inline-block';
            setTimeout(typeNextLine, 800);
        }
    },50);
}

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

// Particles
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