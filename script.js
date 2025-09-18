window.addEventListener('load', ()=>{
    setTimeout(()=>{
        const loader = document.getElementById('loader');
        loader.classList.add('hide');
        setTimeout(()=>{
            document.getElementById('content').style.display='block';
            startTyping();
        },1000);
    },2000);
});

const terminalEl = document.getElementById('terminal');
const cursor = document.createElement('span');
cursor.className='cursor';
terminalEl.appendChild(cursor);

// particles
for(let i=0;i<50;i++){
    const p=document.createElement('div');
    p.className='particle';
    p.style.left=Math.random()*100+'%';
    p.style.top=Math.random()*100+'%';
    p.style.animationDuration=(Math.random()*3+2)+'s';
    p.style.width=p.style.height=(Math.random()*3+1)+'px';
    terminalEl.appendChild(p);
}

// kod w terminalu
const codeLines=[
    "console.log('Witaj, Świecie');",
    "function add(a,b){",
    "  return a+b;",
    "}",
    "console.log(add(5,7));",
    "let x=10;",
    "x+=5;",
    "console.log(x);"
];

let lineIndex=0;

function typeLine(line,callback){
    let charIndex=0;
    cursor.style.display='none';
    const interval=setInterval(()=>{
        terminalEl.innerHTML+=line[charIndex];
        charIndex++;
        if(charIndex===line.length){
            clearInterval(interval);
            terminalEl.innerHTML+="<br>";
            cursor.style.display='inline-block';
            if(callback) callback();
        }
    },50);
}

function typeNextLine(){
    if(lineIndex<codeLines.length){
        typeLine(codeLines[lineIndex],()=>{
            lineIndex++;
            setTimeout(typeNextLine,600);
        });
    }
}

function startTyping(){
    lineIndex=0;
    terminalEl.innerHTML="";
    terminalEl.appendChild(cursor);
    typeNextLine();
}