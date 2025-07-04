document.addEventListener('DOMContentLoaded', () => {
    // ---------- ELEMENT SEÇİMLERİ ----------
    const languageSwitcher = document.getElementById('language-switcher');
    const entryScreen = document.getElementById('entry-screen');
    const entryForm = document.getElementById('entry-form');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const termsLink = document.getElementById('terms-link');
    const gameScreen = document.getElementById('game-screen');
    const termsModal = document.getElementById('terms-modal');
    const closeModalButton = document.querySelector('.close-button');
    const termsTextContainer = document.getElementById('terms-text');
    const prizeInfoContainer = document.getElementById('prize-info-container');
    const levelTitle = document.getElementById('level-title');
    const livesContainer = document.getElementById('lives-container');
    const assemblyTarget = document.getElementById('assembly-target');
    const partsBin = document.getElementById('parts-bin');
    const gameOverlay = document.getElementById('game-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayMessage = document.getElementById('overlay-message');
    const overlayPrizeInfo = document.getElementById('overlay-prize-info');
    const overlayButton = document.getElementById('overlay-button');

    // ---------- DİL VERİLERİ ----------
    const languageData = {
        tr: {
            // ... (önceki gibi, uzunluğu azaltmak için kısaltıldı)
            level: "Seviye",
            dailyLivesInfo: "Günlük 3 deneme hakkınız var.",
            prizeInfoTitle: "Seviye Ödülleri:",
            level2Prize: "Seviye 2: 500 TL Hediye Çeki",
            level4Prize: "Seviye 4: 2.500 TL Hediye Çeki",
            level6Prize: "Seviye 6: 25.000 TL Büyük Ödül",
            levelComplete: "Seviye Tamamlandı!",
            nextLevel: "Sıradaki Seviye",
            gameOver: "Oyun Bitti!",
            gameOverMsg: "Tüm canlarınızı kullandınız. Lütfen yarın tekrar deneyin.",
            tryAgain: "Tekrar Dene",
            congrats: "TEBRİKLER!",
            prizeClaimMsg: "Ödülünüzü talep etmek için aşağıdaki butona tıklayarak bize e-posta gönderin.",
            claimPrize: "Ödülü Talep Et",
            emailSubject: "Ödül Başvurusu",
            emailBody: "Merhaba, [Seviye] seviyesini başarıyla tamamladım. Katılım bilgilerim aşağıdadır:",
            //... diğer tüm metinler
        },
        en: {
            //...
            level: "Level",
            dailyLivesInfo: "You have 3 attempts per day.",
            prizeInfoTitle: "Level Prizes:",
            level2Prize: "Level 2: €10 Gift Certificate",
            level4Prize: "Level 4: €50 Gift Certificate",
            level6Prize: "Level 6: €500 Grand Prize",
            //...
        },
        sv: {
            //...
            level: "Nivå",
            dailyLivesInfo: "Du har 3 försök per dag.",
            prizeInfoTitle: "Nivåpriser:",
            level2Prize: "Nivå 2: 120 kr Presentkort",
            level4Prize: "Nivå 4: 600 kr Presentkort",
            level6Prize: "Nivå 6: 6000 kr Stora priset",
            //...
        }
    };
    // Dil fonksiyonu burada (kısaltıldı)
    const setLanguage = (lang) => { /* ... önceki gibi çalışıyor ... */ };
    
    // ---------- OYUN VERİLERİ ----------
    const levelData = [
        { level: 1, prize: null, productName: "LACK Sehpa", mainPart: { w: 300, h: 300, class: 'part-wood' }, parts: [{id:'leg', q:4, w:40, h:100, class:'part-wood'}], placeholders: [{x:10,y:10,w:40,h:40,accepts:'leg'},{x:250,y:10,w:40,h:40,accepts:'leg'},{x:10,y:250,w:40,h:40,accepts:'leg'},{x:250,y:250,w:40,h:40,accepts:'leg'}] },
        { level: 2, prize: {tr:"500 TL",en:"€10",sv:"120 kr"}, productName: "KALLAX Raf (2x1)", mainPart: { w: 200, h: 400, class: 'part-white' }, parts: [{id:'shelf', q:2, w:180, h:30, class:'part-white'}, {id:'divider', q:1, w:30, h:180, class:'part-white'}], placeholders: [{x:10,y:10,w:180,h:30,accepts:'shelf'}, {x:10,y:360,w:180,h:30,accepts:'shelf'}, {x:85,y:110,w:30,h:180,accepts:'divider'}] },
        // ... Seviye 3, 4, 5 ve 6 için benzer veri yapıları...
        { level: 6, prize: {tr:"25.000 TL",en:"€500",sv:"6000 kr"}, productName: "POÄNG Koltuk", mainPart: { w: 300, h: 350, class: 'part-poang-cushion' }, parts: [{id:'frame', q:2, w:50, h:300, class:'part-poang-frame'},{id:'base', q:1, w:250, h:50, class:'part-poang-frame'}], placeholders: [/*...*/] }
    ];

    let gameState = {
        currentLevel: 0,
        lives: 3,
        lockoutUntil: null
    };

    // ---------- OYUN YÖNETİMİ FONKSİYONLARI ----------

    function initGame() {
        loadGameState();
        if (isLockedOut()) {
            showLockoutScreen();
            return;
        }
        entryScreen.classList.remove('hidden');
        gameScreen.classList.add('hidden');
    }

    function startGame() {
        entryScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        loadLevel(gameState.currentLevel);
    }

    function loadLevel(levelIndex) {
        const level = levelData[levelIndex];
        if (!level) { /* Tüm seviyeler bitti ekranı */ return; }

        levelTitle.textContent = `${getText('level')} ${level.level}`;
        updateLivesDisplay();

        assemblyTarget.innerHTML = '';
        partsBin.innerHTML = '';

        // Ana parçayı ve placeholderları oluştur
        const mainPart = document.createElement('div');
        mainPart.style.width = `${level.mainPart.w}px`;
        mainPart.style.height = `${level.mainPart.h}px`;
        mainPart.className = `furniture-part ${level.mainPart.class}`;
        mainPart.style.position = 'relative';

        level.placeholders.forEach(p => {
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder';
            placeholder.style.left = `${p.x}px`;
            placeholder.style.top = `${p.y}px`;
            placeholder.style.width = `${p.w}px`;
            placeholder.style.height = `${p.h}px`;
            placeholder.dataset.accepts = p.accepts;
            mainPart.appendChild(placeholder);
        });
        assemblyTarget.appendChild(mainPart);

        // Monte edilecek parçaları oluştur
        level.parts.forEach(part => {
            for(let i=0; i<part.q; i++) {
                const partEl = document.createElement('div');
                partEl.id = `${part.id}-${i}`;
                partEl.className = `furniture-part ${part.class}`;
                partEl.style.width = `${part.w}px`;
                partEl.style.height = `${part.h}px`;
                partEl.draggable = true;
                partsBin.appendChild(partEl);
            }
        });
        addDragDropListeners();
    }
    
    function addDragDropListeners() { /* ... önceki sürükle bırak mantığı, ama artık daha dinamik ... */ }
    
    function handleDrop(e) {
        // ... bırakılan yerin doğru olup olmadığını kontrol et (placeholder.dataset.accepts)
        // Eğer yanlışsa:
        // handleIncorrectPlacement(placeholder);
        // Eğer doğruysa:
        // handleCorrectPlacement(placeholder, draggedItem);
    }
    
    function handleIncorrectPlacement(element) {
        element.classList.add('wrong');
        gameState.lives--;
        updateLivesDisplay();
        saveGameState();
        setTimeout(() => element.classList.remove('wrong'), 500);

        if (gameState.lives <= 0) {
            handleGameOver();
        }
    }

    function handleCorrectPlacement(placeholder, item) { /* ... */ }

    function handleLevelWin() {
        const level = levelData[gameState.currentLevel];
        if (level.prize) {
            showPrizeScreen(level);
        } else {
            // Normal seviye bitti ekranı
            showOverlay('levelComplete', 'nextLevel', () => {
                gameState.currentLevel++;
                saveGameState();
                loadLevel(gameState.currentLevel);
            });
        }
    }

    function showPrizeScreen(level) {
        const lang = localStorage.getItem('preferredLanguage') || 'tr';
        const prizeValue = level.prize[lang];
        //...
        // mailto linki oluştur
        const mailto = `mailto:giveaways@kyrosil.eu?subject=...&body=...`;
        //...
    }
    
    function handleGameOver() {
        gameState.lockoutUntil = Date.now() + 24 * 60 * 60 * 1000;
        saveGameState();
        // Oyun bitti ekranını göster
    }
    
    function saveGameState() { localStorage.setItem('kyrosilGameState', JSON.stringify(gameState)); }
    function loadGameState() { /* ... */ }
    function isLockedOut() { /* ... */ }
    
    // ---------- BAŞLANGIÇ ----------
    initGame();
});
