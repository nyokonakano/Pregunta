// Elementos del DOM
const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");
const heartsContainer = document.getElementById("hearts-container");
const attemptCounter = document.getElementById("attempt-counter");
const musicBtn = document.getElementById("music-btn");
const shareBtn = document.getElementById("share-btn");

// Frases para el botón "No"
const noButtonPhrases = [
  "Uy no😣",
  "¿Estás seguro?",
  "Piénsalo mejor 🤔",
  "Dale otra oportunidad",
  "Mira el botón rosado👀",
  "¿De verdad? 🥺",
  "Última oportunidad",
  "Ya casi... 💕",
  "¡Vamos! Di que sí 💖"
];

// GIFs de Tenor - usando URLs directas de media
const gifUrls = [
  "https://media.tenor.com/HOysAL57G1AAAAAC/bubu-dudu-kiss.gif", // Inicial - beso
  "https://media.tenor.com/uf4rihPX8ScAAAAi/happy-labour-day.gif", // Sad
  "https://media.tenor.com/uAcVS5gCXhgAAAAi/mochi-cat-please.gif", // Pleading
  "https://media.tenor.com/4wY8WQ1bLnkAAAAi/puppy-eyes.gif", // Puppy eyes
  "https://media.tenor.com/Wcu9oaorv8kAAAAi/tramell-tillman.gif", // Crying
  "https://media1.tenor.com/m/iEXbs40PJrYAAAAC/heart-broken-broken-heart.gif"  // Heartbroken
];

// Variables de estado
let clickCount = 0;
let yesBtnScale = 1;
let musicPlaying = false;
//let audioContext = null;

// Texto de la carta de amor (PERSONALIZA ESTO)
const loveLetterText = `Desde el momento en que entraste en mi vida, todo cambió. Cada día a tu lado es un regalo que atesoro en mi corazón.

Eres la razón por la que sonrío sin motivo, la persona que hace que los días grises se llenen de color. Tu risa es mi canción favorita y tu felicidad, mi mayor prioridad.

Este San Valentín quiero que sepas que eres la persona más especial para mí. Gracias por ser tú, por estar aquí, por elegirme.

No puedo esperar para crear más recuerdos increíbles juntos. ¡Este es solo el comienzo de nuestra historia! 💖`;

// ============================================
// EFECTO TYPEWRITER
// ============================================
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  // Remover el cursor parpadeante temporalmente
  element.style.setProperty('--show-cursor', 'none');
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Cuando termina, mostrar el cursor final
      setTimeout(() => {
        element.style.removeProperty('--show-cursor');
      }, 500);
    }
  }
  
  type();
}

// ============================================
// MÚSICA DE FONDO (Simulada con Web Audio API)
// ============================================
/*function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playHappyTone() {
  if (!audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 523.25; // C5
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

musicBtn.addEventListener("click", () => {
  initAudio();
  musicPlaying = !musicPlaying;
  
  if (musicPlaying) {
    musicBtn.classList.add("playing");
    musicBtn.textContent = "🔇";
    playHappyTone();
  } else {
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "🎵";
  }
});*/

// ============================================
// PARTÍCULAS DE CORAZONES FLOTANTES
// ============================================
function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = ["💕", "💖", "💗", "💓", "💝"][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (Math.random() * 10 + 15) + "px";
  heart.style.animationDuration = (Math.random() * 3 + 4) + "s";
  heart.style.animationDelay = Math.random() * 2 + "s";
  
  heartsContainer.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 8000);
}

// Crear corazones continuamente
setInterval(createFloatingHeart, 800);

// Crear algunos iniciales
for (let i = 0; i < 5; i++) {
  setTimeout(createFloatingHeart, i * 300);
}

// ============================================
// CAMBIAR GIF
// ============================================
function changeGif(gifUrl) {
  const gifWrapper = document.querySelector('.question-container .gif-wrapper');
  
  // Crear imagen directamente
  gifWrapper.innerHTML = `
    <img src="${gifUrl}" alt="Animated GIF" class="gif-image" />
  `;
}

// ============================================
// VIBRACIÓN (solo en móviles compatibles)
// ============================================
function vibrate(pattern = [50]) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

// ============================================
// FUNCIONALIDAD BOTÓN "NO"
// ============================================
let noBtnPosition = { x: 0, y: 0 };
let isNoBtnMoving = false;

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clickCount++;
  
  // Vibrar el dispositivo
  vibrate([30, 50, 30]);
  
  // Cambiar texto del botón
  if (clickCount < noButtonPhrases.length) {
    noBtn.querySelector('span').textContent = noButtonPhrases[clickCount];
  } else {
    noBtn.querySelector('span').textContent = noButtonPhrases[noButtonPhrases.length - 1];
  }
  
  // Hacer crecer el botón "Sí"
  yesBtnScale += 0.25;
  yesBtn.style.transform = `scale(${yesBtnScale})`;
  
  // Cambiar GIF
  const gifIndex = Math.min(clickCount, gifUrls.length - 1);
  changeGif(gifUrls[gifIndex]);
  
  // Mostrar contador
  attemptCounter.textContent = `Ya me dijiste que no ${clickCount} ${clickCount === 1 ? 'vez' : 'veces'} 🥺`;
  attemptCounter.classList.add('visible');
  
  // Animar shake
  noBtn.classList.add('shake');
  setTimeout(() => noBtn.classList.remove('shake'), 500);
  
  // Si es muy grande el botón Sí, desvanecer el No
  if (yesBtnScale > 3) {
    noBtn.classList.add('fade');
  }
  
  // Después de 3 intentos, el botón No se mueve
  if (clickCount >= 3 && !isNoBtnMoving) {
    isNoBtnMoving = true;
    makeNoBtnRunAway();
  }
});

// Hacer que el botón NO se escape del dedo
function makeNoBtnRunAway() {
  const buttonContainer = document.querySelector('.button-container');
  const containerRect = buttonContainer.getBoundingClientRect();
  
  noBtn.addEventListener('touchstart', moveNoBtnAway);
  noBtn.addEventListener('mouseenter', moveNoBtnAway);
}

function moveNoBtnAway(e) {
  if (clickCount < 3) return;
  
  e.preventDefault();
  const buttonContainer = document.querySelector('.button-container');
  const containerRect = buttonContainer.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  
  // Calcular nueva posición aleatoria
  const maxX = containerRect.width - btnRect.width - 20;
  const maxY = 100; // Rango vertical limitado
  
  const randomX = Math.random() * maxX - (maxX / 2);
  const randomY = (Math.random() * maxY) - 50;
  
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  
  // Vibrar
  vibrate([20]);
  
  // Agregar animación de escape
  noBtn.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
}

// ============================================
// FUNCIONALIDAD BOTÓN "SÍ"
// ============================================
yesBtn.addEventListener("click", () => {
  // Vibración de éxito
  vibrate([50, 100, 50, 100, 50]);
  
  // Reproducir sonido feliz
  /*initAudio();
  playHappyTone();
  setTimeout(() => playHappyTone(), 200);*/
  
  // Ocultar pregunta y mostrar loader
  questionContainer.style.display = "none";
  heartLoader.style.display = "block";
  
  // Después de 2.5 segundos mostrar resultado
  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "block";
    
    // Lanzar confetti
    launchConfetti();
    
    // Más corazones flotantes
    for (let i = 0; i < 20; i++) {
      setTimeout(createFloatingHeart, i * 100);
    }
    
    // Mostrar y animar carta de amor después del confetti
    setTimeout(() => {
      const loveLetter = document.querySelector('.love-letter');
      const letterText = document.getElementById('letter-text');
      
      loveLetter.classList.add('show');
      
      // Iniciar efecto typewriter después de que aparezca la carta
      setTimeout(() => {
        typeWriter(letterText, loveLetterText, 40);
      }, 600);
    }, 2000);
  }, 2500);
});

// ============================================
// CONFETTI
// ============================================
function launchConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 9999,
    colors: ['#ff6b81', '#ff8fa3', '#ffa4b1', '#ffb3c1', '#ffc4cc']
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    confetti(Object.assign({}, defaults, { 
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    }));
    confetti(Object.assign({}, defaults, { 
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    }));
  }, 250);
}

// ============================================
// BOTÓN COMPARTIR / CAPTURAR
// ============================================
shareBtn.addEventListener("click", async () => {
  vibrate([50]);
  
  // Intentar usar la API de compartir nativa
  if (navigator.share) {
    try {
      await navigator.share({
        title: '¡Dijo que SÍ! 💕',
        text: '¡Mi San Valentín aceptó! 😍💖',
      });
    } catch (err) {
      console.log('No se pudo compartir:', err);
    }
  } else {
    // Alternativa: copiar texto
    const text = '¡Dijo que SÍ a ser mi San Valentín! 💕😍';
    
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        shareBtn.textContent = '¡Copiado! ✓';
        setTimeout(() => {
          shareBtn.textContent = 'Capturar momento 📸';
        }, 2000);
      } catch (err) {
        alert('¡Seremos los mejores San Valentín! 💕');
      }
    } else {
      alert('¡Seremos los mejores San Valentín! 💕');
    }
  }
});

// ============================================
// PREVENIR ZOOM EN DOBLE TAP (iOS)
// ============================================
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// ============================================
// INICIALIZACIÓN
// ============================================
console.log('💕 App de San Valentín cargada correctamente');
