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
    
    // ---------- 2. DİL VERİLERİ (Kısaltılmış) ----------
    const languageData = {
        tr: { gameTitle: "Montaj Ustası", termsLink: "Katılım Koşulları", submitButton: "Yarışmaya Katıl!", labelTerms: "'nı okudum ve kabul ediyorum.", mustBeAccepted: " kabul edilmeli.", termsTitle: "Katılım Koşulları" },
        en: { gameTitle: "Assembly Masters", termsLink: "Terms & Conditions", submitButton: "Join the Competition!", labelTerms: "I have read and agree to the", mustBeAccepted: " must be accepted.", termsTitle: "Terms & Conditions" },
        sv: { gameTitle: "Monteringsmästare", termsLink: "Regler och Villkor", submitButton: "Delta i tävlingen!", labelTerms: "Jag har läst och godkänner", mustBeAccepted: " måste accepteras.", termsTitle: "Regler och Villkor" }
    };
    
    // ---------- OYUN MANTIĞI (BASİTLEŞTİRİLMİŞ) ----------
    
    function setLanguage(lang) {
        const data = languageData[lang] || languageData['en'];
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (data[key]) {
                if(el.tagName === 'SPAN') { el.textContent = data[key]; } else { el.innerHTML = data[key]; }
            }
        });
        gameTitleH2.innerHTML = data.gameTitle;
        const label = document.querySelector('label[for="terms-checkbox"]');
        if(label) {
            const link = label.querySelector('a');
            const textNode = document.createTextNode(data.labelTerms);
            label.innerHTML = '';
            if(link) label.appendChild(link);
            label.appendChild(textNode);
        }
    }

    function startGame() {
        console.log("startGame fonksiyonu çağrıldı.");
        entryScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        console.log("Oyun ekranı görünür yapıldı.");
        loadLevel(0); // Test için her zaman seviye 1'i yükle
    }

    // !! EN ÖNEMLİ KISIM: TEST FONKSİYONU !!
    function loadLevel(levelIndex) {
        try {
            console.log("loadLevel fonksiyonu çalışmaya başladı.");
            // BÜTÜN KARMAŞIK KODLARI DEVRE DIŞI BIRAKTIM
            // SADECE BAŞLIĞI DEĞİŞTİRİYORUZ
            levelTitle.innerHTML = "TEST BAŞARILI - SEVİYE YÜKLENİYOR...";
            console.log("Başlık başarıyla değiştirildi. Test tamamlandı.");

        } catch (error) {
            console.error("loadLevel içinde hata:", error);
            alert("Seviye yüklenirken bir hata oluştu: " + error.message);
        }
    }

    // ---------- OLAY DİNLEYİCİLER ----------
    languageSwitcher.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            setLanguage(e.target.getAttribute('data-lang'));
        }
    });

    entryForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!termsCheckbox.checked) {
            const lang = localStorage.getItem('preferredLanguage') || 'en';
            alert((languageData[lang].termsTitle || "Terms") + (languageData[lang].mustBeAccepted || " must be accepted."));
            return;
        }
        startGame();
    });

    // Sayfa ilk yüklendiğinde varsayılan dili ayarla
    setLanguage(localStorage.getItem('preferredLanguage') || 'en');
});
