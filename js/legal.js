/**
 * Legal Popups Injector - Dark Mode
 * 
 * Three popups with dark mode UI:
 * - Terms of Service (#terms)
 * - Privacy Policy (#policy)
 * - Cookies Policy (#cookies)
 */

(function() {
    // --- Configuration ---
    const config = {
        fontFamily: "'Inter', sans-serif",
        fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        gradientTop: "#121212",
        gradientBottom: "#1a1a1a",
        popupWidth: "585px" // Increased by 200px from original 385px
    };

    // --- Particle Animation Logic ---
    class Particle {
        constructor(canvas) {
            this.canvas = canvas;
            this.reset();
            this.radius = Math.random() * 2 + 1; // Slightly larger particles
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`; // More subtle particles
            this.velocity = {
                x: (Math.random() - 0.5) * 0.8,
                y: (Math.random() - 0.5) * 0.8
            };
        }

        reset() {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
        }

        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            // Bounce off edges
            if (this.x < 0 || this.x > this.canvas.width) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.y < 0 || this.y > this.canvas.height) {
                this.velocity.y = -this.velocity.y;
            }
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles(canvas, count) {
        const particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(canvas));
        }
        return particles;
    }

    function animateParticles(ctx, canvas, particles) {
        // Clear with semi-transparent for trail effect
        ctx.fillStyle = 'rgba(18, 18, 18, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        requestAnimationFrame(() => animateParticles(ctx, canvas, particles));
    }

    // --- Modern Dark Mode Content Templates ---
    const legalContent = {
        terms: `
            <div class="legal-content">
                <div class="legal-header-box">
                    <h2 class="legal-main-title">Terms of Service</h2>
                    <p class="legal-update">Last Updated: <strong>June 2023</strong></p>
                </div>
                
                <div class="legal-section">
                    <h3 class="legal-section-title">
                        <span class="legal-section-icon">📜</span>
                        Agreement to Terms
                    </h3>
                    <div class="legal-section-content">
                        <p>By accessing our services, you agree to these legally binding terms. Please read them carefully.</p>
                        <ul class="legal-list">
                            <li>You must be at least 18 years old to use our services</li>
                            <li>You are responsible for maintaining account security</li>
                            <li>Commercial use requires separate authorization</li>
                        </ul>
                    </div>
                </div>
                
                <div class="legal-section">
                    <h3 class="legal-section-title">
                        <span class="legal-section-icon">⚖️</span>
                        Intellectual Property
                    </h3>
                    <div class="legal-section-content">
                        <p>All content and technology are protected by international copyright laws.</p>
                        <div class="legal-notice">
                            <p><strong>Notice:</strong> Unauthorized use may result in legal action.</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        policy: `
            <div class="legal-content">
                <div class="legal-header-box">
                    <h2 class="legal-main-title">Privacy Policy</h2>
                    <p class="legal-update">Effective: <strong>June 2023</strong></p>
                </div>
                
                <div class="legal-section">
                    <h3 class="legal-section-title">
                        <span class="legal-section-icon">🔍</span>
                        Data Collection
                    </h3>
                    <div class="legal-section-content">
                        <p>We collect information to provide better services:</p>
                        <div class="data-grid">
                            <div class="data-item">
                                <h4>Account Data</h4>
                                <p>Name, email, contact details</p>
                            </div>
                            <div class="data-item">
                                <h4>Usage Data</h4>
                                <p>IP addresses, device information</p>
                            </div>
                            <div class="data-item">
                                <h4>Cookies</h4>
                                <p>Session and preference data</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        cookies: `
            <div class="legal-content">
                <div class="legal-header-box">
                    <h2 class="legal-main-title">Cookies Policy</h2>
                    <p class="legal-update">Version: <strong>2.1</strong></p>
                </div>
                
                <div class="legal-section">
                    <h3 class="legal-section-title">
                        <span class="legal-section-icon">🍪</span>
                        Essential Cookies
                    </h3>
                    <div class="legal-section-content">
                        <p>Required for basic functionality:</p>
                        <div class="data-grid">
                            <div class="data-item">
                                <h4>Session Cookies</h4>
                                <p>Maintain your logged-in state</p>
                            </div>
                            <div class="data-item">
                                <h4>Security Cookies</h4>
                                <p>Protect against malicious activity</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    };

    // --- CSS Injection ---
    function injectStyles() {
        const styleSheet = `
            /* Base Popup Styles */
            .bn-legal-overlay {
                font-family: ${config.fontFamily};
                position: fixed;
                top: 0; right: 0; bottom: 0; left: 0;
                background-color: rgba(0, 0, 0, 0.7);
                display: none;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                z-index: 10000;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
            }

            .bn-legal-popup-container {
                position: relative;
                width: ${config.popupWidth};
                height: 610px;
                border-radius: 16px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: flex-end;
                justify-content: center;
                overflow: hidden;
                padding-bottom: 1.25rem;
                background-image: linear-gradient(to bottom, ${config.gradientTop}, ${config.gradientBottom});
                color: #e0e0e0;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .bn-legal-particle-canvas {
                position: absolute;
                top: 0; left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
            }
            
            .bn-legal-close-button {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                color: #aaaaaa;
                z-index: 30;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                transition: all 0.2s ease;
            }
            .bn-legal-close-button:hover {
                color: white;
                transform: rotate(90deg);
            }

            .bn-legal-title {
                position: absolute;
                top: 1.5rem;
                left: 1.5rem;
                font-size: 1.75rem;
                font-weight: 600;
                color: white;
                text-align: left;
                z-index: 30;
                margin: 0;
            }

            .bn-legal-inner-box {
                width: calc(100% - 3rem);
                height: 485px;
                background-color: rgba(30, 30, 30, 0.95);
                color: #e0e0e0;
                border-radius: 12px;
                z-index: 20;
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                overflow-y: auto;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            /* Modern Dark Content Styles */
            .legal-content {
                padding: 0;
                color: #e0e0e0;
                line-height: 1.6;
                width: 100%;
            }
            
            .legal-header-box {
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .legal-main-title {
                font-size: 1.75rem;
                font-weight: 600;
                margin: 0 0 0.5rem;
                color: white;
            }
            
            .legal-update {
                font-size: 0.875rem;
                color: #aaaaaa;
                margin: 0;
            }
            
            .legal-section {
                margin-bottom: 2rem;
                background: rgba(40, 40, 40, 0.6);
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .legal-section-title {
                font-size: 1.125rem;
                font-weight: 500;
                padding: 1rem 1.5rem;
                margin: 0;
                display: flex;
                align-items: center;
                background: rgba(255, 255, 255, 0.05);
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                color: white;
            }
            
            .legal-section-icon {
                margin-right: 0.75rem;
                font-size: 1.25rem;
            }
            
            .legal-section-content {
                padding: 1.5rem;
            }
            
            .legal-list {
                padding-left: 1.25rem;
                margin: 1rem 0;
            }
            
            .legal-list li {
                margin-bottom: 0.75rem;
                position: relative;
            }
            
            .legal-list li:before {
                content: "•";
                color: rgba(255, 255, 255, 0.6);
                position: absolute;
                left: -1rem;
            }
            
            .legal-notice {
                background: rgba(0, 0, 0, 0.3);
                border-left: 3px solid rgba(255, 255, 255, 0.3);
                padding: 0.75rem 1rem;
                margin-top: 1rem;
                font-size: 0.875rem;
                border-radius: 4px;
            }
            
            .data-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                gap: 1rem;
                margin: 1.5rem 0;
            }
            
            .data-item {
                background: rgba(0, 0, 0, 0.2);
                padding: 1rem;
                border-radius: 6px;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .data-item h4 {
                margin: 0 0 0.5rem;
                font-size: 0.9375rem;
                font-weight: 500;
                color: white;
            }
            
            .data-item p {
                margin: 0;
                font-size: 0.8125rem;
                color: #aaaaaa;
                line-height: 1.5;
            }
            
            /* Scrollbar Styles */
            .bn-legal-inner-box::-webkit-scrollbar {
                width: 8px;
            }
            
            .bn-legal-inner-box::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.02);
                border-radius: 10px;
            }
            
            .bn-legal-inner-box::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
            }
            
            .bn-legal-inner-box::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.textContent = styleSheet;
        document.head.appendChild(styleElement);
    }

    // --- Popup Creation Functions ---
    function createLegalPopup(type, content) {
        const popupHTML = `
            <div id="bn-${type}-overlay" class="bn-legal-overlay">
                <div class="bn-legal-popup-container">
                    <canvas class="bn-legal-particle-canvas" id="bn-${type}-canvas"></canvas>
                    <button class="bn-legal-close-button" id="bn-${type}-close-button" aria-label="Close popup">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <h1 class="bn-legal-title">${type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</h1>
                    <div class="bn-legal-inner-box">
                        ${content}
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        initializePopupLogic(type);
    }

    function initializePopupLogic(type) {
        const overlay = document.getElementById(`bn-${type}-overlay`);
        const closeButton = document.getElementById(`bn-${type}-close-button`);
        const canvas = document.getElementById(`bn-${type}-canvas`);
        const container = overlay.querySelector('.bn-legal-popup-container');

        // Set up canvas properly to avoid stretching
        const setupCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
            
            return ctx;
        };

        const ctx = setupCanvas();
        const particles = initParticles(canvas, 40); // Fewer particles for better performance

        const hidePopup = () => {
            overlay.style.display = 'none';
            removeHash();
        };

        // Handle window resize
        const onResize = () => {
            setupCanvas();
        };

        window.addEventListener('resize', onResize);

        closeButton.addEventListener('click', hidePopup);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) hidePopup();
        });

        // Start animation
        animateParticles(ctx, canvas, particles);
    }

    // --- Helper Functions ---
    function removeHash() {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }

    // --- Global Trigger Functions ---
    function showTermsPopup() {
        const overlay = document.getElementById('bn-terms-overlay');
        if (overlay) overlay.style.display = 'flex';
    }

    function showPolicyPopup() {
        const overlay = document.getElementById('bn-policy-overlay');
        if (overlay) overlay.style.display = 'flex';
    }

    function showCookiesPopup() {
        const overlay = document.getElementById('bn-cookies-overlay');
        if (overlay) overlay.style.display = 'flex';
    }

    // --- URL Hash Handling ---
    function checkHashForPopup() {
        switch (window.location.hash) {
            case '#terms':
                showTermsPopup();
                break;
            case '#policy':
                showPolicyPopup();
                break;
            case '#cookies':
                showCookiesPopup();
                break;
        }
    }

    // --- Execution ---
    function onDOMLoaded() {
        // Inject fonts
        const fontLink = document.createElement('link');
        fontLink.href = config.fontUrl;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        // Inject styles
        injectStyles();

        // Create all three popups
        createLegalPopup('terms', legalContent.terms);
        createLegalPopup('policy', legalContent.policy);
        createLegalPopup('cookies', legalContent.cookies);
        
        // Check for hash on load
        checkHashForPopup();
        
        // Listen for hash changes
        window.addEventListener('hashchange', checkHashForPopup);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDOMLoaded);
    } else {
        onDOMLoaded();
    }

    // Expose global functions
    window.showTermsPopup = showTermsPopup;
    window.showPolicyPopup = showPolicyPopup;
    window.showCookiesPopup = showCookiesPopup;

})();