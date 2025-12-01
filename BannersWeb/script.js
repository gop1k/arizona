// Конфигурация
const CONFIG = {
    downloadUrl: 'extension.crx', // Ссылка на скачивание CRX файла
    fileName: 'arizona-banners.crx' // Имя файла для скачивания
};

// Инициализация ссылки скачивания
function initDownloadLink() {
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = CONFIG.downloadUrl;
    downloadLink.download = CONFIG.fileName;
}

// Создание анимированных частиц на фоне
function createParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        bgAnimation.appendChild(particle);
    }
}

// Анимация при клике
function downloadExtension() {
    const card = document.querySelector('.browser-card');
    const btn = document.querySelector('.download-btn');

    card.style.transform = 'scale(0.95)';
    btn.classList.remove('pulse');

    setTimeout(() => {
        card.style.transform = '';
        setTimeout(() => {
            btn.classList.add('pulse');
        }, 1000);
    }, 150);
}

// Обработчик для ссылки chrome://extensions/
function initChromeLinks() {
    const chromeLinks = document.querySelectorAll('.chrome-link');
    chromeLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            try {
                // Пытаемся открыть в новом окне
                window.open(url, '_blank');
            } catch (error) {
                // Если не получается, показываем инструкцию
                alert('Скопируйте и вставьте в адресную строку: chrome://extensions/');
            }
        });
    });
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', function () {
    initDownloadLink();
    createParticles();
    initChromeLinks();
});

// Параллакс эффект для фона
document.addEventListener('mousemove', function (e) {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        particle.style.transform += ` translate(${x}px, ${y}px)`;
    });
});
