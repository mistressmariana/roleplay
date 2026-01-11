// Dynamic Matrix Rain Animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Matrix Background
    let matrixBackground = document.querySelector('.matrix-background');
    if (!matrixBackground) {
        matrixBackground = document.createElement('div');
        matrixBackground.className = 'matrix-background';
        document.body.prepend(matrixBackground);
    } else {
        matrixBackground.innerHTML = '';
    }
    
    // Characters for the matrix rain
    const matrixChars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ零一二三四五六七八九十百千万空雨電星虚無幽霊夢幻影光闇扉秘密電脳魂魔宇宙間破壊迷路永遠終焉悪鬼怪異光陰明風火水土未知数式絶望混沌罪鎖悪徳暗黒白赤戦闘死神寂静乱舞錯乱狂気消滅終末誘惑妖艶闘志力強';
    
    // Create Japanese kanji characters for special bright characters
    const brightKanji = '零一二三四五六七八九十百千万空雨電星虚無幽霊夢幻影光闇扉秘密'.split('');
    
    // Create the rain columns dynamically
    function createRainColumn() {
        if (!matrixBackground) return;
        
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
            if (rainColumn && rainColumn.parentNode) {
                rainColumn.remove();
            }
            createRainColumn();
        }, animDuration + 2000); // Add a buffer to ensure animation completes
    }
    
    // Initialize rain columns
    for (let i = 0; i < 40; i++) {
        createRainColumn();
    }
    
    // Tab switching functionality - exactly matching working Mommy version
    function initTabs() {
        const tabSelectors = document.querySelectorAll('.tab-selector');
        const tabContents = document.querySelectorAll('.tab-content');
        
        console.log('Initializing tabs - found', tabSelectors.length, 'selectors and', tabContents.length, 'contents');
        
        if (tabSelectors.length === 0) {
            console.warn('No tab selectors found');
            return;
        }
        
        if (tabContents.length === 0) {
            console.warn('No tab contents found');
            return;
        }
        
        // Log all tab IDs for debugging
        tabSelectors.forEach((tab, i) => {
            console.log(`Tab ${i}:`, tab.textContent.trim(), 'data-tab:', tab.getAttribute('data-tab'));
        });
        
        tabSelectors.forEach(tab => {
            // Make absolutely sure it's clickable
            tab.style.cursor = 'pointer';
            tab.style.pointerEvents = 'auto';
            
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const tabName = this.getAttribute('data-tab');
                console.log('Tab clicked:', tabName, this.textContent.trim());
                
                // Remove active class from all tabs and contents
                document.querySelectorAll('.tab-selector').forEach(t => {
                    t.classList.remove('active');
                });
                
                document.querySelectorAll('.tab-content').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Add active class to corresponding content
                if (tabName) {
                    const targetContent = document.getElementById(`${tabName}-content`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                        console.log('Successfully activated:', tabName);
                    } else {
                        console.error(`Tab content with ID "${tabName}-content" not found!`);
                        // List all available content IDs
                        const allContents = document.querySelectorAll('.tab-content');
                        console.log('Available content IDs:', Array.from(allContents).map(c => c.id));
                    }
                } else {
                    console.error('No data-tab attribute on clicked tab!');
                }
                
                // Play click sound if available
                const clickSound = document.getElementById('click-sound');
                if (clickSound) {
                    clickSound.currentTime = 0;
                    clickSound.play().catch(e => {
                        // Silently fail if autoplay is blocked
                    });
                }
            });
        });
        
        console.log('Tabs initialized successfully');
    }
    
    // Initialize tabs
    initTabs();
    
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
        title.style.cursor = 'pointer';
        const description = title.nextElementSibling;
        
        // Initialize all descriptions as collapsed
        if (description && description.classList.contains('scene-description')) {
            description.style.maxHeight = '0px';
        }
        
        title.addEventListener('click', function() {
            const arrow = this.querySelector('.dropdown-arrow');
            
            if (description && description.classList.contains('scene-description')) {
                const currentHeight = description.style.maxHeight;
                if (currentHeight && currentHeight !== '0px' && currentHeight !== '') {
                    // Collapse
                    description.style.maxHeight = '0px';
                    if (arrow) arrow.innerHTML = '▼';
                } else {
                    // Expand
                    description.style.maxHeight = description.scrollHeight + 'px';
                    if (arrow) arrow.innerHTML = '▲';
                }
            }
        });
    });
    
    // Add animation classes on scroll
    function handleScroll() {
        const elements = document.querySelectorAll('.stat-row, .scene-idea, .gallery-item');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('reveal');
            }
        });
    }
    
    // Initial check for elements in viewport
    handleScroll();
    document.addEventListener('scroll', handleScroll);
});
