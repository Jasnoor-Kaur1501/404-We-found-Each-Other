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
});
