// ===== ELEMENTS =====
const systemLine = document.getElementById("system-line");
const logs = document.querySelectorAll(".log");
const finalSection = document.querySelector(".final");
const typed = document.getElementById("typed");
const writeSection = document.querySelector(".write");
const terminalInput = document.getElementById("terminal-input");
const systemResponse = document.getElementById("system-response");
const music = document.getElementById("bg-music");

// ===== STEP 1: FAKE ERROR TEXT =====
setTimeout(() => {
  systemLine.textContent = "Unexpected persistence detected.";
}, 2200);

// ===== STEP 2: REVEAL CONTENT =====
setTimeout(() => {
  logs.forEach(log => log.classList.remove("hidden"));
  finalSection.classList.remove("hidden");
  writeSection.classList.remove("hidden");
  document.body.style.overflowY = "auto";
}, 3500);

// ===== SCROLL-BASED LOG REVEAL =====
window.addEventListener("scroll", () => {
  logs.forEach(log => {
    if (log.getBoundingClientRect().top < window.innerHeight * 0.85) {
      log.classList.add("visible");
    }
  });
});

// ===== TYPING EFFECT =====
const message = "I’d reboot this life with you every time.";
let typeIndex = 0;
let typingStarted = false;

function typeText() {
  if (typeIndex < message.length) {
    typed.textContent += message.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeText, 80);
  }
}

window.addEventListener("scroll", () => {
  if (!typingStarted && finalSection.getBoundingClientRect().top < window.innerHeight) {
    typingStarted = true;
    typeText();
  }
});

// ===== BACKGROUND MUSIC (FADE-IN) =====
let musicStarted = false;

window.addEventListener("scroll", () => {
  if (!musicStarted && window.scrollY > window.innerHeight) {
    music.volume = 0;
    music.play();
    musicStarted = true;

    let vol = 0;
    const fadeIn = setInterval(() => {
      if (vol < 0.4) {
        vol += 0.02;
        music.volume = vol;
      } else {
        clearInterval(fadeIn);
      }
    }, 200);
  }
});

// ===== TERMINAL INPUT (PERSISTENT) =====
const savedText = localStorage.getItem("system_input_text");
const isLocked = localStorage.getItem("system_input_locked");

if (savedText) {
  terminalInput.innerText = savedText;
}

if (isLocked === "true") {
  terminalInput.setAttribute("contenteditable", "false");
  systemResponse.textContent = "INPUT SAVED. NO FURTHER CHANGES ALLOWED.";
}

terminalInput.addEventListener("input", () => {
  localStorage.setItem("system_input_text", terminalInput.innerText);

  const length = terminalInput.innerText.length;

  if (length > 20 && length < 60) {
    systemResponse.textContent = "INPUT DETECTED…";
  } else if (length >= 60 && length < 120) {
    systemResponse.textContent = "PROCESSING EMOTIONAL DATA…";
