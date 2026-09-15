const c = document.getElementById('bg');
const ctx = c.getContext('2d');
const dpr = Math.min(window.devicePixelRatio || 1, 2);
let w, h, particles;

function resize() {
  w = c.width = innerWidth * dpr;
  h = c.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  particles = Array.from({ length: 16 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    r: Math.random() * 1.8 + 0.8,
  }));

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(248, 113, 113, 0.12)';
}

function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.strokeStyle = 'rgba(248, 113, 113, 0.12)';

  for (let x = 0; x <= innerWidth; x += 70) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, innerHeight);
    ctx.stroke();
  }

  for (let y = 0; y <= innerHeight; y += 70) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(innerWidth, y);
    ctx.stroke();
  }

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -10 || p.x > innerWidth + 10) p.vx *= -1;
    if (p.y < -10 || p.y > innerHeight + 10) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(251, 113, 133, 0.9)';
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

resize();
draw();
addEventListener('resize', resize);
