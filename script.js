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

const burger = document.getElementById('burger');
const dropdown = document.getElementById('dropdown');

// Funktion til at åbne/lukke scroll
function toggleScroll(isOpen) {
  if (isOpen) {
    document.body.classList.add('menu-open');
    document.documentElement.classList.add('menu-open');
  } else {
    document.body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open');
  }
}

// Åbn/luk burger
burger.addEventListener('click', (event) => {
  event.stopPropagation();
  
  const isOpen = burger.classList.toggle('open');
  dropdown.classList.toggle('open');
  
  toggleScroll(isOpen);
});

// Klik på baggrunden lukker menuen
dropdown.addEventListener('click', (event) => {
  if (event.target === dropdown) {
    burger.classList.remove('open');
    dropdown.classList.remove('open');
    toggleScroll(false);
  }
});


// Klik på baggrunden lukker menuen
dropdown.addEventListener('click', (event) => {
  // Hvis man klikker på baggrunden (ikke links)
  if (event.target === dropdown) {
    burger.classList.remove('open');
    dropdown.classList.remove('open');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.querySelector(".contact2 textarea");
  const contactBox = document.querySelector(".contact2");

  // Forhindrer at klik inde i tekstfeltet lukker forældre-boksen
  if (textarea) {
    textarea.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  // Hvis hele formularen driller, stopper vi kliks i hele boksen:
  if (contactBox) {
    contactBox.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }
});

// --- SLIDER & MODAL FUNKTIONALITET ---
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');
const slidesWrapper = document.getElementById('slidesWrapper');

let currentSlide = 0;

if (slides.length > 0) {
    // 1. Generer prikker dynamisk efter antal slides
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
            if (dots[index]) {
                dots[index].classList.toggle('active', index === currentSlide);
            }
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    });

    // 2. Touch/Swipe funktionalitet til mobil
    let touchStartX = 0;
    let touchEndX = 0;

    slidesWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slidesWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 40; // Hvor mange px fingeren skal flyttes for at skifte
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swiped venstre -> Næste slide
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swiped højre -> Forrige slide
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlides();
        }
    }

    // 3. Modal (Pop-up) specifikationer
    const modal = document.getElementById('artModal');
    const closeModal = document.getElementById('closeModal');

    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            document.getElementById('modalTitle').textContent = slide.dataset.title;
            document.getElementById('modalYear').textContent = slide.dataset.year;
            document.getElementById('modalTech').textContent = slide.dataset.tech;
            document.getElementById('modalDesc').textContent = slide.dataset.desc;
            
            modal.classList.add('open');
        });
    });

    closeModal.addEventListener('click', () => modal.classList.remove('open'));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
    });
}

// --- GALLERI FILTRERING & MODAL ---
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryItems.length > 0) {
    // 1. Filtreringslogik
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Skift aktiv knap
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.dataset.filter;

            galleryItems.forEach(item => {
                const itemCategory = item.dataset.category;

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 2. Klik på galleri-kort åbner Pop-up Modal
    const artModal = document.getElementById('artModal');
    const closeModal = document.getElementById('closeModal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            document.getElementById('modalTitle').textContent = item.dataset.title;
            document.getElementById('modalYear').textContent = item.dataset.year;
            document.getElementById('modalTech').textContent = item.dataset.tech;
            document.getElementById('modalDesc').textContent = item.dataset.desc;
            
            artModal.classList.add('open');
        });
    });

    if (closeModal && artModal) {
        closeModal.addEventListener('click', () => artModal.classList.remove('open'));
        artModal.addEventListener('click', (e) => {
            if (e.target === artModal) artModal.classList.remove('open');
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const mediaModal = document.getElementById('mediaModal');
    const mediaContainer = document.getElementById('mediaContainer');
    const closeModal = document.getElementById('closeModal');

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Hvis man trykker på "Læs om projektet", skal pop-up med billede/video IKKE åbne
            if (e.target.classList.contains('info-btn')) {
                return;
            }

            const mediaType = item.getAttribute('data-type');
            const mediaSrc = item.getAttribute('data-media');

            if (!mediaSrc) return;

            // Tøm containeren først
            mediaContainer.innerHTML = '';

            if (mediaType === 'video') {
                // Skab et video-element til Moving Art projektet
                mediaContainer.innerHTML = `
                    <video controls autoplay style="width:100%;">
                        <source src="${mediaSrc}" type="video/mp4">
                    </video>
                `;
            } else {
                // Skab et almindeligt billede-element til resten af kortene
                mediaContainer.innerHTML = `<img src="${mediaSrc}" alt="Forstørret billede">`;
            }

            mediaModal.classList.add('open');
        });
    });

    // Luk funktion
    function closePopup() {
        if (mediaModal) {
            mediaModal.classList.remove('open');
            mediaContainer.innerHTML = ''; // Stopper videoen/fjerner billedet når der lukkes
        }
    }

    if (closeModal) closeModal.addEventListener('click', closePopup);
    
    if (mediaModal) {
        mediaModal.addEventListener('click', (e) => {
            if (e.target === mediaModal) closePopup();
        });
    }
});