// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Обработчик для кнопки CTA
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#history').scrollIntoView({
        behavior: 'smooth'
    });
});

// Добавляем анимацию при скролле
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

// Наблюдаем за элементами
document.querySelectorAll('.history-content, .gallery-item, .value-card, .congratulations-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Меняем цвет навигации при скролле
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(135deg, rgba(0, 57, 166, 0.95) 0%, rgba(213, 43, 30, 0.95) 100%)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #0039a6 0%, #d52b1e 100%)';
        navbar.style.backdropFilter = 'none';
    }
});

// Добавляем патриотичные эффекты
document.addEventListener('DOMContentLoaded', function() {
    // Создаем падающие "листья" или "снежинки" в цветах флага
    function createParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = '🕊';
        particle.style.position = 'fixed';
        particle.style.top = '-50px';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.fontSize = (Math.random() * 50 + 30) + 'px';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.zIndex = '1';
        particle.style.pointerEvents = 'none';
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: particle.style.opacity },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
    
    // Создаем частицы каждые 300ms
    setInterval(createParticle, 300);
});

// Добавляем интерактивность для карточек ценностей
document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Функция для показа случайного патриотичного сообщения
const patrioticMessages = [
    "Россия - это мы!",
    "В единстве наша сила!",
    "Слава России!",
    "Вместе мы непобедимы!",
    "За Родину!",
    "Россия вперёд!"
];

function showRandomMessage() {
    const message = patrioticMessages[Math.floor(Math.random() * patrioticMessages.length)];
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #0039a6, #d52b1e);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 2rem;
        font-weight: bold;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(messageEl);
    
    setTimeout(() => messageEl.style.opacity = '1', 100);
    setTimeout(() => {
        messageEl.style.opacity = '0';
        setTimeout(() => messageEl.remove(), 300);
    }, 2000);
}

// Показываем случайное сообщение при клике на логотип
document.querySelector('.logo').addEventListener('click', showRandomMessage);