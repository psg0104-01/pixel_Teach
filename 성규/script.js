(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const COLORS = ['rgba(240,192,96,', 'rgba(56,232,208,', 'rgba(224,64,208,', 'rgba(180,180,255,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x     = Math.random() * W;
      this.y     = init ? Math.random() * H : H + 10;
      this.vx    = (Math.random() - 0.5) * 0.3;
      this.vy    = -(Math.random() * 0.5 + 0.15);
      this.r     = Math.random() * 1.5 + 0.4;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.life  = Math.random() * 200 + 100;
      this.age   = 0;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.age++;
      const ratio = this.age / this.life;
      this.currentAlpha = this.alpha * Math.sin(ratio * Math.PI);
      if (this.age >= this.life || this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.currentAlpha + ')';
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 70 }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
  loop();
})();

(function initScrollReveal() {
  const cards = document.querySelectorAll('.liquid-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.08 });
  cards.forEach(c => observer.observe(c));
})();

(function initTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const cards = document.querySelectorAll('.liquid-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform =
        `translateY(-6px) scale(1.01) perspective(800px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform   = '';
      card.style.transition  = 'transform 0.6s cubic-bezier(.22,1,.36,1)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s linear';
    });
  });
})();

(function initRipple() {
  const btn = document.querySelector('.cta-btn');
  if (!btn) return;
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    Object.assign(ripple.style, {
      position: 'absolute', width: size + 'px', height: size + 'px',
      left: (e.clientX - rect.left - size / 2) + 'px',
      top:  (e.clientY - rect.top  - size / 2) + 'px',
      background: 'rgba(255,255,255,0.18)', borderRadius: '50%',
      transform: 'scale(0)', animation: 'ripple-anim 0.7s linear',
      pointerEvents: 'none', zIndex: '2',
    });
    if (!document.getElementById('ripple-style')) {
      const s = document.createElement('style');
      s.id = 'ripple-style';
      s.textContent = '@keyframes ripple-anim{to{transform:scale(1);opacity:0}}';
      document.head.appendChild(s);
    }
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
})();

(function initReviews() {
  const COOLDOWN_KEY = 'shop_review_ts';
  const COOLDOWN_MS  = 60 * 60 * 1000;

  let pendingDeleteId = null;
  let selectedStar    = 0;

  const starBtns    = document.querySelectorAll('.star-btn');
  const nameInput   = document.getElementById('reviewName');
  const contentInput= document.getElementById('reviewContent');
  const submitBtn   = document.getElementById('reviewSubmit');
  const cooldownMsg = document.getElementById('cooldownMsg');
  const reviewsList = document.getElementById('reviewsList');
  const backdrop    = document.getElementById('pwdModalBackdrop');
  const pwdInput    = document.getElementById('pwdInput');
  const pwdCancel   = document.getElementById('pwdCancel');
  const pwdConfirm  = document.getElementById('pwdConfirm');
  const pwdErrorMsg = document.getElementById('pwdErrorMsg');

  function updateStars(val) {
    selectedStar = val;
    starBtns.forEach(b => b.classList.toggle('active', parseInt(b.dataset.star, 10) <= val));
  }

  starBtns.forEach(b => {
    b.addEventListener('click', () => updateStars(parseInt(b.dataset.star, 10)));
    b.addEventListener('mouseenter', () => {
      starBtns.forEach(s => s.classList.toggle(
        'active', parseInt(s.dataset.star, 10) <= parseInt(b.dataset.star, 10)
      ));
    });
  });

  document.getElementById('starRow').addEventListener('mouseleave', () => updateStars(selectedStar));

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function starsHtml(count) {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  }

  function formatDate(ts) {
    const d = new Date(ts);
    return (
      d.getFullYear() + '.' +
      String(d.getMonth() + 1).padStart(2, '0') + '.' +
      String(d.getDate()).padStart(2, '0') + ' ' +
      String(d.getHours()).padStart(2, '0') + ':' +
      String(d.getMinutes()).padStart(2, '0')
    );
  }

  function getInitial(name) {
    return (name || '?').trim().charAt(0) || '?';
  }

  function renderReviews(reviews) {
    if (!reviews.length) {
      reviewsList.innerHTML = '<p class="reviews-empty">아직 후기가 없습니다. 첫 번째 후기를 남겨보세요!</p>';
      return;
    }
    reviewsList.innerHTML = reviews.slice().reverse().map(r => `
      <div class="review-card" data-id="${escHtml(r.id)}">
        <div class="review-card-header">
          <div class="review-author-wrap">
            <div class="review-author-avatar">${escHtml(getInitial(r.name))}</div>
            <span class="review-author">${escHtml(r.name)}</span>
            <span class="review-stars">${starsHtml(r.star)}</span>
          </div>
          <div class="review-meta-right">
            <span class="review-date">${formatDate(r.ts)}</span>
            <button class="review-delete-btn" data-id="${escHtml(r.id)}" title="삭제">✕</button>
          </div>
        </div>
        <p class="review-content">${escHtml(r.content)}</p>
      </div>
    `).join('');

    reviewsList.querySelectorAll('.review-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        pendingDeleteId = btn.dataset.id;
        openPwdModal();
      });
    });
  }

  async function loadReviews() {
    try {
      const res  = await fetch('/api/reviews');
      const data = await res.json();
      renderReviews(data);
    } catch {
      reviewsList.innerHTML = '<p class="reviews-empty">후기를 불러오지 못했습니다.</p>';
    }
  }

  submitBtn.addEventListener('click', async () => {
    const name    = nameInput.value.trim();
    const content = contentInput.value.trim();
    cooldownMsg.textContent = '';

    if (!name)    { nameInput.focus(); return; }
    if (!selectedStar) { cooldownMsg.textContent = '평점을 선택해주세요'; return; }
    if (!content) { contentInput.focus(); return; }

    const now    = Date.now();
    const lastTs = parseInt(localStorage.getItem(COOLDOWN_KEY) || '0', 10);
    const diff   = now - lastTs;

    if (lastTs && diff < COOLDOWN_MS) {
      const remain = Math.ceil((COOLDOWN_MS - diff) / 60000);
      cooldownMsg.textContent = `${remain}분 후에 다시 작성할 수 있습니다`;
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '등록 중...';

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content, star: selectedStar }),
      });

      if (res.ok) {
        localStorage.setItem(COOLDOWN_KEY, String(now));
        nameInput.value    = '';
        contentInput.value = '';
        updateStars(0);
        await loadReviews();
      } else {
        cooldownMsg.textContent = '등록에 실패했습니다. 다시 시도해주세요';
      }
    } catch {
      cooldownMsg.textContent = '서버 연결 오류가 발생했습니다';
    }

    submitBtn.disabled  = false;
    submitBtn.textContent = '후기 남기기';
  });

  function openPwdModal() {
    pwdInput.value          = '';
    pwdInput.classList.remove('error');
    pwdErrorMsg.textContent = '';
    backdrop.classList.add('open');
    setTimeout(() => pwdInput.focus(), 80);
  }

  function closePwdModal() {
    backdrop.classList.remove('open');
    pendingDeleteId = null;
  }

  pwdCancel.addEventListener('click', closePwdModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closePwdModal(); });

  async function tryDelete() {
    const val = pwdInput.value;
    if (!val) { pwdInput.focus(); return; }

    try {
      const res = await fetch(`/api/reviews/${pendingDeleteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: val }),
      });

      if (res.ok) {
        closePwdModal();
        await loadReviews();
      } else {
        pwdInput.classList.add('error');
        pwdErrorMsg.textContent = '비밀번호가 틀렸습니다';
        pwdInput.value = '';
        setTimeout(() => pwdInput.classList.remove('error'), 400);
      }
    } catch {
      pwdErrorMsg.textContent = '서버 오류가 발생했습니다';
    }
  }

  pwdConfirm.addEventListener('click', tryDelete);
  pwdInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryDelete(); });

  loadReviews();
})();