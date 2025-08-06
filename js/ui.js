document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('cta-particles');
    const container = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }
    }

    class Particle {
        constructor() {
            this.radius = Math.random() * 1.5 + 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`;
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
                this.x = Math.random() * canvas.width;
                this.y = Math.random() > 0.5 ? 0 : canvas.height;
            }
        }
    }

    function initParticles() {
        particles = [];
        if (canvas.width > 0) {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const particle of particles) {
            particle.update();
            particle.draw();
        }

        requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
        initParticles();
    });

    if (container) {
        resizeObserver.observe(container);
    }

    resizeCanvas();
    initParticles();
    animate();
});

document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const header = document.querySelector('.header');
    const headerContent = document.querySelector('.header-content');
    const logo = document.querySelector('.logo');
    const yearSpan = document.getElementById('year');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const openMenu = () => {
        mobileMenu.classList.replace('closed', 'open');
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.replace('open', 'closed');
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    };

    mobileMenuButton.addEventListener('click', openMenu);
    closeMenuButton.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    const handleScroll = () => {
        const isScrolled = window.scrollY > 50;
        header.classList.toggle('scrolled', isScrolled);
        headerContent.classList.toggle('h-16', isScrolled);
        headerContent.classList.toggle('h-24', !isScrolled);
        logo.classList.toggle('h-12', isScrolled);
        logo.classList.toggle('h-20', !isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
});
