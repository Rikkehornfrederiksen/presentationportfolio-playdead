console.log("Rikke Horn Frederiksen");

// ==========================================
// SCROLL-EFFEKTER (HERO SLØRING & TEXT FADE)
// ==========================================
window.addEventListener('scroll', function() {
    const heroBg = document.getElementById('hero-background');
    const heroText = document.getElementById('hero-text');
    
    let scrollPosition = window.pageYOffset;

    // 1. Håndter baggrunds-sløring (max 8px)
    if (heroBg) {
        let blurValue = scrollPosition / 100;
        if (blurValue > 8) blurValue = 8;
        heroBg.style.filter = `blur(${blurValue}px)`;
    }

    // 2. Håndter tekst-fade
    if (heroText) {
        let textOpacity = 1 - (scrollPosition / 300);
        if (textOpacity < 0) textOpacity = 0;
        heroText.style.opacity = textOpacity;
        heroText.style.transform = `translateY(-${scrollPosition * 0.2}px)`;
    }
});


// ==========================================
// BURGER-MENU & DROPDOWN
// ==========================================
const burger = document.getElementById('burger');
const dropdown = document.getElementById('dropdown');

function toggleScroll(isOpen) {
    if (isOpen) {
        document.body.classList.add('menu-open');
        document.documentElement.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');
    }
}

if (burger && dropdown) {
    burger.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = burger.classList.toggle('open');
        dropdown.classList.toggle('open');
        toggleScroll(isOpen);
    });

    dropdown.addEventListener('click', (event) => {
        if (event.target === dropdown) {
            burger.classList.remove('open');
            dropdown.classList.remove('open');
            toggleScroll(false);
        }
    });
}


// ==========================================
// KONTAKTFORMULAR EVENT STOPPING
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector(".contact2 textarea");
    const contactBox = document.querySelector(".contact2");

    if (textarea) {
        textarea.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    if (contactBox) {
        contactBox.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }
});


// ==========================================
// SLIDER & MODAL FUNKTIONALITET
// ==========================================
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');
const slidesWrapper = document.getElementById('slidesWrapper');

let currentSlide = 0;

if (slides.length > 0) {
    if (dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

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

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlides();
        });
    }

    // Touch/Swipe
    if (slidesWrapper) {
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
            const swipeThreshold = 40;
            if (touchStartX - touchEndX > swipeThreshold) {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlides();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlides();
            }
        }
    }

    // Art Modal
    const modal = document.getElementById('artModal');
    const closeModal = document.getElementById('closeModal');

    if (modal) {
        slides.forEach(slide => {
            slide.addEventListener('click', () => {
                const titleEl = document.getElementById('modalTitle');
                const yearEl = document.getElementById('modalYear');
                const techEl = document.getElementById('modalTech');
                const descEl = document.getElementById('modalDesc');

                if (titleEl) titleEl.textContent = slide.dataset.title || '';
                if (yearEl) yearEl.textContent = slide.dataset.year || '';
                if (techEl) techEl.textContent = slide.dataset.tech || '';
                if (descEl) descEl.textContent = slide.dataset.desc || '';
                
                modal.classList.add('open');
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => modal.classList.remove('open'));
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('open');
        });
    }
}


// ==========================================
// GALLERI FILTRERING & POPUP MODAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // 1. FILTRERING AF GALLERI
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.dataset.filter;

                galleryItems.forEach(item => {
                    const itemCategory = item.dataset.type;

                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // 2. MODAL ELEMENTER
    const mediaModal = document.getElementById('mediaModal');
    const mediaContainer = document.getElementById('mediaContainer');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeModal = document.getElementById('closeModal');

    // 3. KLIK PÅ BILLEDE/CARD -> VIS KUN MEDIE
  document.querySelectorAll('.card-inner').forEach(card => {
        card.addEventListener('click', function(e) {
            if (this.classList.contains('no-popup')) return;

            e.preventDefault();
            e.stopPropagation();

            const galleryItem = this.closest('.gallery-item');
            if (!galleryItem) return;

            const type = galleryItem.getAttribute('data-type');
            const mediaSrc = galleryItem.getAttribute('data-media');

            // Tømmer titel og beskrivelse, så der KUN vises medie i popuppen
            if (modalTitle) modalTitle.textContent = '';
            if (modalDesc) modalDesc.textContent = '';

            if (mediaContainer && mediaSrc) {
                if (type === 'video') {
                    mediaContainer.innerHTML = `
                        <video controls autoplay style="width:100%; max-height:75vh;">
                            <source src="${mediaSrc}" type="video/mp4">
                        </video>
                    `;
                } else {
                    mediaContainer.innerHTML = `<img src="${mediaSrc}" alt="Stort billede">`;
                }
            }

            if (mediaModal) {
                mediaModal.classList.add('open');
                mediaModal.style.display = 'flex';
                mediaModal.style.opacity = '1';
                mediaModal.style.visibility = 'visible';
            }
        });
    });
    // 4. KLIK PÅ KNAP -> VIS KUN TEKST
    document.querySelectorAll('.open-modal-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const title = button.getAttribute('data-title');
            const desc = button.getAttribute('data-desc');

            if (mediaContainer) mediaContainer.innerHTML = '';

            if (modalTitle) modalTitle.textContent = title || '';
            if (modalDesc) modalDesc.textContent = desc || '';

            if (mediaModal) {
                mediaModal.classList.add('open');
                mediaModal.style.display = 'flex';
                mediaModal.style.opacity = '1';
                mediaModal.style.visibility = 'visible';
            }
        });
    });

    // 5. LUK POPUP FUNKTION
    function closePopup() {
        if (mediaModal) {
            mediaModal.classList.remove('open');
            mediaModal.style.display = 'none';
            mediaModal.style.opacity = '0';
            mediaModal.style.visibility = 'hidden';
        }
        if (mediaContainer) {
            mediaContainer.innerHTML = '';
        }
    }

    if (closeModal) {
        closeModal.addEventListener('click', closePopup);
    }

    if (mediaModal) {
        mediaModal.addEventListener('click', (e) => {
            if (e.target === mediaModal) {
                closePopup();
            }
        });
    }

});