// --- Scroll Reveal ---
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optional: remove 'visible' class if you want the animation to replay on scroll up
                // entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed (0.1 means 10% of element visible)

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});