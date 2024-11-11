const featureCards = document.querySelectorAll('.feature-card');
const featureCardsContainer = document.querySelector('.feature-cards');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        featureCardsContainer.classList.add('blur'); // Add blur class when hovering a card
    });

    card.addEventListener('mouseleave', () => {
        featureCardsContainer.classList.remove('blur'); // Remove blur class when no card is hovered
    });
});




// -- custom cursor script, stolen from some furrys website but modded so much he probably wouldnt even recognize it -- \\


function addHoverEffects() {
    const elements = [
        ...document.querySelectorAll('.button'),
        document.getElementById('nav-lnk')
    ];

    elements.forEach(el => {
        el.addEventListener('mouseover', () => {
            console.log("enter")
            document.querySelector('.cursor').classList.add('hover');
            document.querySelector('.cursor-inner').classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            document.querySelector('.cursor').classList.remove('hover');
            document.querySelector('.cursor-inner').classList.remove('hover');
        });
    });
}




let cursor = document.querySelector('.cursor');
let cursorInner = document.querySelector('.cursor-inner');
let tE = false;
let sT = null;
let iCP = { x: 0, y: 0 };
let tP = { x: 0, y: 0 };
let lastScrollY = window.scrollY; 



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

console.log("what are you doing snooping around in here?")  // fake1!!11
// Tooltip functions, not sure what its for i didnt steal the tooltip thing from him just the cursor :sob:
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
        ...document.getElementById('nav-lnk'),
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
        
        Dot.prototype.draw = function() {
            this.node.style.left = this.x + "px";
            this.node.style.top = this.y + "px";
        };
        
        // creates the Dot objects, populates the dots array
        for (var i = 0; i < amnt; i++) {
            var d = new Dot();
            dots.push(d);
        }
        
        // this is the screen redraw function
        function draw() {
            var x = mouse.x,
                y = mouse.y;
        
            // this loop is where all the magic happens :100:
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
            mouse.x = event.pageX - 3;  // it looked off center :sob:
            mouse.y = event.pageY; 
        });
        
        // update mouse when scroll, i had to add this myself because whoever made this was a dumbass
        let lastScrollY2 = window.scrollY;
        window.addEventListener('scroll', () => {
            const scrollDiff = window.scrollY - lastScrollY2;
            lastScrollY2 = window.scrollY;
        
            mouse.y += scrollDiff;
            draw(); // re-draw it to update
        });
        
        function animate() {
            draw();
            requestAnimationFrame(animate);
        }
        
        animate();
