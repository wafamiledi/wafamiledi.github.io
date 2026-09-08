/* Circulations: seeded elliptical signals evoke information moving through an organisation. */
(() => {
  const host = document.getElementById("connection-art");
  if (!host || !window.p5) return;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = document.getElementById("art-toggle");
  let paused = false,
    visible = true,
    ready = false;
  const sketch = new p5((p) => {
    let signals = [],
      phase = 0;
    const seed = 2026;
    p.setup = () => {
      p.createCanvas(host.clientWidth, host.clientHeight).parent(host);
      p.pixelDensity(Math.min(devicePixelRatio || 1, 2));
      p.randomSeed(seed);
      p.noiseSeed(seed);
      p.frameRate(24);
      signals = Array.from({ length: 22 }, (_, i) => ({
        angle: p.random(p.TWO_PI),
        speed: p.random(0.001, 0.0025),
        band: i % 3,
      }));
      ready = true;
      toggle.hidden = false;
      sync();
    };
    p.draw = () => {
      p.clear();
      const cx = p.width * 0.51,
        cy = p.height * 0.49;
      p.push();
      p.translate(cx, cy);
      p.rotate(-0.2);
      for (let band = 0; band < 3; band++) {
        const rx = p.width * (0.42 + band * 0.037),
          ry = p.height * (0.43 + band * 0.018);
        p.noFill();
        p.stroke(212, 183, 130, 30 + band * 9);
        p.strokeWeight(0.75);
        p.beginShape();
        for (let j = 0; j <= 180; j++) {
          const a = (j / 180) * p.TWO_PI;
          const ripple =
            (p.noise(Math.cos(a) + 2, Math.sin(a) + 2, band) - 0.5) * 8;
          p.vertex(Math.cos(a) * (rx + ripple), Math.sin(a) * (ry + ripple));
        }
        p.endShape();
      }
      p.noStroke();
      for (const s of signals) {
        const a = s.angle + phase * s.speed;
        p.fill(212, 183, 130, 110);
        p.circle(
          Math.cos(a) * p.width * (0.42 + s.band * 0.037),
          Math.sin(a) * p.height * (0.43 + s.band * 0.018),
          s.band === 0 ? 3 : 2,
        );
      }
      p.pop();
      if (!paused && !motion.matches) phase++;
    };
    p.windowResized = () => {
      p.resizeCanvas(host.clientWidth, host.clientHeight);
      if (!p.isLooping()) p.redraw();
    };
  }, host);
  function sync() {
    if (!ready) return;
    const stopped = paused || motion.matches;
    if (stopped || !visible || document.hidden) {
      sketch.noLoop();
      sketch.redraw();
    } else sketch.loop();
    toggle.textContent = motion.matches
      ? "Animation réduite"
      : paused
        ? "Reprendre l’animation"
        : "Mettre l’animation en pause";
    toggle.disabled = motion.matches;
    toggle.setAttribute("aria-pressed", String(stopped));
  }
  toggle.addEventListener("click", () => {
    paused = !paused;
    sync();
  });
  motion.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    sync();
  }).observe(host);
})();
