// Инициализация частиц
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.innerHTML = '⚡';
    particle.style.position = 'absolute';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particle.style.zIndex = '1';
    particle.style.pointerEvents = 'none';
    particle.style.transition = 'all 2s ease-out';
    
    container.appendChild(particle);

    // Анимация частицы
    function animateParticle() {
        const newX = Math.random() * 100;
        const newY = Math.random() * 100;
        const newSize = Math.random() * 20 + 10;
        const newOpacity = Math.random() * 0.3 + 0.1;

        particle.style.transition = `all ${Math.random() * 3 + 2}s ease-in-out`;
        particle.style.left = newX + '%';
        particle.style.top = newY + '%';
        particle.style.fontSize = newSize + 'px';
        particle.style.opacity = newOpacity;
    }

    // Запускаем анимацию каждые 3-5 секунд
    setInterval(animateParticle, Math.random() * 2000 + 3000);
    // Первая анимация
    setTimeout(animateParticle, Math.random() * 1000);
}

// Управление мобильным меню
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Анимация меню-бургера
menuToggle.addEventListener('click', function() {
    const spans = this.querySelectorAll('span');
    spans[0].style.transform = this.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = this.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = this.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
});

// Функция копирования IP
function copyIP() {
    const ip = 'phobos.minecraft-hosting.net:25405';
    navigator.clipboard.writeText(ip).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.background = 'var(--success)';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

// Плавная прокрутка
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Учитываем высоту хедера
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Добавляем обработчики для плавной прокрутки
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за карточками и секциями
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем частицы
    initParticles();
    
    // Добавляем анимации для элементов
    const animatedElements = document.querySelectorAll('.about-card, .step-card, .feature-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Анимация для герой секции
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Добавляем интерактивность для карточек
document.querySelectorAll('.about-card, .feature-card, .step-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('animated')) {
            this.style.transform = 'translateY(-5px)';
        }
    });
});

// Трекер для аналитики (опционально)
function trackDiscordClicks() {
    const discordLinks = document.querySelectorAll('a[href*="discord"]');
    discordLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Здесь можно добавить код для аналитики
            console.log('Discord ссылка была нажата');
        });
    });
}

// Запускаем трекер при загрузке
document.addEventListener('DOMContentLoaded', trackDiscordClicks);

// Обновляем год в футере
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
});