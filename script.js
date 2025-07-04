document.addEventListener('DOMContentLoaded', () => {

    // ---------- 1. ELEMENT SEÇİMLERİ ----------
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
    const gameTitleH2 = document.querySelector('#entry-screen h2');
    const levelTitle = document.getElementById('level-title');
    const livesContainer = document.getElementById('lives-container');
    const assemblyTarget = document.getElementById('assembly-target');
    const partsBin = document.getElementById('parts-bin');
    const gameOverlay = document.getElementById('game-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayMessage = document.getElementById('overlay-message');
    const overlayPrizeInfo = document.getElementById('overlay-prize-info');
    const overlayButton = document.getElementById('overlay-button');
    const allPlaceholders = document.getElementsByClassName('placeholder');


    // ---------- 2. DİL VERİLERİ (Örnek Metinler) ----------
    const languageData = {
        tr: {
            gameTitle: "Montaj Ustası",
            prizeInfoTitle: "Seviye Ödülleri",
            level2Prize: "Seviye 2: <strong>500 TL</strong> Hediye Çeki",
            level4Prize: "Seviye 4: <strong>2.500 TL</strong> Hediye Çeki",
            level6Prize: "Seviye 6: <strong>25.000 TL</strong> Büyük Ödül",
            dailyLivesInfo: "Günde 3 deneme hakkınız var!",
            termsLink: "Katılım Koşulları",
            submitButton: "Yarışmaya Katıl!",
            termsTitle: "Katılım Koşulları",
            termsContent: `Tüm katılım koşulları metni buraya gelecek...`,
            level: "Seviye",
            levelComplete: "Seviye Tamamlandı!",
            nextLevel: "Sıradaki Seviye",
            gameOver: "Oyun Bitti!",
            gameOverMsg: "Tüm canlarınızı kullandınız. Lütfen yarın tekrar deneyin.",
            congrats: "TEBRİKLER!",
            prizeClaimMsg: "Ödülünüzü talep etmek için aşağıdaki butona tıklayarak bize e-posta gönderin.",
            claimPrize: "Ödülü Talep Et",
            emailSubject: "Ödül Başvurusu",
            emailBody: "Merhaba, [Seviye] seviyesini başarıyla tamamladım. Katılım bilgilerim aşağıdadır:",
            labelTerms: "'nı okudum ve kabul ediyorum.",
        },
        en: {
            gameTitle: "Assembly Masters",
            prizeInfoTitle: "Level Prizes",
            level2Prize: "Level 2: <strong>€10</strong> Gift Certificate",
            level4Prize: "Level 4: <strong>€50</strong> Gift Certificate",
            level6Prize: "Level 6: <strong>€500</strong> Grand Prize",
            dailyLivesInfo: "You have 3 attempts per day!",
            termsLink: "Terms & Conditions",
            submitButton: "Join the Competition!",
            termsTitle: "Terms & Conditions",
            termsContent: `Full terms and conditions text will go here...`,
            level: "Level",
            levelComplete: "Level Complete!",
            nextLevel: "Next Level",
            gameOver: "Game Over!",
            gameOverMsg: "You have used all your lives. Please try again tomorrow.",
            congrats: "CONGRATULATIONS!",
            prizeClaimMsg: "To claim your prize, please send us an email by clicking the button below.",
            claimPrize: "Claim Prize",
            emailSubject: "Prize Claim",
            emailBody: "Hello, I have successfully completed [Level]. My participation details are below:",
            labelTerms: "I have read and agree to the",
        },
        sv: {
            gameTitle: "Monteringsmästare",
            prizeInfoTitle: "Nivåpriser",
            level2Prize: "Nivå 2: <strong>120 kr</strong> Presentkort",
            level4Prize: "Nivå 4: <strong>600 kr</strong> Presentkort",
            level6Prize: "Nivå 6: <strong>6000 kr</strong> Stora priset",
            dailyLivesInfo: "Du har 3 försök per dag!",
            termsLink: "Regler och Villkor",
            submitButton: "Delta i tävlingen!",
            termsTitle: "Regler och Villkor",
            termsContent: `Fullständiga regler och villkor kommer här...`,
            level: "Nivå",
            levelComplete: "Nivå klar!",
            nextLevel: "Nästa nivå",
            gameOver: "Spelet är över!",
            gameOverMsg: "Du har använt alla dina liv. Försök igen imorgon.",
            congrats: "GRATTIS!",
            prizeClaimMsg: "För att hämta ditt pris, skicka ett e-postmeddelande genom att klicka på knappen nedan.",
            claimPrize: "Hämta pris",
            emailSubject: "Prisanspråk",
            emailBody: "Hej, jag har slutfört [Nivå] framgångsrikt. Mina deltagaruppgifter finns nedan:",
            labelTerms: "Jag har läst och godkänner",
        }
    };
    
    // ---------- 3. OYUN SEVİYE VERİLERİ ----------
    const levelData = [
        { level: 1, prize: null, productName: "LACK Sehpa", mainPart: { w: 300, h: 300, class: 'part-wood' }, parts: [{id:'leg', q:4, w:40, h:100, class:'part-wood'}], placeholders: [{x:10,y:10,w:40,h:40,accepts:'leg'},{x:250,y:10,w:40,h:40,accepts:'leg'},{x:10,y:250,w:40,h:40,accepts:'leg'},{x:250,y:250,w:40,h:40,accepts:'leg'}] },
        { level: 2, prize: {tr:"500 TL",en:"€10",sv:"120 kr"}, productName: "KALLAX Raf", mainPart: { w: 200, h: 400, class: 'part-white' }, parts: [{id:'long', q:2, w:180, h:30, class:'part-white'}, {id:'short', q:1, w:30, h:340, class:'part-white'}], placeholders: [{x:10,y:10,w:180,h:30,accepts:'long'}, {x:10,y:360,w:180,h:30,accepts:'long'}, {x:85,y:30,w:30,h:340,accepts:'short'}] },
    ];
    // Not: Diğer seviyeler buraya eklenebilir.

    // ---------- 4. OYUN DEĞİŞKENLERİ VE DURUM YÖNETİMİ ----------
    let gameState = { currentLevel: 0, lives: 3, lockoutUntil: null };
    let draggedItem = null;

    function saveGameState() { localStorage.setItem('kyrosilGameState', JSON.stringify(gameState)); }
    function loadGameState() {
        const savedState = JSON.parse(localStorage.getItem('kyrosilGameState'));
        if (savedState) {
            gameState = savedState;
        }
    }
    function isLockedOut() {
        if (!gameState.lockoutUntil) return false;
        if (Date.now() > gameState.lockoutUntil) {
            gameState.lockoutUntil = null;
            gameState.lives = 3;
            saveGameState();
            return false;
        }
        return true;
    }

    // ---------- 5. ANA FONKSİYONLAR ----------

    function setLanguage(lang) {
        // Dil verisini al
        const data = languageData[lang];
        if (!data) return;

        // Metinleri güncelle
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (data[key]) element.textContent = data[key];
        });
        gameTitleH2.textContent = data.gameTitle;

        // Giriş formu placeholder'larını güncelle
        document.getElementById('fullName').placeholder = data.fullNamePlaceholder || "Ad Soyad";
        document.getElementById('email').placeholder = data.emailPlaceholder || "E-posta";
        document.getElementById('socialUser').placeholder = data.socialUserPlaceholder || "Kullanıcı Adı";

        // Checkbox label'ını güncelle
        const label = document.querySelector('label[for="terms-checkbox"]');
        if (label.childNodes.length > 1) {
            label.childNodes[2].nodeValue = ` ${data.labelTerms}`;
        }

        // Ödül listesini oluştur
        prizeInfoContainer.innerHTML = `
            <h4>${data.prizeInfoTitle}</h4>
            <ul>
                <li>${data.level2Prize}</li>
                <li>${data.level4Prize}</li>
                <li>${data.level6Prize}</li>
            </ul>
            <p>${data.dailyLivesInfo}</p>
        `;

        // Tarayıcı hafızasına kaydet ve HTML dilini ayarla
        document.documentElement.lang = lang;
        localStorage.setItem('preferredLanguage', lang);
    }
    
    function initGame() {
        loadGameState();
        const preferredLanguage = localStorage.getItem('preferredLanguage') || 'tr';
        setLanguage(preferredLanguage);
        
        if (isLockedOut()) {
            showLockoutScreen();
            return;
        }
        
        entryScreen.classList.remove('hidden');
        gameScreen.classList.add('hidden');
        gameOverlay.classList.add('hidden');
    }

    function startGame() {
        entryScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        loadLevel(gameState.currentLevel);
    }
    
    function loadLevel(levelIndex) {
        // ... (Bu fonksiyon bir önceki cevaptakiyle aynı şekilde çalışır)
        const level = levelData[levelIndex];
        if (!level) { 
            showOverlay("Tüm seviyeleri tamamladın!", "Harika İş!", "Baştan Başla", () => { gameState.currentLevel=0; saveGameState(); initGame(); });
            return; 
        }

        levelTitle.textContent = `${languageData[document.documentElement.lang].level} ${level.level}`;
        updateLivesDisplay();

        assemblyTarget.innerHTML = '';
        partsBin.innerHTML = '';

        const mainPartDiv = document.createElement('div');
        mainPartDiv.style.width = level.mainPart.w + 'px';
        mainPartDiv.style.height = level.mainPart.h + 'px';
        mainPartDiv.className = `furniture-part ${level.mainPart.class}`;
        mainPartDiv.style.position = 'relative';

        level.placeholders.forEach(p => {
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder';
            placeholder.style.left = p.x + 'px';
            placeholder.style.top = p.y + 'px';
            placeholder.style.width = p.w + 'px';
            placeholder.style.height = p.h + 'px';
            placeholder.dataset.accepts = p.accepts;
            mainPartDiv.appendChild(placeholder);
        });
        assemblyTarget.appendChild(mainPartDiv);

        level.parts.forEach(part => {
            for(let i=0; i<part.q; i++) {
                const partEl = document.createElement('div');
                partEl.id = `${part.id}-${i}`;
                partEl.dataset.partType = part.id;
                partEl.className = `furniture-part ${part.class}`;
                partEl.style.width = `${part.w}px`;
                partEl.style.height = `${part.h}px`;
                partEl.draggable = true;
                partsBin.appendChild(partEl);
            }
        });
        
        addDragDropListeners();
    }
    
    function updateLivesDisplay() {
        livesContainer.innerHTML = '';
        for (let i = 0; i < gameState.lives; i++) {
            const heart = document.createElement('span');
            heart.textContent = '❤️';
            livesContainer.appendChild(heart);
        }
    }

    function showOverlay(title, message, buttonText, buttonAction) {
        overlayTitle.textContent = title;
        overlayMessage.textContent = message;
        overlayButton.textContent = buttonText;
        overlayButton.onclick = () => {
            gameOverlay.classList.add('hidden');
            if(buttonAction) buttonAction();
        };
        overlayPrizeInfo.innerHTML = ''; // Ödül bilgisini temizle
        overlayButton.style.display = 'block';
        gameOverlay.classList.remove('hidden');
    }

    function showLockoutScreen() {
        entryScreen.classList.add('hidden');
        gameScreen.classList.add('hidden');
        const lang = localStorage.getItem('preferredLanguage') || 'tr';
        const data = languageData[lang];
        showOverlay(data.gameOver, data.gameOverMsg, "OK", null);
        overlayButton.style.display = 'none'; // OK butonu olmasın
    }

    // ---------- 6. OLAY DİNLEYİCİLERİ (EVENT LISTENERS) ----------

    function addDragDropListeners() {
        const parts = document.querySelectorAll('#parts-bin .furniture-part');
        parts.forEach(part => {
            part.addEventListener('dragstart', e => { draggedItem = e.target; });
        });

        for(const placeholder of allPlaceholders) {
            placeholder.addEventListener('dragover', e => e.preventDefault());
            placeholder.addEventListener('dragenter', e => { e.preventDefault(); placeholder.classList.add('over'); });
            placeholder.addEventListener('dragleave', () => placeholder.classList.remove('over'));
            placeholder.addEventListener('drop', e => {
                e.preventDefault();
                placeholder.classList.remove('over');
                if (draggedItem && placeholder.dataset.accepts === draggedItem.dataset.partType && placeholder.children.length === 0) {
                    placeholder.appendChild(draggedItem);
                    draggedItem.draggable = false;
                    draggedItem.style.cursor = 'default';
                    // check win condition
                } else {
                    placeholder.classList.add('wrong');
                    setTimeout(() => placeholder.classList.remove('wrong'), 500);
                    // can azaltma fonksiyonu buraya gelecek
                }
            });
        }
    }
    
    languageSwitcher.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            setLanguage(e.target.getAttribute('data-lang'));
        }
    });

    termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = localStorage.getItem('preferredLanguage') || 'tr';
        termsTextContainer.innerHTML = languageData[lang].termsContent;
        termsModal.classList.remove('hidden');
    });

    closeModalButton.addEventListener('click', () => {
        termsModal.classList.add('hidden');
    });

    entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!termsCheckbox.checked) {
            const lang = localStorage.getItem('preferredLanguage') || 'tr';
            alert(languageData[lang].termsTitle + " kabul edilmeli."); // Dil desteği eklendi
            return;
        }
        startGame();
    });

    // ---------- 7. BAŞLANGIÇ ----------
    initGame();
});
