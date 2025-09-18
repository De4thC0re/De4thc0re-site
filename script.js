// Licznik projektów z GitHub
const projectsEl = document.getElementById('projects');
const githubUsername = 'De4thC0re';

async function getProjectsCount() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        const data = await response.json();

        const totalProjects = data.length;

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

// Terminal z losowym kodem
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
const speed = 600; // 0.6 sekundy

function addRandomLine() {
  const line = codeLines[Math.floor(Math.random() * codeLines.length)];
  const p = document.createElement('p');
  p.textContent = line;
  terminalEl.appendChild(p);
  lineCount++;

  if(lineCount >= maxLinesBeforeClear){
    setTimeout(() => {
      terminalEl.innerHTML = '';
      lineCount = 0;
    }, speed);
  }

  setTimeout(addRandomLine, speed);
}

addRandomLine();