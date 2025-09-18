// Loader na 2 sekundy
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 2000);
});

// Terminal
const terminalEl = document.getElementById('terminal');
const codeLines = [
  "console.log('Hello World');",
  "let x = 42;",
  "function sum(a, b) { return a + b; }",
  "const projects = fetchProjects();",
  "for(let i=0; i<10; i++){console.log(i);}",
  "import React from 'react';",
  "if(user.isActive){run();}",
  "while(true){doSomething();}",
  "git commit -m 'Initial commit'",
  "fetch('https://api.github.com/users/De4thC0re')",
  "let score = 0;"
];

let lineCount = 0;
const maxLinesBeforeClear = 10;
const speed = 300;
let cursor = document.createElement('span');
cursor.className = 'cursor';

function addRandomLine() {
  if(terminalEl.lastChild) terminalEl.lastChild.removeChild(cursor);

  const line = codeLines[Math.floor(Math.random() * codeLines.length)];
  const p = document.createElement('p');
  p.textContent = line;
  terminalEl.appendChild(p);
  p.appendChild(cursor);
  lineCount++;

  if(lineCount >= maxLinesBeforeClear){
    setTimeout(() => {
      terminalEl.innerHTML = '';
      lineCount = 0;
      terminalEl.appendChild(cursor);
    }, speed);
  }

  setTimeout(addRandomLine, speed);
}

addRandomLine();

// Particle background
for(let i=0;i<50;i++){
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random()*3+2) + 's';
    particle.style.width = particle.style.height = (Math.random()*3+1) + 'px';
    terminalEl.appendChild(particle);
}