// Initialize Lucide Icons
lucide.createIcons();

// Reliable SVG Swap Audio Controller
const audio = document.getElementById('soundtrack');
const audioBtn = document.getElementById('audio-btn');
const audioSlot = document.getElementById('audio-icon-slot');

const playSvg = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
`;

const pauseSvg = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
`;

let isAudioPlaying = false;

audioBtn.addEventListener('click', () => {
  if (isAudioPlaying) {
    audio.pause();
    audioSlot.innerHTML = playSvg;
    audioBtn.classList.remove('playing');
    isAudioPlaying = false;
  } else {
    audio.play().then(() => {
      audioSlot.innerHTML = pauseSvg;
      audioBtn.classList.add('playing');
      isAudioPlaying = true;
    }).catch(err => {
      console.warn('Playback prevented by browser permissions:', err);
    });
  }
});

// Gallery Drag-to-Scroll Mechanics
const gallery = document.getElementById('drag-gallery');
let isDown = false;
let startX;
let scrollLeft;

gallery.addEventListener('mousedown', (e) => {
  isDown = true;
  gallery.style.cursor = 'grabbing';
  startX = e.pageX - gallery.offsetLeft;
  scrollLeft = gallery.scrollLeft;
});

gallery.addEventListener('mouseleave', () => {
  isDown = false;
  gallery.style.cursor = 'grab';
});

gallery.addEventListener('mouseup', () => {
  isDown = false;
  gallery.style.cursor = 'grab';
});

gallery.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = (x - startX) * 1.8;
  gallery.scrollLeft = scrollLeft - walk;
});

// Vertical Chapter Navigation Spine Tracker
const spineDots = document.querySelectorAll('.spine-dot');
const interstitials = document.querySelectorAll('.video-interstitial, .hero-section, #work, #contact');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  interstitials.forEach((section, idx) => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      spineDots.forEach(dot => dot.classList.remove('active'));
      if (spineDots[idx]) spineDots[idx].classList.add('active');
    }
  });
});
