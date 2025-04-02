// Dynamic Matrix Rain Animation
document.addEventListener('DOMContentLoaded', function() {
    // Clear any existing content in the matrix background
    const existingBackground = document.querySelector('.matrix-background');
    if (existingBackground) {
        existingBackground.innerHTML = '';
    } else {
        // Create the matrix background if it doesn't exist
        const matrixBackground = document.createElement('div');
        matrixBackground.className = 'matrix-background';
        document.body.prepend(matrixBackground);
    }

    const matrixBackground = document.querySelector('.matrix-background');
    
    // Characters for the matrix rain
    const matrixChars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ零一二三四五六七八九十百千万空雨電星虚無幽霊夢幻影光闇扉秘密電脳魂魔宇宙間破壊迷路永遠終焉悪鬼怪異光陰明風火水土未知数式絶望混沌罪鎖悪徳暗黒白赤戦闘死神寂静乱舞錯乱狂気消滅終末誘惑妖艶闘志力強';
    
    // Create Japanese kanji characters for special bright characters
    const brightKanji = '零一二三四五六七八九十百千万空雨電星虚無幽霊夢幻影光闇扉秘密'.split('');
    
    // Create the rain columns dynamically
    for (let i = 0; i < 40; i++) {
        createRainColumn();
    }
    
    function createRainColumn() {
        const rainColumn = document.createElement('div');
        rainColumn.className = 'rain-column';
        
        // Random positioning and animation properties
        rainColumn.style.left = `${Math.random() * 100}%`;
        rainColumn.style.top = `-${Math.random() * 50}%`; // Start above viewport
        rainColumn.style.animationDuration = `${7 + Math.random() * 8}s`;
        rainColumn.style.animationDelay = `${Math.random() * 2}s`;
        rainColumn.style.opacity = `${0.6 + Math.random() * 0.4}`;
        
        // Generate random characters for this column
        let columnContent = '';
        const columnLength = 15 + Math.floor(Math.random() * 20);
        
        for (let j = 0; j < columnLength; j++) {
            const isBright = Math.random() < 0.15; // 15% chance for a bright character
            const char = isBright 
                ? brightKanji[Math.floor(Math.random() * brightKanji.length)]
                : matrixChars[Math.floor(Math.random() * matrixChars.length)];
                
            if (isBright) {
                columnContent += `<span class="bright-char">${char}</span><br>`;
            } else {
                columnContent += `${char}<br>`;
            }
        }
        
        rainColumn.innerHTML = columnContent;
        matrixBackground.appendChild(rainColumn);
        
        // Remove and recreate the column after animation ends
        const animDuration = parseFloat(rainColumn.style.animationDuration) * 1000;
        setTimeout(() => {
            rainColumn.remove();
            createRainColumn();
        }, animDuration + 2000); // Add a buffer to ensure animation completes
    }
    
    // Tab switching functionality
    const tabSelectors = document.querySelectorAll('.tab-selector');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabSelectors.forEach(selector => {
        selector.addEventListener('click', function() {
            // Remove active class from all selectors and contents
            tabSelectors.forEach(el => el.classList.remove('active'));
            tabContents.forEach(el => el.classList.remove('active'));
            
            // Add active class to clicked selector
            this.classList.add('active');
            
            // Get the tab data attribute
            const tabId = this.getAttribute('data-tab');
            
            // Add active class to corresponding content
            document.getElementById(`${tabId}-content`).classList.add('active');
            
            // Play click sound if available
            const clickSound = document.getElementById('click-sound');
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => {
                    // Silently fail if autoplay is blocked
                    console.log("Sound play prevented by browser policy");
                });
            }
        });
    });
    
    // Profile view counter simulation
    const viewCounter = document.querySelector('.counter-value');
    if (viewCounter) {
        // Generate random starting count between 1000 and 9999
        const baseViews = parseInt(viewCounter.textContent) || Math.floor(1000 + Math.random() * 9000);
        viewCounter.textContent = baseViews.toString();
        
        // Increment views occasionally
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance to increment on each interval
                const currentViews = parseInt(viewCounter.textContent, 10);
                viewCounter.textContent = (currentViews + 1).toString();
            }
        }, 5000);
    }
    
    // Add cursor blinking animation
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.textContent = '_';
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
    
    // Scene idea expand/collapse functionality
    const sceneTitles = document.querySelectorAll('.scene-title');
    sceneTitles.forEach(title => {
        title.addEventListener('click', function() {
            const description = this.nextElementSibling;
            const arrow = this.querySelector('.dropdown-arrow');
            
            if (description.style.maxHeight) {
                description.style.maxHeight = null;
                arrow.innerHTML = '▼';
            } else {
                description.style.maxHeight = description.scrollHeight + 'px';
                arrow.innerHTML = '▲';
            }
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
}); 