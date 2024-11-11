let cursor = document.querySelector('.cursor');
let cursorInner = document.querySelector('.cursor-inner');
let tE = false;
let sT = null;
let iCP = { x: 0, y: 0 };
let tP = { x: 0, y: 0 };
let lastScrollY = window.scrollY;  // Track last known scroll position



// Update cursor position on mouse movement
document.addEventListener('mousemove', (e) => {
    tP.x = e.pageX;
    tP.y = e.pageY;
    updateCursorPosition();
});

// Update cursor position on scroll
window.addEventListener('scroll', () => {
    const scrollDiff = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;

    // Adjust the target position with the scroll difference
    tP.y += scrollDiff;
    updateCursorPosition();
});

// Helper function to update the cursor position
function updateCursorPosition() {
    cursor.style.left = `${tP.x}px`;
    cursor.style.top = `${tP.y}px`;
    cursorInner.style.left = `${tP.x}px`;
    cursorInner.style.top = `${tP.y}px`;
}

// Click and scroll effects
document.addEventListener('mousedown', () => {
    cursor.classList.add('clicked');
    cursorInner.classList.add('clicked');
});
document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicked');
    cursorInner.classList.remove('clicked');
});
document.addEventListener('wheel', () => {
    if (!tE) {
        cursor.classList.add('scroll');
        cursorInner.classList.add('scroll');
        clearTimeout(sT);
        sT = setTimeout(() => {
            cursor.classList.remove('scroll');
            cursorInner.classList.remove('scroll');
        }, 150);
    }
});

// Smoothly animate the inner cursor towards the target position
async function updateInnerCursor() {
    const dx = (tP.x - iCP.x) * 0.2;
    const dy = (tP.y - iCP.y) * 0.2;
    iCP.x += dx;
    iCP.y += dy;
    cursorInner.style.left = `${iCP.x}px`;
    cursorInner.style.top = `${iCP.y}px`;
    requestAnimationFrame(updateInnerCursor);
}
requestAnimationFrame(updateInnerCursor);

console.log("what are you doing snooping around in here?")
// Tooltip functions
function showTooltip(t) {
    cursor.classList.add('tooltip');
    cursor.innerHTML = t;
    tE = true;
}

function hideTooltip() {
    cursor.classList.remove('tooltip');
    cursor.innerHTML = '';
    tE = false;
    iCP = { x: tP.x, y: tP.y };
    updateCursorPosition();
}

function updateTooltip(t) {
    cursor.innerHTML = t;
}





function addHoverEffects() {
    const elements = [
        ...document.getElementById('id="nav-lnk" '),
        document.querySelectorAll('.cta-button')
    ];

    elements.forEach(el => {
        el.addEventListener('mouseover', () => {
            document.querySelector('.cursor').classList.add('hover');
            document.querySelector('.cursor-inner').classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            document.querySelector('.cursor').classList.remove('hover');
            document.querySelector('.cursor-inner').classList.remove('hover');
        });
    });
}
        
        
        // trail, shamelessly stolen from https://codepen.io/falldowngoboone/pen/PwzPYv
        let amnt = 12;
        var dots = [],
            mouse = {
                x: 0,
                y: 0
            };
        
        // The Dot object used to scaffold the dots
        var Dot = function() {
            this.x = 0;
            this.y = 0;
            this.node = (function(){
                var n = document.createElement("div");
                n.className = "trail";
                n.id = "trail-el";
                document.body.appendChild(n);
                return n;
            }());
        };
        
        // The Dot.prototype.draw() method sets the position of 
        // the object's <div> node
        Dot.prototype.draw = function() {
            this.node.style.left = this.x + "px";
            this.node.style.top = this.y + "px";
        };
        
        // Creates the Dot objects, populates the dots array
        for (var i = 0; i < amnt; i++) {
            var d = new Dot();
            dots.push(d);
        }
        
        // This is the screen redraw function
        function draw() {
            var x = mouse.x,
                y = mouse.y;
        
            // This loop is where all the 90s magic happens
            dots.forEach(function(dot, index, dots) {
                var nextDot = dots[index + 1] || dots[0];
        
                dot.x = x;
                dot.y = y;
                dot.draw();
                x += (nextDot.x - dot.x) * .6;
                y += (nextDot.y - dot.y) * .6;
            });
        }
        
        addEventListener("mousemove", function(event) {
            mouse.x = event.pageX;
            mouse.y = event.pageY;
        });
        
        // Update mouse position on scroll to follow scroll offset
        let lastScrollY2 = window.scrollY;
        window.addEventListener('scroll', () => {
            const scrollDiff = window.scrollY - lastScrollY2;
            lastScrollY2 = window.scrollY;
        
            // Adjust the mouse position for scrolling
            mouse.y += scrollDiff;
            draw(); // Re-draw the trail to update the position immediately
        });
        
        // animate() calls draw() then recursively calls itself
        function animate() {
            draw();
            requestAnimationFrame(animate);
        }
        
        // And get it started by calling animate().
        animate();
