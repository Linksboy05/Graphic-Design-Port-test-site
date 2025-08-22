document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Thanks! Your message has been sent.");
});

// STARFIELD
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 200;
let centerX, centerY;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.getElementById("hero").offsetHeight;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: (Math.random() - 0.5) * canvas.width,
    y: (Math.random() - 0.5) * canvas.height,
    z: Math.random() * canvas.width,
    size: Math.random() * 2,
    twinkle: Math.random()
  });
}

function animateStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    star.z -= 2;
    if (star.z <= 0) {
      star.x = (Math.random() - 0.5) * canvas.width;
      star.y = (Math.random() - 0.5) * canvas.height;
      star.z = canvas.width;
    }

    let scale = 200 / star.z;
    let x = star.x * scale + centerX;
    let y = star.y * scale + centerY;

    let brightness = 0.7 + Math.sin(Date.now() * 0.002 + star.twinkle * 10) * 0.3;

    ctx.fillStyle = `rgba(166, 77, 255, ${brightness + 0.3 })`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#a64dff";

    ctx.beginPath();
    ctx.arc(x, y, star.size * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animateStars);
}
animateStars();
