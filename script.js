// DevTools Easter Egg
console.log(
  "%cIf you're reading this, I still choose you.",
  "color:#00ff9c; font-size:14px;"
);

const line = document.getElementById("line");
const logs = document.querySelectorAll(".log");
const typed = document.getElementById("typed");

// Initial text change
setTimeout(() => {
  line.textContent = "But somehow, we didn’t.";
}, 2000);

// Scroll reveal for logs
window.addEventListener("scroll", () => {
  logs.forEach(log => {
    if (log.getBoundingClientRect().top < window.innerHeight - 100) {
      log.classList.add("visible");
    }
  });
});

// Typing effect
const finalMessage = "I’d reboot this life with you every time.";
let index = 0;
let typedOnce = false;

function typeText() {
  if (index < finalMessage.length) {
    typed.textContent += finalMessage.charAt(index);
    index++;
    setTimeout(typeText, 80);
  }
}

// Trigger typing once
window.addEventListener("scroll", () => {
  const finalSection = document.querySelector(".final");
  if (
    !typedOnce &&
    finalSection.getBoundingClientRect().top < window.innerHeight
  ) {
    typedOnce = true;
    typeText();
  }
});
