/* Greetings */
const greetings = [
  "Namaste 🙏",
  "Namaskara 🌼",
  "Vanakkam 🌸",
  "Sat Sri Akal ✨",
  "Welcome 🚀"
];

const greetingEl = document.getElementById("greeting");
const overlay = document.getElementById("intro-overlay");
let index = 0;

const interval = setInterval(() => {
  greetingEl.textContent = greetings[index++];
  if (index === greetings.length) {
    clearInterval(interval);
    setTimeout(() => overlay.style.display = "none", 800);
  }
}, 600);

/* Cursor */
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* Hero Text Cycle */
const phrases = ["Takes Shape.", "Becomes Real.", "Comes Alive."];
const dynamicText = document.getElementById("dynamic-text");
let p = 0;

setInterval(() => {
  dynamicText.style.opacity = 0;
  setTimeout(() => {
    p = (p + 1) % phrases.length;
    dynamicText.textContent = phrases[p];
    dynamicText.style.opacity = 1;
  }, 400);
}, 2800);

/* Theme Toggle */
function toggleTheme() {
  const html = document.documentElement;
  html.setAttribute(
    "data-theme",
    html.getAttribute("data-theme") === "light" ? "dark" : "light"
  );
}

/* Canvas Particles (Lightweight) */
const canvas = document.getElementById("neuro");
const ctx = canvas.getContext("2d");
let w, h;
const particles = Array.from({ length: 40 }, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4
}));

function resize() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
window.addEventListener("resize", resize);
resize();

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#6366f1";
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
