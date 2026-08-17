// Access Config safely from window object or default
const birthdayConfig = window.birthdayConfig || {};

// Safe Confetti wrapper (works with CDN script or npm module)
const confetti = window.confetti || function (opts) {
  console.log('Confetti triggered', opts);
};

// ---------------------------------------------------------
// 🔊 Web Audio API Sound FX Synthesizer (Zero External Dependencies)
// ---------------------------------------------------------
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

const SoundFX = {
  // 1. เสียงคลิกเมนู / ปุ่มทั่วไป (Crisp Soft UI Click)
  click() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {}
  },

  // 2. เสียงเปิดดูรูปภาพ (Shimmer / Camera Chime)
  openPhoto() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.09, ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.04 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.04);
        osc.stop(ctx.currentTime + i * 0.04 + 0.22);
      });
    } catch (e) {}
  },

  // 3. เสียงปิดหน้าต่างรูปภาพ (Soft Close Pop)
  closePhoto() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  },

  // 4. เสียงตอบควิซถูก (Upbeat Success Chime)
  success() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 0.25);
      });
    } catch (e) {}
  },

  // 5. เสียงตอบควิซผิด (Gentle Buzzer)
  wrong() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(170, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch (e) {}
  },

  // 6. เสียงเปิดกล่องของขวัญ (Celebration Magic Fanfare)
  giftOpen() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + i * 0.05 + 0.35);
      });
    } catch (e) {}
  },

  // 7. เสียงส่งคำอธิษฐานสู่ดวงดาว (Celestial Shooting Star Harp)
  makeWish() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.4, ctx.currentTime + i * 0.06 + 0.4);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.45);
      });
    } catch (e) {}
  }
};

// State Management
let currentQuizIndex = 0;
let quizScore = 0;
let isAudioPlaying = false;
let isGiftOpened = false;

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  applyConfigData();
  setupEventListeners();
  simulateLoadingProcess();
});

// ---------------------------------------------------------
// 1️⃣ Ambient Particle Canvas (Floating Stars & Cyan Stardust)
// ---------------------------------------------------------
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const isCyan = Math.random() > 0.4;
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 1,
      color: isCyan ? 'rgba(0, 242, 254, ' : 'rgba(255, 215, 0, ',
      alpha: Math.random() * 0.7 + 0.2,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      isStar: Math.random() > 0.5,
    });
  }

  function drawStar(x, y, size, color) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(0, 0, size, 0);
    ctx.quadraticCurveTo(0, 0, 0, size);
    ctx.quadraticCurveTo(0, 0, -size, 0);
    ctx.quadraticCurveTo(0, 0, 0, -size);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < -10) p.y = canvas.height + 10;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      const fillStyle = p.color + p.alpha + ')';

      if (p.isStar) {
        drawStar(p.x, p.y, p.radius * 2.5, fillStyle);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// ---------------------------------------------------------
// 2️⃣ Apply Config Data to UI Elements
// ---------------------------------------------------------
function applyConfigData() {
  // Populate Welcome Screen
  const dateBadge = birthdayConfig.birthdayDate ? ` • ${birthdayConfig.birthdayDate}` : '';
  document.getElementById('welcome-badge').textContent = `${birthdayConfig.welcomeScreen.badge}${dateBadge}`;
  document.getElementById('welcome-title').textContent = birthdayConfig.welcomeScreen.title;
  document.getElementById('welcome-subtitle').textContent = birthdayConfig.welcomeScreen.subtitle;

  // Setup BGM Audio
  const audio = document.getElementById('bgm-player');
  audio.src = birthdayConfig.bgmUrl;

  // Render Story Timeline
  renderStoryTimeline();

  // Render Love Letter
  document.getElementById('letter-badge').textContent = birthdayConfig.letter.badge;
  document.getElementById('letter-title').textContent = `ถึง ${birthdayConfig.recipientName} 💌`;
  const letterBody = document.getElementById('letter-body');
  letterBody.innerHTML = birthdayConfig.letter.content.map((p) => `<p>${p}</p>`).join('');

  // Render Make a Wish Card
  if (birthdayConfig.makeWish) {
    document.getElementById('wish-title').textContent = birthdayConfig.makeWish.title;
    document.getElementById('wish-subtitle').textContent = birthdayConfig.makeWish.subtitle;
    document.getElementById('wish-input').placeholder = birthdayConfig.makeWish.placeholder;
    document.getElementById('send-wish-text').textContent = birthdayConfig.makeWish.buttonText;
    document.getElementById('wish-success-title').textContent = birthdayConfig.makeWish.successTitle;
    document.getElementById('wish-success-desc').textContent = birthdayConfig.makeWish.successDesc;
  }

  // Footer Name
  document.getElementById('sender-name-text').textContent = birthdayConfig.senderName;
}

// ---------------------------------------------------------
// 3️⃣ Simulated Loading Process
// ---------------------------------------------------------
function simulateLoadingProcess() {
  const fill = document.getElementById('loading-progress');
  const text = document.getElementById('loading-text');
  const startBtn = document.getElementById('start-btn');
  const startBtnText = document.getElementById('start-btn-text');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 25) + 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      fill.style.width = '100%';
      text.textContent = 'พร้อมเริ่มต้นการเดินทางแล้ว ✨ 100%';

      startBtn.classList.remove('disabled');
      startBtn.removeAttribute('disabled');
      startBtnText.textContent = birthdayConfig.welcomeScreen.buttonText;
    } else {
      fill.style.width = progress + '%';
      text.textContent = `กำลังเตรียมความทรงจำพิเศษ... ${progress}%`;
    }
  }, 300);
}

// ---------------------------------------------------------
// 4️⃣ Render Story Timeline Polaroid Cards
// ---------------------------------------------------------
function renderStoryTimeline() {
  const container = document.getElementById('timeline-container');
  container.innerHTML = birthdayConfig.storyTimeline
    .map((item, index) => {
      const rotation = (index % 2 === 0 ? 2 : -2) * (1 + (index % 3) * 0.5);
      return `
        <div class="polaroid-card" style="--rotation: ${rotation}deg;" data-id="${item.id}">
          <div class="polaroid-img-wrapper">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
            ${item.tag ? `<span class="polaroid-img-tag">#${item.tag}</span>` : ''}
          </div>
          <div class="polaroid-content">
            <div class="polaroid-meta">
              <span class="polaroid-date">${item.date}</span>
            </div>
            <h3 class="polaroid-title">${item.title}</h3>
            <p class="polaroid-desc">${item.description}</p>
          </div>
        </div>
      `;
    })
    .join('');

  // Add click handlers for Lightbox Preview
  document.querySelectorAll('.polaroid-card').forEach((card) => {
    card.addEventListener('click', () => {
      const itemId = parseInt(card.getAttribute('data-id'));
      const itemData = birthdayConfig.storyTimeline.find((t) => t.id === itemId);
      if (itemData) openLightbox(itemData);
    });
  });
}

// ---------------------------------------------------------
// 5️⃣ Lightbox Modal Logic with Sound FX
// ---------------------------------------------------------
function openLightbox(data) {
  SoundFX.openPhoto();
  const modal = document.getElementById('lightbox-modal');
  document.getElementById('lightbox-img').src = data.image;
  document.getElementById('lightbox-date').textContent = `${data.date}${data.tag ? ` • #${data.tag}` : ''}`;
  document.getElementById('lightbox-title').textContent = data.title;
  document.getElementById('lightbox-desc').textContent = data.description;
  modal.classList.remove('hidden');
}

function closeLightbox() {
  SoundFX.closePhoto();
  document.getElementById('lightbox-modal').classList.add('hidden');
}

// ---------------------------------------------------------
// 6️⃣ Quiz Section Logic with Sound FX
// ---------------------------------------------------------
function renderQuizQuestion() {
  const wrapper = document.getElementById('quiz-card-wrapper');
  const progressFill = document.getElementById('quiz-progress-fill');
  const totalQuestions = birthdayConfig.quiz.length;

  if (currentQuizIndex >= totalQuestions) {
    progressFill.style.width = '100%';
    wrapper.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0;">
        <span style="font-size: 3rem;">🎉🏆</span>
        <h3 style="font-size: 1.6rem; margin: 0.5rem 0; font-family: var(--font-title);">ภารกิจตอบควิซสำเร็จแล้ว!</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">คุณตอบถูกต้องครบทุกข้อ สมแล้วที่เป็นคนสำคัญที่สุด ✨</p>
        <button id="goto-gift-btn" class="glow-btn">
          <span>ไปรับของขวัญวันเกิด 🎁</span>
        </button>
      </div>
    `;
    document.getElementById('goto-gift-btn').addEventListener('click', () => {
      SoundFX.click();
      switchTab('section-gift');
    });
    return;
  }

  const q = birthdayConfig.quiz[currentQuizIndex];
  progressFill.style.width = `${((currentQuizIndex + 1) / totalQuestions) * 100}%`;

  wrapper.innerHTML = `
    <h3 class="quiz-question-title">${q.question}</h3>
    <div class="quiz-options-list">
      ${q.options
        .map(
          (opt, idx) => `
        <button class="option-btn" data-index="${idx}">
          <span>${opt}</span>
          <span class="option-indicator">⚪</span>
        </button>
      `
        )
        .join('')}
    </div>
    <div id="quiz-feedback-box"></div>
  `;

  // Attach option click handlers
  document.querySelectorAll('.option-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedIndex = parseInt(btn.getAttribute('data-index'));
      handleQuizAnswer(selectedIndex, q.correctIndex, q.successMessage);
    });
  });
}

function handleQuizAnswer(selectedIndex, correctIndex, successMessage) {
  const buttons = document.querySelectorAll('.option-btn');
  const feedbackBox = document.getElementById('quiz-feedback-box');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) {
      btn.classList.add('correct');
      btn.querySelector('.option-indicator').textContent = '✅';
    } else if (idx === selectedIndex) {
      btn.classList.add('wrong');
      btn.querySelector('.option-indicator').textContent = '❌';
    }
  });

  if (selectedIndex === correctIndex) {
    SoundFX.success();
    quizScore++;
    feedbackBox.className = 'quiz-feedback';
    feedbackBox.style.color = '#a7f3d0';
    feedbackBox.innerHTML = `✨ ${successMessage}`;
  } else {
    SoundFX.wrong();
    feedbackBox.className = 'quiz-feedback';
    feedbackBox.style.color = '#fecaca';
    feedbackBox.innerHTML = `😊 ไม่เป็นไรนะ! แต่คำตอบที่ถูกคือข้อ ${correctIndex + 1} จ้า ✨`;
  }

  setTimeout(() => {
    currentQuizIndex++;
    renderQuizQuestion();
  }, 2000);
}

// ---------------------------------------------------------
// 7️⃣ Gift Box & Fireworks Confetti with Sound FX
// ---------------------------------------------------------
function handleOpenGiftBox() {
  if (isGiftOpened) return;
  isGiftOpened = true;

  SoundFX.giftOpen();

  const giftBox = document.getElementById('gift-box');
  const revealedContainer = document.getElementById('revealed-gift-container');

  giftBox.classList.add('opened');

  // Trigger Multi-stage Fireworks Confetti Explosion
  triggerConfettiFireworks();

  setTimeout(() => {
    revealedContainer.classList.remove('hidden');
    revealedContainer.scrollIntoView({ behavior: 'smooth' });
  }, 800);
}

function triggerConfettiFireworks() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#00f2fe', '#ffd700', '#ffffff'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#00e676', '#8a2be2', '#4facfe'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#ffd700', '#00f2fe'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

// ---------------------------------------------------------
// 8️⃣ Make a Wish Interactive Animation & Email Dispatch
// ---------------------------------------------------------
function handleSendWish() {
  const input = document.getElementById('wish-input');
  const wishText = input.value.trim() || 'ขอให้ปีนี้มีความสุข สมหวังในทุกๆ เรื่อง ร่ำรวย และมีรอยยิ้มในทุกวัน ✨';

  // Sound FX: Celestial Harp
  SoundFX.makeWish();

  // Trigger Shooting Star Fireworks Confetti
  triggerWishStarsFireworks();

  // Save wish to local storage
  try {
    localStorage.setItem('hbd_user_wish', wishText);
  } catch (e) {}

  // Dispatch Email Notification asynchronously in background
  sendWishToEmail(wishText);

  // Update display
  document.getElementById('wish-display-text').textContent = wishText;

  // Transition to success card
  const inputWrapper = document.getElementById('wish-input-wrapper');
  const successWrapper = document.getElementById('wish-success-wrapper');

  inputWrapper.style.display = 'none';
  successWrapper.classList.remove('hidden');
}

function handleEditWish() {
  SoundFX.click();
  const inputWrapper = document.getElementById('wish-input-wrapper');
  const successWrapper = document.getElementById('wish-success-wrapper');

  successWrapper.classList.add('hidden');
  inputWrapper.style.display = 'block';
  document.getElementById('wish-input').focus();
}

async function sendWishToEmail(wishText) {
  const emailCfg = birthdayConfig.emailNotification;
  if (!emailCfg || !emailCfg.enabled) return;

  try {
    if (emailCfg.service === 'web3forms' && emailCfg.accessKey && emailCfg.accessKey !== 'YOUR_ACCESS_KEY_HERE') {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: emailCfg.accessKey,
          subject: `🌠 มีคำอธิษฐานวันเกิดใหม่จาก ${birthdayConfig.recipientName || 'เจ้าของวันเกิด'}!`,
          from_name: 'Birthday Web App 🎂',
          message: `คำอธิษฐานวันเกิด:\n"${wishText}"\n\nผู้ส่ง: ${birthdayConfig.recipientName}\nวันที่: ${birthdayConfig.birthdayDate || new Date().toLocaleDateString('th-TH')}`,
        }),
      });
      console.log('Wish transmitted to email successfully!');
    } else if (emailCfg.formspreeUrl) {
      await fetch(emailCfg.formspreeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          recipient: birthdayConfig.recipientName,
          wish: wishText,
          date: birthdayConfig.birthdayDate,
        }),
      });
      console.log('Wish transmitted via Formspree successfully!');
    }
  } catch (err) {
    console.warn('Email dispatch notice:', err);
  }
}

function triggerWishStarsFireworks() {
  const count = 180;
  const defaults = {
    origin: { y: 0.6 },
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.3, {
    spread: 45,
    startVelocity: 60,
    colors: ['#ffd700', '#fde047', '#ffffff'],
  });
  fire(0.25, {
    spread: 80,
    colors: ['#00f2fe', '#4facfe', '#8a2be2'],
  });
  fire(0.2, {
    spread: 120,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#ffd700', '#00f2fe'],
  });
  fire(0.25, {
    spread: 140,
    startVelocity: 40,
  });
}

// ---------------------------------------------------------
// 9️⃣ Tab Switching & Event Listeners
// ---------------------------------------------------------
function switchTab(targetId) {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
  });

  document.querySelectorAll('.content-section').forEach((sec) => {
    sec.classList.toggle('active', sec.id === targetId);
  });
}

function setupEventListeners() {
  // Start Button Click
  document.getElementById('start-btn').addEventListener('click', () => {
    SoundFX.click();
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('main-content').classList.remove('hidden');

    toggleAudio(true);
    renderQuizQuestion();
  });

  // Music Toggle Button
  document.getElementById('music-toggle').addEventListener('click', () => {
    SoundFX.click();
    toggleAudio(!isAudioPlaying);
  });

  // Tab Switching
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      SoundFX.click();
      const target = btn.getAttribute('data-target');
      switchTab(target);
    });
  });

  // Lightbox Close
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);

  // Gift Box Open Click
  document.getElementById('gift-box').addEventListener('click', handleOpenGiftBox);

  // Make a Wish Send & Edit Buttons
  document.getElementById('send-wish-btn').addEventListener('click', handleSendWish);
  document.getElementById('edit-wish-btn').addEventListener('click', handleEditWish);
}

function toggleAudio(play) {
  const audio = document.getElementById('bgm-player');
  const icon = document.getElementById('music-icon');

  if (play) {
    audio
      .play()
      .then(() => {
        isAudioPlaying = true;
        icon.textContent = '🎵';
      })
      .catch(() => {
        isAudioPlaying = false;
        icon.textContent = '🔇';
      });
  } else {
    audio.pause();
    isAudioPlaying = false;
    icon.textContent = '🔇';
  }
}
