/* --- VARIABLES FOR CACHING (PERFORMANCE FIX) --- */
let primaryColor, textColor, lineColor;
const canvas = document.getElementById("neuro");
const ctx = canvas.getContext("2d");
let w, h;
let particles = [];
const particleCount = 50; 
const connectionDist = 150;

/* --- 1. INTRO ANIMATION --- */
const greetings = ["Namaste 🙏", "Namaskara 📻", "Vanakkam 🌼", "Sat Sri Akal 👳", "Welcome 🚀"];
const textEl = document.getElementById('greeting');
const overlay = document.getElementById('intro-overlay');
let i = 0;

const introInterval = setInterval(() => {
  textEl.style.opacity = '0';
  setTimeout(() => {
    textEl.innerText = greetings[i];
    textEl.style.opacity = '1';
    i++;
    if (i >= greetings.length) {
      clearInterval(introInterval);
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 800);
      }, 1000);
    }
  }, 200);
}, 600);

/* --- 2. CURSOR LOGIC --- */
const cursor = document.getElementById('cursor');
const hoverTargets = document.querySelectorAll('.hover-target');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

/* --- 3. SPOTLIGHT CARD EFFECT --- */
document.getElementById('cards-container').onmousemove = e => {
  for(const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

/* --- 4. AUTO-CYCLE HERO TEXT (NO SCROLL HOLD) --- */
const dynamicText = document.getElementById('dynamic-text');
const phrases = ["Reality.", "Prototypes.", "Innovation."];
let phraseIndex = 0;

setInterval(() => {
  dynamicText.style.opacity = '0'; // Fade out
  setTimeout(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    dynamicText.innerText = phrases[phraseIndex];
    dynamicText.style.opacity = '1'; // Fade in
  }, 500); 
}, 3000); // Change every 3 seconds

/* --- 5. THEME TOGGLE & COLOR UPDATE --- */
function updateColors() {
  const style = getComputedStyle(document.body);
  primaryColor = style.getPropertyValue('--primary');
  textColor = style.getPropertyValue('--text-muted');
  lineColor = style.getPropertyValue('--line-color');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
  updateColors(); // Update canvas colors immediately
}

/* --- 6. CANVAS PARTICLES --- */
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();
updateColors(); // Initialize colors

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if(this.x < 0 || this.x > w) this.vx *= -1;
    if(this.y < 0 || this.y > h) this.vy *= -1;
  }
  draw() {
    ctx.fillStyle = primaryColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for(let i=0; i<particleCount; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, w, h);
  
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    for(let j=index; j<particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if(dist < connectionDist) {
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.0; 
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();