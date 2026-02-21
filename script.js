// =============================
// CONTACT FORM HANDLING
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      // Form will be submitted to FormSubmit automatically
      // Show user feedback
      const btn = this.querySelector('.btn');
      const originalText = btn.textContent;
      btn.textContent = "Sending...";
      btn.disabled = true;
      
      // After submission, form will redirect and page will refresh
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 3000);
    });
  }

  // =============================
  // STARFIELD ANIMATION
  // =============================
  const canvas = document.getElementById("starfield");
  if (canvas) {
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
      const heroSection = document.getElementById("hero");
      canvas.height = heroSection ? heroSection.offsetHeight : window.innerHeight;
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
  }

  // =============================
  // HAMBURGER MENU TOGGLE
  // =============================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    // Toggle menu open/close
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
});

// =============================
// FEATURED WORK SLIDER
// =============================
let slideIndex = 1;
let slideTimer = null;

function showSlides(n) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[slideIndex - 1].classList.add('active');
  dots[slideIndex - 1].classList.add('active');
}

function currentSlide(n) {
  slideIndex = n;
  clearTimeout(slideTimer);
  showSlides(slideIndex);
  startAutoSlide();
}

function nextSlide() {
  slideIndex++;
  clearTimeout(slideTimer);
  showSlides(slideIndex);
  startAutoSlide();
}

function prevSlide() {
  slideIndex--;
  clearTimeout(slideTimer);
  showSlides(slideIndex);
  startAutoSlide();
}

function startAutoSlide() {
  slideTimer = setTimeout(() => {
    slideIndex++;
    showSlides(slideIndex);
    startAutoSlide();
  }, 5000);
}

// Initialize slider on page load
if (document.querySelector('#featured')) {
  showSlides(slideIndex);
  startAutoSlide();
  
  // Button event listeners
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Pause on hover, resume on leave
  const slider = document.querySelector('.featured-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearTimeout(slideTimer));
    slider.addEventListener('mouseleave', startAutoSlide);
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
}
