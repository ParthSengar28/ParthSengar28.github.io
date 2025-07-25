// --- Custom Cursor & Magnetic Buttons ---
const cursor = document.querySelector('.custom-cursor');
const magneticElements = document.querySelectorAll('.magnetic');

if (window.matchMedia("(pointer: fine)").matches) { // Only run on devices with a mouse
    window.addEventListener('mousemove', e => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    magneticElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.classList.add('highlight');
            }
            el.addEventListener('mousemove', e => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.classList.remove('highlight');
            }
            el.style.transform = 'translate(0, 0)';
        });
    });
}