console.log("Rikke Horn Frederiksen");

window.addEventListener('scroll', function() {
    const hero = document.getElementById('hero-background');
    if (hero) {
        let scrollPosition = window.pageYOffset;
        
        // Vi dividerer med et højere tal (f.eks. 100) for at gøre sløringen langsommere
        let blurValue = scrollPosition / 100; 

        // Sæt et lavt max (f.eks. 8px). Det er nok til at gøre baggrunden rolig, 
        // men ikke så meget at det ligner en fejl eller gør ondt i øjnene.
        if (blurValue > 8) blurValue = 8;

        hero.style.filter = `blur(${blurValue}px)`;
    }
});

window.addEventListener('scroll', function() {
    const heroBg = document.getElementById('hero-background');
    const heroText = document.getElementById('hero-text');
    
    let scrollPosition = window.pageYOffset;

    // 1. Håndter baggrunds-sløring (max 8px for at skåne øjnene)
    if (heroBg) {
        let blurValue = scrollPosition / 100;
        if (blurValue > 8) blurValue = 8;
        heroBg.style.filter = `blur(${blurValue}px)`;
    }

    // 2. Håndter tekst-fade (fader ud over 300 pixels scroll)
    if (heroText) {
        let textOpacity = 1 - (scrollPosition / 300);
        
        if (textOpacity < 0) textOpacity = 0;
        heroText.style.opacity = textOpacity;
        
        // Valgfrit: Flyt teksten lidt opad mens den fader for en "float" effekt
        heroText.style.transform = `translateY(-${scrollPosition * 0.2}px)`;
    }
});