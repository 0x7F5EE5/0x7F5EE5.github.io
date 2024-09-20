let iCP = { x: 0, y: 0 };
let tP = { x: 0, y: 0 };
let tE = false;
let sT = null;

document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (!tE) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    } else {
        cursor.style.left = `${e.clientX + 80}px`;
        cursor.style.top = `${e.clientY + 40}px`;
    }
    tP.x = e.clientX;
    tP.y = e.clientY;
});

document.addEventListener("DOMContentLoaded", function() {
    var body = document.body;
    body.classList.add("hide-cursor");
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseover', () => {
        if (!tE) document.querySelector('.cursor').classList.add('hover');
        document.querySelector('.cursor-inner').classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        document.querySelector('.cursor').classList.remove('hover');
        document.querySelector('.cursor-inner').classList.remove('hover');
    });
});

document.addEventListener('wheel', () => {
    if (!tE) {
        document.querySelector('.cursor').classList.add('scroll');
        document.querySelector('.cursor-inner').classList.add('scroll');
        clearTimeout(sT);
        sT = setTimeout(() => {
            document.querySelector('.cursor').classList.remove('scroll');
            document.querySelector('.cursor-inner').classList.remove('scroll');
        }, 150);
    }
});

document.addEventListener('mousedown', () => {
    document.querySelector('.cursor').classList.add('clicked');
    document.querySelector('.cursor-inner').classList.add('clicked');
});

document.addEventListener('mouseup', () => {
    document.querySelector('.cursor').classList.remove('clicked');
    document.querySelector('.cursor-inner').classList.remove('clicked');
});

window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        iCP.y += 2;
    } else {
        iCP.y -= 2;
    }
});

async function updateInnerCursor() {
    const cursorInner = document.querySelector('.cursor-inner');
    const dx = (tP.x - iCP.x) * 0.2;
    const dy = (tP.y - iCP.y) * 0.2;
    iCP.x += dx;
    iCP.y += dy;
    cursorInner.style.left = `${iCP.x}px`;
    cursorInner.style.top = `${iCP.y}px`;
    requestAnimationFrame(updateInnerCursor);
}
requestAnimationFrame(updateInnerCursor);

function showTooltip(t) {
    const cursor = document.querySelector('.cursor');
    cursor.classList.add('tooltip');
    cursor.innerHTML = t;
    tE = true;
}

function hideTooltip() {
    const cursor = document.querySelector('.cursor');
    cursor.classList.remove('tooltip');
    cursor.innerHTML = '';
    tE = false;
    iCP = { x: tP.x, y: tP.y };
    cursor.style.left = `${tP.x}px`;
    cursor.style.top = `${tP.y}px`;
}

function updateTooltip(t) {
    const cursor = document.querySelector('.cursor');
    cursor.innerHTML = t;
}

function logVersion() {
    fetch('/api/version.json')
        .then(response => response.json())
        .then(data => console.log(`Cursor.js loaded with version ${data.version}`))
        .catch(error => console.error('Error fetching version:', error));
}

document.getElementById('downloadButton').addEventListener('click', function () {
    // Create an invisible link element
    const link = document.createElement('a');
    link.href = '/files/hub.html'; // Specify the file path on the server
    link.download = 'hub.html'; // Specify the name for the downloaded file

    // Simulate a click on the link
    document.body.appendChild(link);
    link.click();

    // Remove the link after the click otherdownload
    document.body.removeChild(link);
});

document.getElementById('otherdownload').addEventListener('click', function () {
    // Create an invisible link element
    const link = document.createElement('a');
    link.href = '/files/EaglercraftX_1.8.html'; // Specify the file path on the server
    link.download = 'EaglercraftX_1.8.html'; // Specify the name for the downloaded file

    // Simulate a click on the link
    document.body.appendChild(link);
    link.click();

    // Remove the link after the click otherdownload
    document.body.removeChild(link);
});

logVersion();
