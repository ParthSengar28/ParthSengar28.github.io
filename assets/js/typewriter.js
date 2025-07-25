// --- Typewriter Effect ---
const roles = ["an AI/ML Engineer", "a Data Scientist", "a Problem Solver", "a Lifelong Learner"];
let roleIndex = 0;
let charIndex = 0;
const typewriterElement = document.getElementById('typewriter-text');

if (typewriterElement) {
    typewriterElement.textContent = ''; // Clear initial text

    function type() {
        if (charIndex < roles[roleIndex].length) {
            typewriterElement.textContent += roles[roleIndex].charAt(charIndex++);
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterElement.textContent = roles[roleIndex].substring(0, --charIndex);
            setTimeout(erase, 50);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        }
    }

    // Start typewriter effect after a short delay to allow CSS animation to finish
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            typewriterElement.style.animation = 'none'; // Stop CSS animation if it was running
            typewriterElement.style.borderRight = '.15em solid var(--sky-400)'; // Ensure caret is visible
            type();
        }, 500); // Adjust delay if needed
    });
}