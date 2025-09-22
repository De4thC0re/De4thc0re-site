window.addEventListener('load', ()=>{
    setTimeout(()=>{
        document.getElementById('loader').classList.add('hide');
        setTimeout(()=>{
            document.getElementById('content').style.display='block';
            fetchGitHubStats();
            startTyping();
        },800);
    },1200);
});

const username = 'de4thc0re';
let allCodeLines = [];

async function fetchGitHubStats() {
    try {
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await reposRes.json();
        animateCounter(document.getElementById('repos'), repos.length, 50);

        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const user = await userRes.json();
        animateCounter(document.getElementById('followers'), user.followers, 30);

        let totalCommits = 0;
        let totalLines = 0;

        for (let repo of repos) {
            try {
                const branch = repo.default_branch;
                const commitsRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?sha=${branch}&per_page=100`);
                const commits = await commitsRes.json();
                totalCommits += commits.length;

                totalLines += await countLinesRecursive(username, repo.name);
            } catch (e) {
                console.warn('Błąd repo', repo.name, e);
            }
        }

        animateCounter(document.getElementById('commits'), totalCommits, 10);
        animateCounter(document.getElementById('lines'), totalLines, 5);

    } catch (e) {
        console.error('Błąd GitHub API', e);
    }
}

async function countLinesRecursive(owner, repo, path='') {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
    const items = await res.json();
    let lines = 0;

    for (let item of items) {
        if (item.type === 'file' && /\.(js|ts|java|py|html|css)$/i.test(item.name)) {
            const text = await fetch(item.download_url).then(r=>r.text());
            const fileLines = text.split('\n').filter(l => l.trim() !== '');
            lines += fileLines.length;
            allCodeLines.push(...fileLines);
        } else if (item.type === 'dir' && !/(node_modules|dist|build)/i.test(item.name)) {
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

let typing = false;

function startTyping() {
    terminalEl.innerHTML = '';
    terminalEl.appendChild(cursor);
    typeNextLine();
}

function typeLine(line, callback){
    let charIndex = 0;
    cursor.style.display = 'none';
    const interval = setInterval(()=>{
        terminalEl.innerHTML += line[charIndex];
        charIndex++;
        if(charIndex === line.length){
            clearInterval(interval);
            terminalEl.innerHTML += "<br>";
            cursor.style.display = 'inline-block';
            if(callback) callback();
        }
    }, 30);
}

function typeNextLine(){
    if(typing) return;
    if(allCodeLines.length === 0) return;
    typing = true;
    const line = allCodeLines[Math.floor(Math.random() * allCodeLines.length)];
    typeLine(line, ()=>{
        typing = false;
        if(terminalEl.children.length > 50){
            terminalEl.removeChild(terminalEl.children[0]);
        }
        setTimeout(typeNextLine, 400);
    });
}