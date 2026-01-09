// Password Protection
const AUTH_PASSWORD = 'mitama2026'; // パスワードを変更してください
const AUTH_KEY = 'mitama_auth';

// Check authentication on page load
function checkAuth() {
  const authStatus = sessionStorage.getItem(AUTH_KEY);
  const authModal = document.getElementById('auth-modal');
  const mainContent = document.getElementById('main-content');
  
  if (authStatus === 'authenticated') {
    authModal.classList.add('hidden');
    mainContent.classList.remove('hidden');
  } else {
    authModal.classList.remove('hidden');
    mainContent.classList.add('hidden');
  }
}

// Handle authentication form
function initAuth() {
  checkAuth();
  
  const authForm = document.getElementById('auth-form');
  const passwordInput = document.getElementById('password-input');
  const authError = document.getElementById('auth-error');
  const authModal = document.getElementById('auth-modal');
  const mainContent = document.getElementById('main-content');
  
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const password = passwordInput.value;
      
      if (password === AUTH_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, 'authenticated');
        authModal.classList.add('hidden');
        mainContent.classList.remove('hidden');
        authError.classList.add('hidden');
        passwordInput.value = '';
        // Load content after authentication
        loadNews();
        loadCharacters();
        loadGallery();
      } else {
        authError.textContent = 'パスワードが正しくありません';
        authError.classList.remove('hidden');
        passwordInput.value = '';
        passwordInput.focus();
      }
    });
    
    // Focus on password input when modal is shown
    if (!sessionStorage.getItem(AUTH_KEY)) {
      passwordInput.focus();
    }
  }
}

// Navigation
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mobileMenu.classList.add('hidden');
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 100) {
    navbar.classList.add('shadow-lg');
  } else {
    navbar.classList.remove('shadow-lg');
  }
  lastScroll = currentScroll;
});

// Active navigation link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe section titles
document.querySelectorAll('.section-title').forEach(el => {
  observer.observe(el);
});

// Observe fade-on-scroll elements
document.querySelectorAll('.fade-on-scroll').forEach(el => {
  observer.observe(el);
});

// Load News Data
async function loadNews() {
  try {
    const response = await fetch('data/news.json');
    const news = await response.json();
    const newsList = document.getElementById('news-list');
    
    newsList.innerHTML = news.map(item => `
      <div class="news-item fade-on-scroll">
        <div class="flex flex-col md:flex-row md:items-center gap-2 mb-2">
          <span class="text-rose-500 font-semibold">${item.date}</span>
          <h3 class="text-xl font-bold text-slate-800">${item.title}</h3>
        </div>
        ${item.content ? `<p class="text-slate-700">${item.content}</p>` : ''}
      </div>
    `).join('');
    
    // Observe newly added elements
    document.querySelectorAll('.fade-on-scroll').forEach(el => {
      observer.observe(el);
    });
  } catch (error) {
    console.error('Failed to load news:', error);
    document.getElementById('news-list').innerHTML = 
      '<p class="text-gray-400">ニュースの読み込みに失敗しました。</p>';
  }
}

// Load Characters Data
async function loadCharacters() {
  try {
    const response = await fetch('data/characters.json');
    const characters = await response.json();
    const charactersList = document.getElementById('characters-list');
    
    charactersList.innerHTML = characters.map(char => {
      const isBustUp = char.name === 'かすみみたま';
      return `
      <div class="character-card p-6 rounded-lg fade-on-scroll">
        <div class="mb-4">
          <img src="${char.image}" alt="${char.name}" 
               class="w-full ${isBustUp ? 'character-bustup' : 'h-64 object-cover'} rounded-lg mb-4"
               onclick="openModal('${char.image}', '${char.name}')"
               onerror="this.src='assets/images/placeholder.svg'"
               style="${isBustUp ? 'cursor: pointer;' : ''}">
        </div>
        <h3 class="text-2xl font-bold mb-2">${char.name}</h3>
        <p class="text-slate-700 mb-4">${char.description}</p>
        ${char.voice ? `
          <div class="audio-player">
            <button class="audio-btn" onclick="playAudio('${char.voice}', this)">
              <span class="play-icon">▶</span>
              <span class="pause-icon hidden">⏸</span>
            </button>
            <span class="text-sm text-slate-500">サンプルボイス</span>
          </div>
        ` : ''}
      </div>
    `;
    }).join('');
    
    // Observe newly added elements
    document.querySelectorAll('.fade-on-scroll').forEach(el => {
      observer.observe(el);
    });
  } catch (error) {
    console.error('Failed to load characters:', error);
    document.getElementById('characters-list').innerHTML = 
      '<p class="text-gray-400">キャラクター情報の読み込みに失敗しました。</p>';
  }
}

// Load Gallery Data
async function loadGallery() {
  try {
    const response = await fetch('data/gallery.json');
    const gallery = await response.json();
    const galleryGrid = document.getElementById('gallery-grid');
    
    galleryGrid.innerHTML = gallery.map(item => `
      <div class="gallery-item fade-on-scroll" onclick="openModal('${item.image}', '${item.title}')">
        <img src="${item.thumbnail}" alt="${item.title}" 
             class="w-full h-48 object-cover rounded-lg"
             loading="lazy"
             onerror="this.src='assets/images/placeholder.svg'">
      </div>
    `).join('');
    
    // Observe newly added elements
    document.querySelectorAll('.fade-on-scroll').forEach(el => {
      observer.observe(el);
    });
  } catch (error) {
    console.error('Failed to load gallery:', error);
    document.getElementById('gallery-grid').innerHTML = 
      '<p class="text-gray-400 col-span-full text-center">ギャラリーの読み込みに失敗しました。</p>';
  }
}

// Audio Player
let currentAudio = null;
let currentButton = null;
let currentAudioUrl = null;

function playAudio(url, button) {
  const playIcon = button.querySelector('.play-icon');
  const pauseIcon = button.querySelector('.pause-icon');
  
  // 同じボタンを再度押した場合、再生中なら停止
  if (currentButton === button && currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    button.classList.remove('playing');
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    currentAudio = null;
    currentButton = null;
    currentAudioUrl = null;
    return;
  }
  
  // 別のオーディオが再生中の場合は停止
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (currentButton) {
      currentButton.classList.remove('playing');
      currentButton.querySelector('.play-icon').classList.remove('hidden');
      currentButton.querySelector('.pause-icon').classList.add('hidden');
    }
  }
  
  // 同じオーディオURLの場合、停止状態から再生
  if (currentAudioUrl === url && currentAudio && currentAudio.paused) {
    currentAudio.play().then(() => {
      button.classList.add('playing');
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
    }).catch(error => {
      console.error('Failed to play audio:', error);
    });
    currentButton = button;
    return;
  }
  
  // 新しいオーディオを再生
  currentAudio = new Audio(url);
  currentButton = button;
  currentAudioUrl = url;
  
  currentAudio.play().then(() => {
    button.classList.add('playing');
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
  }).catch(error => {
    console.error('Failed to play audio:', error);
  });
  
  currentAudio.addEventListener('ended', () => {
    button.classList.remove('playing');
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    currentAudio = null;
    currentButton = null;
    currentAudioUrl = null;
  });
}

// Gallery Modal
const galleryModal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');

function openModal(imageSrc, title) {
  modalImage.src = imageSrc;
  modalImage.alt = title;
  galleryModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  galleryModal.classList.add('hidden');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
galleryModal.addEventListener('click', (e) => {
  if (e.target === galleryModal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !galleryModal.classList.contains('hidden')) {
    closeModal();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  
  // Only load content if authenticated
  if (sessionStorage.getItem(AUTH_KEY) === 'authenticated') {
    loadNews();
    loadCharacters();
    loadGallery();
  }
  
  // Make openModal available globally
  window.openModal = openModal;
  window.playAudio = playAudio;
});

