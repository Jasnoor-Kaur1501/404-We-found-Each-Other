const systemLine = document.getElementById("system-line");
const logs = document.querySelectorAll(".log");
const finalSection = document.querySelector(".final");
const typed = document.getElementById("typed");

// Step 1: Fake error → doubt
setTimeout(() => {
  systemLine.textContent = "Unexpected persistence detected.";
}, 2200);

// Step 2: Reveal scroll + content
setTimeout(() => {
  logs.forEach(log => log.classList.remove("hidden"));
  finalSection.classList.remove("hidden");
  document.body.style.overflowY = "auto";
}, 3500);

// Scroll reveal
window.addEventListener("scroll", () => {
  logs.forEach(log => {
    if (log.getBoundingClientRect().top < window.innerHeight * 0.85) {
      log.classList.add("visible");
    }
  });
});
;

// Typing effect
const message = "I’d reboot this life with you every time.";
let i = 0;
let started = false;

function typeText() {
  if (i < message.length) {
    typed.textContent += message.charAt(i);
    i++;
    setTimeout(typeText, 80);
  }
}

const writeSection = document.querySelector(".write");

setTimeout(() => {
  writeSection.classList.remove("hidden");
}, 4200);

window.addEventListener("scroll", () => {
  if (!started && finalSection.getBoundingClientRect().top < window.innerHeight) {
    started = true;
    typeText();
  }

  // 🎧 Background music fade-in
const music = document.getElementById("bg-music");
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

const terminalInput = document.getElementById("terminal-input");
const systemResponse = document.getElementById("system-response");

// 🔹 Restore saved text on load
const savedText = localStorage.getItem("system_input_text");
const isLocked = localStorage.getItem("system_input_locked");

if (savedText) {
  terminalInput.innerText = savedText;
}

if (isLocked === "true") {
  terminalInput.setAttribute("contenteditable", "false");
  systemResponse.textContent = "INPUT SAVED. NO FURTHER CHANGES ALLOWED.";
}

// 🔹 Save text live as user types
terminalInput.addEventListener("input", () => {
  localStorage.setItem("system_input_text", terminalInput.innerText);

  const length = terminalInput.innerText.length;

  if (length > 20 && length < 60) {
    systemResponse.textContent = "INPUT DETECTED…";
  } else if (length >= 60 && length < 120) {
    systemResponse.textContent = "PROCESSING EMOTIONAL DATA…";
  } else if (length >= 120) {
    systemResponse.textContent = "INPUT ACCEPTED.";
  }
});

// 🔹 Lock input permanently when user clicks away
terminalInput.addEventListener("blur", () => {
  terminalInput.setAttribute("contenteditable", "false");
  localStorage.setItem("system_input_locked", "true");
  systemResponse.textContent = "INPUT SAVED. NO FURTHER CHANGES ALLOWED.";
});


});
