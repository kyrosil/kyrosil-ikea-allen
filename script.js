// Sayfanın tüm HTML elementlerinin yüklenmesini bekle, bu hataları önler.
document.addEventListener('DOMContentLoaded', () => {

    // 1. GEREKLİ ELEMENTLERİ SEÇME
    // Dil Butonları
    const languageSwitcher = document.getElementById('language-switcher');

    // Form Elementleri
    const entryScreen = document.getElementById('entry-screen');
    const entryForm = document.getElementById('entry-form');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const termsLink = document.getElementById('terms-link');
    
    // Oyun Alanı
    const gameScreen = document.getElementById('game-screen');

    // Katılım Koşulları Penceresi (Modal)
    const termsModal = document.getElementById('terms-modal');
    const closeModalButton = document.querySelector('.close-button');
    const termsTextContainer = document.getElementById('terms-text');


    // 2. DİL VERİLERİ (Tüm metinlerimiz burada)
    const languageData = {
        tr: {
            gameTitle: "Montaj Ustası",
            entryTitle: "Oyuna Hoş Geldiniz!",
            entryDescription: "Ödüllü montaj yarışmasına katılmak için bilgilerinizi girin.",
            termsLink: "Katılım Koşulları",
            submitButton: "Yarışmaya Katıl!",
            termsTitle: "Katılım Koşulları ve Gizlilik Politikası",
            termsContent: `
                <h4>1. Taraflar ve Kapsam</h4>
                <p>Bu koşullar, Kyrosil ("Organizatör") tarafından düzenlenen ve IKEA ("Sponsor") tarafından resmi olarak desteklenen 'IKEA Montaj Ustası' yarışmasının şartlarını düzenler.</p>
                <h4>2. Katılım Şartları</h4>
                <p>Katılımcıların 18 yaşını doldurmuş ve Türkiye'de ikamet ediyor olmaları gerekmektedir...</p>
                <p>(...diğer tüm maddeler buraya gelecek...)</p>
            `,
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
            termsContent: `
                <h4>1. Parties and Scope</h4>
                <p>These terms regulate the conditions for the 'IKEA Assembly Masters' competition, organized by Kyrosil ("Organizer") and officially sponsored by IKEA ("Sponsor").</p>
                <h4>2. Eligibility</h4>
                <p>Participants must be over 18 years of age and reside in Europe.</p>
                <p>(...all other clauses will be here...)</p>
            `,
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
            termsContent: `
                <h4>1. Parter och Omfattning</h4>
                <p>Dessa villkor reglerar förutsättningarna för tävlingen 'IKEA Monteringsmästare', anordnad av Kyrosil ("Arrangör") och officiellt sponsrad av IKEA ("Sponsor").</p>
                <h4>2. Deltagande</h4>
                <p>Deltagare måste vara över 18 år och bosatta i Sverige.</p>
                <p>(...alla andra klausuler kommer här...)</p>
            `,
            fullNamePlaceholder: "Fullständigt namn",
            emailPlaceholder: "E-postadress registrerad hos IKEA",
            socialUserPlaceholder: "Användarnamn på Instagram / Portal",
            termsLabel: "Jag har läst och godkänner"
        }
    };

    // 3. ANA FONKSİYON: DİLİ AYARLA
    const setLanguage = (lang) => {
        const data = languageData[lang];
        // data-lang-key attribute'u olan tüm elementleri bul ve metinlerini güncelle
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (data[key]) {
                element.textContent = data[key];
            }
        });

        // Form placeholder'larını güncelle
        document.getElementById('fullName').placeholder = data.fullNamePlaceholder;
        document.getElementById('email').placeholder = data.emailPlaceholder;
        document.getElementById('socialUser').placeholder = data.socialUserPlaceholder;

        // Katılım koşulları label'ını güncelle
        document.querySelector('label[for="terms-checkbox"]').childNodes[2].nodeValue = ` ${data.termsLabel}`;

        // HTML etiketinin dilini güncelle (önemli!)
        document.documentElement.lang = lang;
        
        // Seçilen dili tarayıcı hafızasına kaydet
        localStorage.setItem('preferredLanguage', lang);
    };


    // 4. OLAY DİNLEYİCİLERİ (EVENT LISTENERS)
    
    // Dil değiştirme butonlarına tıklandığında
    languageSwitcher.addEventListener('click', (e) => {
        // Sadece butonlara tıklandıysa çalış
        if (e.target.tagName === 'BUTTON') {
            const lang = e.target.getAttribute('data-lang');
            setLanguage(lang);
        }
    });

    // Katılım Koşulları linkine tıklandığında modal'ı aç
    termsLink.addEventListener('click', (e) => {
        e.preventDefault(); // Linkin normalde yaptığı sayfa yenileme işini engelle
        const currentLang = localStorage.getItem('preferredLanguage') || 'tr';
        termsTextContainer.innerHTML = languageData[currentLang].termsContent;
        termsModal.style.display = 'block';
    });

    // Modal'daki kapatma (X) butonuna tıklandığında modal'ı kapat
    closeModalButton.addEventListener('click', () => {
        termsModal.style.display = 'none';
    });

    // Form gönderildiğinde (Yarışmaya Katıl butonuna tıklandığında)
    entryForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Formun sayfayı yenilemesini engelle
        
        // Basit bir kontrol: Katılım koşulları işaretli mi?
        if (!termsCheckbox.checked) {
            alert('Lütfen katılım koşullarını kabul edin.');
            return; // Fonksiyonu burada durdur
        }
        
        // Diğer alanların da dolu olup olmadığını kontrol edebiliriz
        // Şimdilik basit tutuyoruz.

        // Her şey tamamsa, giriş ekranını gizle ve oyun ekranını göster
        entryScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    });


    // 5. BAŞLANGIÇ AYARLARI
    // Sayfa ilk yüklendiğinde hafızadaki dili kontrol et, yoksa Türkçe başlat
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage) {
        setLanguage(preferredLanguage);
    } else {
        setLanguage('tr');
    }
});
