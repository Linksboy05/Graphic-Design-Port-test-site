// CONTACT FORM ALERT
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thanks! Your message has been sent.");
});

// =============================
// 🌌 STARFIELD ANIMATION (Bright, Smooth, Warp Intro)
// =============================
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 400;
let centerX, centerY;
let mouseX = 0;
let mouseY = 0;
let warpProgress = 0;
let isWarping = true;

// Resize handling
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.getElementById("hero").offsetHeight;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create stars
function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: (Math.random() - 0.5) * canvas.width * 2,
      y: (Math.random() - 0.5) * canvas.height * 2,
      z: Math.random() * canvas.width,
      speed: 0.5 + Math.random() * 2.5,
      size: 0.8 + Math.random() * 1.6,
      colorShift: Math.random(),
    });
  }
}
createStars();

// Mouse parallax
window.addEventListener("mousemove", (e) => {
  const percentX = (e.clientX / window.innerWidth - 0.5) * 2;
  const percentY = (e.clientY / window.innerHeight - 0.5) * 2;
  mouseX = percentX * 50;
  mouseY = percentY * 50;
});

// Animation loop
function animateStars() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (isWarping) {
    warpProgress += 0.02;
    if (warpProgress >= 1) {
      warpProgress = 1;
      isWarping = false;
    }
  }

  for (let star of stars) {
    star.z -= star.speed;

    if (star.z <= 0) {
      star.x = (Math.random() - 0.5) * canvas.width * 2;
      star.y = (Math.random() - 0.5) * canvas.height * 2;
      star.z = canvas.width;
    }

    // Warp effect: zoom outward from center on load
    const warpScale = isWarping ? (1 + (1 - warpProgress) * 8) : 1;
    let scale = 200 / (star.z / warpScale);

    const x = star.x * scale + centerX + mouseX * (star.z / canvas.width);
    const y = star.y * scale + centerY + mouseY * (star.z / canvas.width);

    const hue = 260 + star.colorShift * 40;
    const opacity = 0.9;

    ctx.fillStyle = `hsla(${hue}, 100%, 85%, ${opacity})`;
    ctx.shadowBlur = 15 + star.size * 5;
    ctx.shadowColor = `hsla(${hue}, 100%, 80%, ${opacity})`;

    ctx.beginPath();
    ctx.arc(x, y, star.size * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animateStars);
}

animateStars();


const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

