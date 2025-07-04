document.addEventListener('DOMContentLoaded', () => {

    // 1. GEREKLİ ELEMENTLERİ SEÇME
    const languageSwitcher = document.getElementById('language-switcher');
    const entryScreen = document.getElementById('entry-screen');
    const entryForm = document.getElementById('entry-form');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const termsLink = document.getElementById('terms-link');
    const gameScreen = document.getElementById('game-screen');
    const termsModal = document.getElementById('terms-modal');
    const closeModalButton = document.querySelector('.close-button');
    const termsTextContainer = document.getElementById('terms-text');

    // 2. DİL VERİLERİ
    const languageData = {
        tr: {
            gameTitle: "Montaj Ustası",
            entryTitle: "Oyuna Hoş Geldiniz!",
            entryDescription: "Ödüllü montaj yarışmasına katılmak için bilgilerinizi girin.",
            termsLink: "Katılım Koşulları",
            submitButton: "Yarışmaya Katıl!",
            termsTitle: "Katılım Koşulları ve Gizlilik Politikası",
            termsContent: `<h4>1. Taraflar ve Kapsam</h4><p>Bu koşullar, Kyrosil ("Organizatör") tarafından düzenlenen ve IKEA ("Sponsor") tarafından resmi olarak desteklenen 'IKEA Montaj Ustası' yarışmasının şartlarını düzenler.</p><h4>2. Katılım Şartları</h4><p>Katılımcıların 18 yaşını doldurmuş ve Türkiye'de ikamet ediyor olmaları gerekmektedir...</p><p>(...diğer tüm maddeler buraya gelecek...)</p>`,
            fullNamePlaceholder: "Ad Soyad",
            emailPlaceholder: "IKEA'ya Kayıtlı E-posta Adresiniz",
            socialUserPlaceholder: "Instagram / Portal Kullanıcı Adı",
            termsLabel: "'nı okudum ve kabul ediyorum."
        },
        en: {
            gameTitle: "Assembly Masters",
            entryTitle: "Welcome to the Game!",
            entryDescription: "Enter your details to join the assembly competition with prizes.",
            termsLink: "Terms & Conditions",
            submitButton: "Join the Competition!",
            termsTitle: "Terms & Conditions and Privacy Policy",
            termsContent: `<h4>1. Parties and Scope</h4><p>These terms regulate the conditions for the 'IKEA Assembly Masters' competition, organized by Kyrosil ("Organizer") and officially sponsored by IKEA ("Sponsor").</p><h4>2. Eligibility</h4><p>Participants must be over 18 years of age and reside in Europe.</p><p>(...all other clauses will be here...)</p>`,
            fullNamePlaceholder: "Full Name",
            emailPlaceholder: "Email Address Registered with IKEA",
            socialUserPlaceholder: "Instagram / Portal Username",
            termsLabel: "I have read and agree to the"
        },
        sv: {
            gameTitle: "Monteringsmästare",
            entryTitle: "Välkommen till spelet!",
            entryDescription: "Ange dina uppgifter för att delta i monteringstävlingen med priser.",
            termsLink: "Regler och Villkor",
            submitButton: "Delta i tävlingen!",
            termsTitle: "Regler och Villkor och Sekretesspolicy",
            termsContent: `<h4>1. Parter och Omfattning</h4><p>Dessa villkor reglerar förutsättningarna för tävlingen 'IKEA Monteringsmästare', anordnad av Kyrosil ("Arrangör") och officiellt sponsrad av IKEA ("Sponsor").</p><h4>2. Deltagande</h4><p>Deltagare måste vara över 18 år och bosatta i Sverige.</p><p>(...alla andra klausuler kommer här...)</p>`,
            fullNamePlaceholder: "Fullständigt namn",
            emailPlaceholder: "E-postadress registrerad hos IKEA",
            socialUserPlaceholder: "Användarnamn på Instagram / Portal",
            termsLabel: "Jag har läst och godkänner"
        }
    };

    // 3. ANA FONKSİYON: DİLİ AYARLA
    const setLanguage = (lang) => {
        const data = languageData[lang];
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (data[key]) { element.textContent = data[key]; }
        });
        document.getElementById('fullName').placeholder = data.fullNamePlaceholder;
        document.getElementById('email').placeholder = data.emailPlaceholder;
        document.getElementById('socialUser').placeholder = data.socialUserPlaceholder;
        document.querySelector('label[for="terms-checkbox"]').childNodes[2].nodeValue = ` ${data.termsLabel}`;
        document.documentElement.lang = lang;
        localStorage.setItem('preferredLanguage', lang);
    };

    // 4. OLAY DİNLEYİCİLERİ (GİRİŞ EKRANI)
    languageSwitcher.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') { setLanguage(e.target.getAttribute('data-lang')); }
    });
    termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        const currentLang = localStorage.getItem('preferredLanguage') || 'tr';
        termsTextContainer.innerHTML = languageData[currentLang].termsContent;
        termsModal.style.display = 'block';
    });
    closeModalButton.addEventListener('click', () => { termsModal.style.display = 'none'; });
    entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!termsCheckbox.checked) { alert('Lütfen katılım koşullarını kabul edin.'); return; }
        entryScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    });

    // 5. BAŞLANGIÇ AYARLARI
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    setLanguage(preferredLanguage ? preferredLanguage : 'tr');
    
    //-------------------- OYUN ALANI KODLARI --------------------//

    // 6. YENİ OYUN ELEMENTLERİNİ SEÇME
    const tableLegs = document.querySelectorAll('.table-leg');
    const legPlaceholders = document.querySelectorAll('.leg-placeholder');

    // 7. OYUN MANTIKLARI
    let draggedItem = null;

    tableLegs.forEach(leg => {
        leg.addEventListener('dragstart', (e) => {
            draggedItem = e.target;
            setTimeout(() => { e.target.style.display = 'none'; }, 0);
        });
        leg.addEventListener('dragend', (e) => {
            setTimeout(() => { e.target.style.display = 'block'; draggedItem = null; }, 0);
        });
    });

    legPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('dragover', (e) => { e.preventDefault(); });
        placeholder.addEventListener('dragenter', (e) => { e.preventDefault(); e.target.style.backgroundColor = 'rgba(0,255,0,0.1)'; });
        placeholder.addEventListener('dragleave', (e) => { e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'; });
        placeholder.addEventListener('drop', (e) => {
            e.preventDefault();
            e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
            if (e.target.children.length === 0) {
                e.target.appendChild(draggedItem);
                draggedItem.style.cursor = 'default';
                draggedItem.setAttribute('draggable', 'false');
                e.target.style.border = 'none';
            }
            checkWinCondition();
        });
    });

    const checkWinCondition = () => {
        let placedLegs = document.querySelectorAll('.leg-placeholder .table-leg').length;
        if (placedLegs === 4) {
            setTimeout(() => {
                alert('Tebrikler! Seviye 1 tamamlandı!');
            }, 500);
        }
    };
});
