const log = document.getElementById('output-log');
const finalShock = document.getElementById('final-shock');
const terminal = document.getElementById('terminal');
const blackout = document.getElementById('blackout');
const overlay = document.getElementById('overlay');

let userData = { ip: "192.168.1.104", city: "UNKNOWN_SECTOR" };

// Fetch Location
async function fetchTargetInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        userData.ip = data.ip || "103.10.235.1";
        userData.city = (data.city || "ITAHARI").toUpperCase();
    } catch (e) {
        userData.ip = "103.1.2.3";
        userData.city = "LOCAL_NODE";
    }
}

const tasks = [
    { msg: "> BYPASSING FIREWALL...", time: 2000, type: 'text' },
    { msg: "> PROCESSING LOCAL DATA...", time: 5000, type: 'progress' },
    { msg: "> DEBUGGING CAMERA HARDWARE...", time: 3000, type: 'hex' },
    { msg: "> EXTRACTING PRIVATE KEYS...", time: 3000, type: 'hex' },
    { msg: "> UPLOADING TO REMOTE HOST...", time: 5000, type: 'progress' }
];

async function startHacking() {
    overlay.classList.add('hidden');
    fetchTargetInfo();

    for (let task of tasks) {
        addLog(task.msg, 'system-msg');
        if (task.type === 'progress') await showProgress(task.time);
        else if (task.type === 'hex') await showHexRain(task.time);
        else await new Promise(r => setTimeout(r, task.time));
        addLog("OK.", 'success');
    }

    triggerShock();
}

function triggerShock() {
    terminal.classList.add('hidden');
    
    document.getElementById('alert-content').innerHTML = `
        <p>CRITICAL BREACH: CAMERA_STREAM_ACTIVE</p>
        <p>TARGET_IP: ${userData.ip}</p>
        <p>LOCATION: ${userData.city}_SECTOR</p>
        <div id="countdown-container">
            <p class="blink">SYSTEM WIPE INITIATED IN:</p>
            <div id="timer">10</div>
        </div>
    `;
    
    finalShock.classList.remove('hidden');
    
    let timeLeft = 10;
    const timerElement = document.getElementById('timer');
    
    const countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            blackout.classList.remove('hidden');
        }
    }, 1000);
}

function addLog(text, className) {
    const div = document.createElement('div');
    div.className = className;
    div.innerText = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

function showProgress(duration) {
    return new Promise(resolve => {
        let p = document.createElement('div');
        p.className = 'progress-line';
        log.appendChild(p);
        let count = 0;
        let int = setInterval(() => {
            count += 4;
            p.innerText = '[${"#".repeat(count/5)}${"-".repeat(20-count/5)}] ${count}%';
            if (count >= 100) { clearInterval(int); resolve(); }
        }, duration / 25);
    });
}

function showHexRain(duration) {
    return new Promise(resolve => {
        let end = Date.now() + duration;
        let int = setInterval(() => {
            let hex = Array.from({length: 12}, () => Math.floor(Math.random()*16).toString(16)).join('');
            addLog('0x${hex.toUpperCase()} ... SECURE', 'progress-line');
            if (Date.now() > end) { clearInterval(int); resolve(); }
        }, 70);
    });
}

// Clock Update
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}, 1000);

// Matrix Bg
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const drops = Array(Math.floor(canvas.width/10)).fill(1);
function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#0f0";
    drops.forEach((y, i) => {
        ctx.fillText(String.fromCharCode(Math.random()*128), i*10, y*10);
        if(y*10 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(draw, 33);

const countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            blackout.classList.remove('hidden'); // This reveals the Nepali message
        }
    }, 1000);