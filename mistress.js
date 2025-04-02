// Matrix rain animation
document.addEventListener('DOMContentLoaded', function() {
    const matrixBackground = document.createElement('div');
    matrixBackground.className = 'matrix-background';
    document.body.appendChild(matrixBackground);

    // Create rain columns
    for (let i = 0; i < 40; i++) {
        const rainColumn = document.createElement('div');
        rainColumn.className = 'rain-column';
        rainColumn.style.left = `${Math.random() * 100}%`;
        rainColumn.style.animationDuration = `${7 + Math.random() * 4}s`;
        rainColumn.style.animationDelay = `${Math.random() * 2}s`;
        
        // Add random matrix characters
        let chars = '';
        for (let j = 0; j < 20; j++) {
            const char = String.fromCharCode(0x30A0 + Math.random() * 96);
            const isBright = Math.random() < 0.1;
            chars += `<span${isBright ? ' class="bright-char"' : ''}>${char}</span><br>`;
        }
        rainColumn.innerHTML = chars;
        matrixBackground.appendChild(rainColumn);
    }

    // Handle tab switching
    const tabInputs = document.querySelectorAll('.tab-input');
    tabInputs.forEach(input => {
        input.addEventListener('change', function() {
            const content = document.querySelector(`.${this.id}-content`);
            if (content) {
                content.style.display = 'block';
                // Hide other tab contents
                document.querySelectorAll('.tab-content').forEach(tab => {
                    if (tab !== content) {
                        tab.style.display = 'none';
                    }
                });
            }
        });
    });
});

// Add animation classes on scroll
document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.stat-row, .scene-idea, .gallery-item');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            element.classList.add('reveal');
        }
    });
}); 