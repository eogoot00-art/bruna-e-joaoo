// Animações suaves ao fazer scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const textLines = entry.target.querySelectorAll('.text-line');
            textLines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('visible');
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Observar todas as seções
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Observer para adicionar classe 'aparecer' nas seções
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('aparecer');
    }
  });
}, {
  threshold: 0.3
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Observar fotos da galeria para animação
const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observar todas as fotos
document.querySelectorAll('.photo-item').forEach(photo => {
    photoObserver.observe(photo);
});

// Criar partículas de coração ao clicar
document.addEventListener('click', (e) => {
    createHeartParticle(e.clientX, e.clientY);
});

// Criar partículas aleatórias periodicamente
setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight + 20;
    createHeartParticle(x, y);
}, 3000);

function createHeartParticle(x, y) {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💞'];
    const heart = hearts[Math.floor(Math.random() * hearts.length)];
    
    const particle = document.createElement('div');
    particle.className = 'heart-particle';
    particle.textContent = heart;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    // Adicionar movimento horizontal aleatório
    const randomX = (Math.random() - 0.5) * 100;
    particle.style.setProperty('--random-x', randomX + 'px');
    
    document.body.appendChild(particle);
    
    // Remover após animação
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// Efeito parallax suave no scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Animar corações de fundo
    const hearts = document.querySelector('.hearts-background');
    if (hearts) {
        hearts.style.transform = `translateY(${scrollTop * 0.1}px)`;
    }
    
    lastScrollTop = scrollTop;
});

// Adicionar mais corações de fundo dinamicamente
function createBackgroundHearts() {
    const heartsContainer = document.querySelector('.hearts-background');
    const heartEmojis = ['💕', '💖', '💗'];
    
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = (15 + Math.random() * 15) + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.opacity = 0.1 + Math.random() * 0.2;
        heart.style.animation = `float ${10 + Math.random() * 10}s infinite ease-in-out`;
        heart.style.animationDelay = Math.random() * 5 + 's';
        heartsContainer.appendChild(heart);
    }
}

// Inicializar corações de fundo
createBackgroundHearts();

// Suavizar scroll entre seções
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('mouseenter', () => {
        section.style.transition = 'all 0.3s ease';
    });
});

// Adicionar efeito de brilho sutil nos textos principais
const coverText = document.querySelector('.cover h1');
if (coverText) {
    setInterval(() => {
        coverText.style.textShadow = '0 0 20px rgba(139, 74, 107, 0.3)';
        setTimeout(() => {
            coverText.style.textShadow = 'none';
        }, 1000);
    }, 5000);
}

// Adicionar corações flutuantes ao passar o mouse sobre textos
document.querySelectorAll('.text-line, .final-line').forEach(line => {
    line.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createHeartParticle(
                    rect.left + rect.width / 2 + (Math.random() - 0.5) * 50,
                    rect.top + rect.height / 2
                );
            }, i * 100);
        }
    });
});

// Mensagem especial no console (detalhe fofo escondido)
console.log('%c💕 Um mês especial... 💕', 'color: #8b4a6b; font-size: 20px; font-weight: bold;');
console.log('%cVocê é especial demais! ✨', 'color: #a67a8f; font-size: 14px;');
console.log('%cDesde 7 de dezembro de 2025 💖', 'color: #c99ab0; font-size: 12px;');

// Adicionar efeito especial ao passar mouse nas fotos
document.querySelectorAll('.photo-wrapper').forEach(wrapper => {
    wrapper.addEventListener('mouseenter', function() {
        // Criar partículas de coração ao redor da foto
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const angle = (i * 72) * Math.PI / 180;
                const x = centerX + Math.cos(angle) * 60;
                const y = centerY + Math.sin(angle) * 60;
                createHeartParticle(x, y);
            }, i * 50);
        }
    });
});

// Contador de dias desde o início do namoro
function updateDaysCounter() {
    const startDate = new Date('2025-12-07');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Adicionar contador sutil na página (opcional)
    const counter = document.createElement('div');
    counter.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(10, 14, 39, 0.7);
        padding: 10px 15px;
        border-radius: 20px;
        font-size: 12px;
        color: #10b981;
        z-index: 1000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(59, 130, 246, 0.3);
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.2), 0 0 40px rgba(59, 130, 246, 0.1);
        text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
    `;
    counter.innerHTML = `💕 ${diffDays} dias juntos 💕`;
    document.body.appendChild(counter);
}

// Atualizar contador quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateDaysCounter);
} else {
    updateDaysCounter();
}

// Tratar erro de carregamento das imagens
document.querySelectorAll('.photo').forEach(img => {
    img.addEventListener('error', function() {
        // Se a imagem não carregar, mostrar placeholder
        this.style.display = 'none';
        const wrapper = this.closest('.photo-wrapper');
        if (wrapper) {
            wrapper.style.background = 'linear-gradient(135deg, #ffeef8 0%, #fff5f9 100%)';
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 50px;
                opacity: 0.3;
                z-index: 1;
            `;
            placeholder.textContent = '💕';
            wrapper.appendChild(placeholder);
        }
    });
    
    // Garantir que a imagem seja exibida se carregar
    img.addEventListener('load', function() {
        this.style.display = 'block';
        this.style.opacity = '1';
    });
});