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
    
    // ---------- 2. DİL VERİLERİ ----------
    const languageData = {
        tr: { gameTitle: "Montaj Ustası", prizeInfoTitle: "Seviye Ödülleri", level2Prize: "Seviye 2: <strong>500 TL</strong> Hediye Çeki", level4Prize: "Seviye 4: <strong>2.500 TL</strong> Hediye Çeki", level6Prize: "Seviye 6: <strong>25.000 TL</strong> Büyük Ödül", dailyLivesInfo: "Günde 3 deneme hakkınız var!", fullNamePlaceholder: "Ad Soyad", emailPlaceholder: "IKEA'ya Kayıtlı E-posta Adresiniz", socialUserPlaceholder: "Instagram / Portal Kullanıcı Adı", termsLink: "Katılım Koşulları", submitButton: "Yarışmaya Katıl!", termsTitle: "Katılım Koşulları ve Gizlilik Politikası", termsContent: `<h4>1. Taraflar ve Kapsam</h4><p>Bu koşullar, Kyrosil ("Organizatör") tarafından düzenlenen ve IKEA ("Sponsor") tarafından resmi olarak desteklenen 'IKEA Montaj Ustası' ("Oyun") adlı yarışmanın şartlarını düzenler.</p><h4>2. Katılım Şartları</h4><p>Katılımcıların 18 yaşını doldurmuş ve Türkiye'de ikamet ediyor olmaları gerekmektedir. Katılım ücretsizdir. Girilen bilgilerin doğruluğu katılımcının sorumluluğundadır.</p><h4>3. Kişisel Verilerin Kullanımı</h4><p>Katılımcı, paylaştığı kişisel verilerin (Ad-Soyad, E-posta, Kullanıcı Adı) yarışma yönetimi, kazananların tespiti ve ödül dağıtımı amacıyla Organizatör ve Sponsor ile paylaşılmasını peşinen kabul eder. Sponsor, bu bilgileri pazarlama faaliyetleri için kullanma hakkını saklı tutar.</p><h4>4. Ödüller</h4><p>Ödüller belirtilen seviyeleri başarıyla tamamlayan katılımcılara verilir. Ödüller devredilemez, değiştirilemez veya nakde çevrilemez. Kazananlarla formda belirtilen e-posta veya kullanıcı adı üzerinden iletişime geçilecektir.</p>`, level: "Seviye", levelComplete: "Seviye Tamamlandı!", nextLevel: "Sıradaki Seviye", gameOver: "Oyun Bitti!", gameOverMsg: "Tüm canlarınızı kullandınız. Lütfen yarın tekrar deneyin.", congrats: "TEBRİKLER!", prizeClaimMsg: "Ödülünüzü talep etmek için aşağıdaki butona tıklayarak bize e-posta gönderin.", claimPrize: "Ödülü Talep Et", emailSubject: "Ödül Başvurusu - Seviye", emailBody: "Merhaba, [Seviye] seviyesini başarıyla tamamladım. Katılım bilgilerim aşağıdadır:", labelTerms: "'nı okudum ve kabul ediyorum.", },
        en: { gameTitle: "Assembly Masters", prizeInfoTitle: "Level Prizes", level2Prize: "Level 2: <strong>€10</strong> Gift Certificate", level4Prize: "Level 4: <strong>€50</strong> Gift Certificate", level6Prize: "Level 6: <strong>€500</strong> Grand Prize", dailyLivesInfo: "You have 3 attempts per day!", fullNamePlaceholder: "Full Name", emailPlaceholder: "Email Address Registered with IKEA", socialUserPlaceholder: "Instagram / Portal Username", termsLink: "Terms & Conditions", submitButton: "Join the Competition!", termsTitle: "Terms & Conditions and Privacy Policy", termsContent: `<h4>1. Parties and Scope</h4><p>These terms regulate the conditions for the 'IKEA Assembly Masters' ("Game"), organized by Kyrosil ("Organizer") and officially sponsored by IKEA ("Sponsor").</p><h4>2. Eligibility</h4><p>Participants must be over 18 years of age and reside in Europe. Participation is free. The accuracy of the information provided is the responsibility of the participant.</p><h4>3. Use of Personal Data</h4><p>The participant agrees that their personal data (Name, Email, Username) will be shared with the Organizer and Sponsor for competition management, winner identification, and prize distribution. The Sponsor reserves the right to use this information for marketing activities.</p><h4>4. Prizes</h4><p>Prizes are awarded to participants who successfully complete the specified levels. Prizes are non-transferable, non-exchangeable, and cannot be redeemed for cash. Winners will be contacted via the email or username provided in the form.</p>`, level: "Level", levelComplete: "Level Complete!", nextLevel: "Next Level", gameOver: "Game Over!", gameOverMsg: "You have used all your lives. Please try again tomorrow.", congrats: "CONGRATULATIONS!", prizeClaimMsg: "To claim your prize, please send us an email by clicking the button below.", claimPrize: "Claim Prize", emailSubject: "Prize Claim - Level", emailBody: "Hello, I have successfully completed [Level]. My participation details are below:", labelTerms: "I have read and agree to the", },
        sv: { gameTitle: "Monteringsmästare", prizeInfoTitle: "Nivåpriser", level2Prize: "Nivå 2: <strong>120 kr</strong> Presentkort", level4Prize: "Nivå 4: <strong>600 kr</strong> Presentkort", level6Prize: "Nivå 6: <strong>6000 kr</strong> Stora priset", dailyLivesInfo: "Du har 3 försök per dag!", fullNamePlaceholder: "Fullständigt namn", emailPlaceholder: "E-postadress registrerad hos IKEA", socialUserPlaceholder: "Användarnamn på Instagram / Portal", termsLink: "Regler och Villkor", submitButton: "Delta i tävlingen!", termsTitle: "Regler och Villkor och Sekretesspolicy", termsContent: `<h4>1. Parter och Omfattning</h4><p>Dessa villkor reglerar förutsättningarna för tävlingen 'IKEA Monteringsmästare' ("Spelet"), anordnad av Kyrosil ("Arrangör") och officiellt sponsrad av IKEA ("Sponsor").</p><h4>2. Deltagande</h4><p>Deltagare måste vara över 18 år och bosatta i Sverige. Deltagandet är gratis. Riktigheten av den angivna informationen är deltagarens ansvar.</p><h4>3. Användning av Personuppgifter</h4><p>Deltagaren samtycker till att hens personuppgifter (Namn, E-post, Användarnamn) delas med Arrangören och Sponsorn för tävlingshantering, identifiering av vinnare och prisutdelning. Sponsorn förbehåller sig rätten att använda denna information för marknadsföringsaktiviteter.</p><h4>4. Priser</h4><p>Priser delas ut till deltagare som framgångsrikt slutför de angivna nivåerna. Priserna kan inte överlåtas, bytas eller lösas in mot kontanter. Vinnare kommer att kontaktas via den e-postadress eller det användarnamn som anges i formuläret.</p>`, level: "Nivå", levelComplete: "Nivå klar!", nextLevel: "Nästa nivå", gameOver: "Spelet är över!", gameOverMsg: "Du har använt alla dina liv. Försök igen imorgon.", congrats: "GRATTIS!", prizeClaimMsg: "För att hämta ditt pris, skicka ett e-postmeddelande genom att klicka på knappen nedan.", claimPrize: "Hämta pris", emailSubject: "Prisanspråk - Nivå", emailBody: "Hej, jag har slutfört [Nivå] framgångsrikt. Mina deltagaruppgifter finns nedan:", labelTerms: "Jag har läst och godkänner", }
    };
    
    // ---------- 3. OYUN SEVİYE VERİLERİ ----------
    const levelData = [
        { level: 1, prize: null, productName: "LACK Sehpa", mainPart: { w: 300, h: 300, class: 'part-wood' }, parts: [{id:'leg', q:4, w:40, h:100, class:'part-wood'}, {id:'fakeLeg', q:1, w:40, h:100, class:'part-wood'}], placeholders: [{x:10,y:10,w:40,h:40,accepts:'leg', label:1},{x:250,y:10,w:40,h:40,accepts:'leg', label:2},{x:10,y:250,w:40,h:40,accepts:'leg', label:3},{x:250,y:250,w:40,h:40,accepts:'leg', label:4}] },
        { level: 2, prize: {tr:"500 TL",en:"€10",sv:"120 kr"}, productName: "KALLAX Raf", mainPart: { w: 200, h: 400, class: 'part-white' }, parts: [{id:'long', q:2, w:180, h:30, class:'part-white'}, {id:'short', q:2, w:30, h:340, class:'part-white'}], placeholders: [{x:10,y:10,w:180,h:30,accepts:'long', label:1}, {x:10,y:360,w:180,h:30,accepts:'long', label:2}, {x:85,y:30,w:30,h:340,accepts:'short', label:3}] },
        { level: 3, prize: null, productName: "BERGSHULT Duvar Rafı", mainPart: { isWall: true }, parts: [{id:'shelf', q:1, w:400, h:30, class:'part-wood'}, {id:'bracketL', q:1, w:30, h:150, class:'part-white'}, {id:'bracketR', q:1, w:30, h:150, class:'part-white'}], placeholders: [{x:200,y:100,w:400,h:30,accepts:'shelf', label:1}, {x:220,y:130,w:30,h:150,accepts:'bracketL', label:2}, {x:590,y:130,w:30,h:150,accepts:'bracketR', label:3}] },
        { level: 4, prize: {tr:"2.500 TL",en:"€50",sv:"600 kr"}, productName: "BILLY Kitaplık", mainPart: { w: 400, h: 600, class: 'part-wood' }, parts: [{id:'side', q:2, w:30, h:580, class:'part-wood'}, {id:'shelf', q:4, w:340, h:20, class:'part-wood'}, {id:'back', q:1, w:380, h:580, class:'part-white'}], placeholders: [{x:10,y:10,w:30,h:580,accepts:'side', label:2}, {x:360,y:10,w:30,h:580,accepts:'side', label:3}, {x:40,y:290,w:320,h:20,accepts:'shelf', label:4}, {x:40,y:10,w:320,h:20,accepts:'shelf', label:5}, {x:40,y:570,w:320,h:20,accepts:'shelf', label:6},{x:40,y:150,w:320,h:20,accepts:'shelf', label:7}, {x:10,y:10,w:380,h:580,accepts:'back', label:1}] },
        { level: 5, prize: null, productName: "MALM Şifonyer", mainPart: { w: 400, h: 350, class: 'part-black' }, parts: [{id:'top', q:1, w:400, h:30, class:'part-black'}, {id:'drawer', q:2, w:380, h:150, class:'part-black'}, {id:'kick', q:1, w:380, h:20, class:'part-black'}], placeholders: [{x:0,y:0,w:400,h:30,accepts:'top', label:1}, {x:10,y:40,w:380,h:150,accepts:'drawer', label:2}, {x:10,y:200,w:380,h:150,accepts:'drawer', label:3}, {x:10,y:360,w:380,h:20,accepts:'kick', label:4}] },
        { level: 6, prize: {tr:"25.000 TL",en:"€500",sv:"6000 kr"}, productName: "POÄNG Koltuk", mainPart: { isWall: true }, parts: [{id:'cushion', q:1, w:250, h:400, class:'part-poang-cushion'}, {id:'lframe', q:1, w:80, h:350, class:'part-poang-frame'}, {id:'rframe', q:1, w:80, h:350, class:'part-poang-frame'}, {id:'base', q:1, w:200, h:80, class:'part-poang-frame'}], placeholders: [{x:350,y:50,w:250,h:400,accepts:'cushion', label:1}, {x:280,y:70,w:80,h:350,accepts:'lframe', label:2}, {x:590,y:70,w:80,h:350,accepts:'rframe', label:3}, {x:375,y:400,w:200,h:80,accepts:'base', label:4}] }
    ];
    
    let gameState = { currentLevel: 0, lives: 3, lockoutUntil: null };
    let draggedItem = null;

    // ----- OYUN DURUM YÖNETİMİ -----
    function saveGameState() { localStorage.setItem('kyrosilGameState', JSON.stringify(gameState)); }
    function loadGameState() { const savedState = JSON.parse(localStorage.getItem('kyrosilGameState')); if (savedState) { gameState = savedState; }}
    function isLockedOut() { if (!gameState.lockoutUntil) return false; if (Date.now() > gameState.lockoutUntil) { gameState.lockoutUntil = null; gameState.lives = 3; saveGameState(); return false; } return true; }
    
    // ----- DİL VE ARAYÜZ FONKSİYONLARI -----
    function getText(key) { const lang = localStorage.getItem('preferredLanguage') || 'en'; return languageData[lang][key] || key; }
    function setLanguage(lang) { const data = languageData[lang]; if (!data) return; document.querySelectorAll('[data-lang-key]').forEach(el => { const key = el.getAttribute('data-lang-key'); if (data[key]) el.textContent = data[key]; }); gameTitleH2.textContent = data.gameTitle; document.getElementById('fullName').placeholder = data.fullNamePlaceholder; document.getElementById('email').placeholder = data.emailPlaceholder; document.getElementById('socialUser').placeholder = data.socialUserPlaceholder; const label = document.querySelector('label[for="terms-checkbox"]'); if (label.childNodes.length > 1) { label.childNodes[2].nodeValue = ` ${data.labelTerms}`; } prizeInfoContainer.innerHTML = `<h4>${data.prizeInfoTitle}</h4><ul><li>${data.level2Prize}</li><li>${data.level4Prize}</li><li>${data.level6Prize}</li></ul><p>${data.dailyLivesInfo}</p>`; document.documentElement.lang = lang; localStorage.setItem('preferredLanguage', lang); }
    function updateLivesDisplay() { livesContainer.innerHTML = ''; for (let i = 0; i < gameState.lives; i++) { const heart = document.createElement('span'); heart.textContent = '❤️'; livesContainer.appendChild(heart); }}
    function showOverlay(title, message, buttonText, buttonAction) { overlayTitle.textContent = title; overlayMessage.textContent = message; overlayButton.style.display = 'block'; overlayButton.textContent = buttonText; overlayButton.onclick = () => { gameOverlay.classList.add('hidden'); if(buttonAction) buttonAction(); }; overlayPrizeInfo.innerHTML = ''; gameOverlay.classList.remove('hidden'); }
    function showPrizeScreen(level) { const lang = document.documentElement.lang; const prizeValue = level.prize[lang]; const fullName = document.getElementById('fullName').value; const email = document.getElementById('email').value; overlayTitle.textContent = getText('congrats'); overlayMessage.textContent = getText('prizeClaimMsg'); overlayPrizeInfo.innerHTML = `<h3>${prizeValue}</h3>`; const prizeButton = document.createElement('a'); prizeButton.className = 'prize-button'; prizeButton.textContent = getText('claimPrize'); const emailSubject = `${getText('emailSubject')} ${level.level}`; const emailBody = `${getText('emailBody').replace('[Seviye]', `Seviye ${level.level}`)}\n\nAd Soyad: ${fullName}\nE-posta: ${email}`; prizeButton.href = `mailto:giveaways@kyrosil.eu?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`; overlayPrizeInfo.appendChild(prizeButton); overlayButton.textContent = getText('nextLevel'); overlayButton.style.display = 'block'; overlayButton.onclick = () => { gameOverlay.classList.add('hidden'); gameState.currentLevel++; saveGameState(); loadLevel(gameState.currentLevel); }; gameOverlay.classList.remove('hidden'); }
    function showLockoutScreen() { entryScreen.classList.add('hidden'); gameScreen.classList.add('hidden'); showOverlay(getText('gameOver'), getText('gameOverMsg'), "", null); overlayButton.style.display = 'none'; }
    
    // ----- OYUN AKIŞI FONKSİYONLARI -----
    function initGame() { loadGameState(); const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en'; setLanguage(preferredLanguage); if (isLockedOut()) { showLockoutScreen(); return; } entryScreen.classList.remove('hidden'); gameScreen.classList.add('hidden'); gameOverlay.classList.add('hidden'); }
    function startGame() { entryScreen.classList.add('hidden'); gameScreen.classList.remove('hidden'); loadLevel(gameState.currentLevel); }
    function loadLevel(levelIndex) {
        gameOverlay.classList.add('hidden');
        const level = levelData[levelIndex];
        if (!level) { showOverlay(getText('congrats'), "Tebrikler! Tüm seviyeleri tamamladın!", "Baştan Başla", () => { gameState.currentLevel=0; gameState.lives=3; saveGameState(); window.location.reload(); }); return; }
        levelTitle.textContent = `${getText('level')} ${level.level}: ${level.productName}`;
        updateLivesDisplay();
        assemblyTarget.innerHTML = '';
        partsBin.innerHTML = '';
        let mainPartDiv;
        if (level.mainPart.isWall) { mainPartDiv = assemblyTarget; } else { mainPartDiv = document.createElement('div'); mainPartDiv.style.width = level.mainPart.w + 'px'; mainPartDiv.style.height = level.mainPart.h + 'px'; mainPartDiv.className = `main-part ${level.mainPart.class}`; mainPartDiv.style.position = 'relative'; assemblyTarget.appendChild(mainPartDiv); }
        level.placeholders.forEach(p => { const placeholder = document.createElement('div'); placeholder.className = 'placeholder'; placeholder.style.left = p.x + 'px'; placeholder.style.top = p.y + 'px'; placeholder.style.width = p.w + 'px'; placeholder.style.height = p.h + 'px'; placeholder.dataset.accepts = p.accepts; placeholder.dataset.label = p.label; mainPartDiv.appendChild(placeholder); });
        let partLabelCounter = {};
        level.parts.forEach(part => { 
            if(!partLabelCounter[part.id]) partLabelCounter[part.id] = 0;
            for(let i=0; i<part.q; i++) { 
                const partEl = document.createElement('div'); 
                const currentLabel = level.placeholders.find(p => p.accepts === part.id && !p.isUsed)?.label;
                partEl.id = `${part.id}-${i}`; 
                partEl.dataset.partType = part.id; 
                partEl.dataset.label = level.placeholders.find((p, idx) => p.accepts === part.id && idx >= partLabelCounter[part.id])?.label || "X";
                partLabelCounter[part.id]++;
                partEl.className = `furniture-part ${part.class}`; 
                partEl.style.width = `${part.w}px`; 
                partEl.style.height = `${part.h}px`; 
                partEl.draggable = true; 
                partsBin.appendChild(partEl); 
            }
        });
        addDragDropListeners();
    }
    function loseLife() { if (gameState.lives > 0) { gameState.lives--; updateLivesDisplay(); saveGameState(); if (gameState.lives === 0) { handleGameOver(); }}}
    function handleGameOver() { gameState.lockoutUntil = Date.now() + 24 * 60 * 60 * 1000; saveGameState(); showLockoutScreen(); }
    function checkWinCondition() { const level = levelData[gameState.currentLevel]; const totalParts = level.parts.reduce((sum, part) => { return part.id.startsWith('fake') ? sum : sum + part.q; }, 0); const placedParts = assemblyTarget.querySelectorAll('.placeholder .furniture-part').length; if (placedParts === totalParts) { setTimeout(handleLevelWin, 500); } }
    function handleLevelWin() { const level = levelData[gameState.currentLevel]; if (level.prize) { showPrizeScreen(level); } else { showOverlay(getText('levelComplete'), `${getText('level')} ${level.level} bitti!`, getText('nextLevel'), () => { gameState.currentLevel++; saveGameState(); loadLevel(gameState.currentLevel); }); } }
    
    // ----- EVENT LISTENERS -----
    function addDragDropListeners() {
        document.querySelectorAll('#parts-bin .furniture-part').forEach(part => { part.addEventListener('dragstart', e => { draggedItem = e.target; }); });
        const allPlaceholders = document.querySelectorAll('.placeholder');
        allPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('dragover', e => e.preventDefault());
            placeholder.addEventListener('dragenter', e => { e.preventDefault(); placeholder.classList.add('over'); });
            placeholder.addEventListener('dragleave', () => placeholder.classList.remove('over'));
            placeholder.addEventListener('drop', e => {
                e.preventDefault();
                placeholder.classList.remove('over');
                if (draggedItem && placeholder.dataset.accepts === draggedItem.dataset.partType && placeholder.dataset.label === draggedItem.dataset.label && placeholder.children.length === 0) {
                    placeholder.appendChild(draggedItem);
                    draggedItem.draggable = false;
                    draggedItem.style.cursor = 'default';
                    checkWinCondition();
                } else {
                    placeholder.classList.add('wrong');
                    setTimeout(() => placeholder.classList.remove('wrong'), 500);
                    loseLife();
                }
            });
        });
        assemblyTarget.addEventListener('dragover', e => e.preventDefault());
        assemblyTarget.addEventListener('drop', e => {
            if (e.target === assemblyTarget || e.target.classList.contains('main-part')) {
                assemblyTarget.classList.add('wrong');
                setTimeout(() => assemblyTarget.classList.remove('wrong'), 500);
                loseLife();
            }
        });
    }
    languageSwitcher.addEventListener('click', e => { if (e.target.tagName === 'BUTTON') { setLanguage(e.target.getAttribute('data-lang')); }});
    termsLink.addEventListener('click', e => { e.preventDefault(); const lang = localStorage.getItem('preferredLanguage') || 'en'; termsTextContainer.innerHTML = languageData[lang].termsContent; termsModal.classList.remove('hidden'); });
    closeModalButton.addEventListener('click', () => { termsModal.classList.add('hidden'); });
    entryForm.addEventListener('submit', e => { e.preventDefault(); if (!termsCheckbox.checked) { alert(getText('termsTitle') + " kabul edilmeli."); return; } startGame(); });
    
    initGame();
});
