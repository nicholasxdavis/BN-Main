/**
 * BN Network Upgrade Button Injector
 * * This script injects a configurable, animated "call to action" button
 * into the page. All HTML, CSS, and JavaScript are self-contained.
 * * To use, simply include this script in your HTML file.
 * To configure, edit the 'config' object below.
 */

(function() {
    // --- Configuration ---
    // Easily change the button's appearance and behavior here.
    const config = {
        buttonTitle: "Let's Build Together",
        description: "Elevate Your Digital Presence",
        upgradeLink: "https://www.blacnova.net/#quote",
        particleColor: "#eeeeee",
        fontFamily: "'Inter', sans-serif",
        fontUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
    };

    // --- Main Function to Create the Button ---
    function createBNNetworkButton() {
        // 1. Inject CSS and Fonts into the document's <head>
        const styleSheet = `
            /* Injected Font */
            @import url('${config.fontUrl}');

            /* Main Component Styles */
            #bn-network-popup {
                font-family: ${config.fontFamily};
                position: fixed;
                bottom: 1.25rem;
                right: 1.25rem;
                padding: 1.25rem;
                width: calc(100% - 40px);
                background-color: #000;
                color: #fff;
                border: 1px solid #2d3748; /* border-gray-800 */
                cursor: pointer;
                border-radius: 1.5rem; /* rounded-3xl */
                display: flex;
                align-items: center;
                gap: 1rem;
                transition: transform 0.3s ease-in-out;
                z-index: 9999;
            }
            
            #bn-network-popup:hover {
                transform: scale(1.01);
            }

            @media (min-width: 640px) { /* sm: breakpoint */
                #bn-network-popup {
                    width: auto;
                    min-width: 249px;
                }
            }

            #bn-network-popup #particle-canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 1.5rem; /* rounded-3xl */
            }
            
            #bn-network-popup .bn-gradient-blur {
                position: absolute;
                inset: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 0;
                overflow: hidden;
                border-radius: 1.5rem;
            }

            #bn-network-popup .bn-gradient-blur > div {
                width: 20rem; /* w-80 */
                height: 20rem; /* h-80 */
                background-image: linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1), rgba(79, 70, 229, 0.1));
                opacity: 0.2;
                position: absolute;
                filter: blur(2rem); /* blur-3xl */
                border-radius: 9999px; /* rounded-full */
            }

            #bn-network-popup #close-bn-popup {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                height: 1.5rem; /* h-6 */
                width: 1.5rem; /* w-6 */
                border-radius: 9999px; /* rounded-full */
                position: absolute;
                transition: all 0.3s;
                transform: scale(0.5);
                opacity: 0;
                top: -0.375rem; /* -top-1.5 */
                right: -0.375rem; /* -right-1.5 */
                border: 1px solid rgba(255, 255, 255, 0.1);
                background-color: #000;
                color: #fff;
                z-index: 99;
            }

            #bn-network-popup:hover #close-bn-popup {
                opacity: 1;
                transform: scale(1);
            }
            
            #bn-network-popup #close-bn-popup:hover {
                 background-color: #1f2937; /* hover:bg-gray-800 */
            }

            #bn-network-popup .bn-content-wrapper {
                width: 100%;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            #bn-network-popup .bn-title {
                color: #fff;
                font-weight: 700;
                font-size: 1rem; /* text-base */
                margin-bottom: 0.125rem; /* mb-0.5 */
            }

            #bn-network-popup .bn-description {
                color: #9ca3af; /* text-gray-400 */
                font-size: 0.75rem; /* text-xs */
                margin-right: 1rem; /* mr-4 */
            }

            #bn-network-popup .bn-upgrade-link {
                position: relative;
                right: -3px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                cursor: pointer;
                height: 2.25rem; /* h-9 */
                padding: 0.375rem 0.875rem; /* px-3.5 py-1.5 */
                border-radius: 9999px; /* rounded-full */
                font-size: 0.875rem; /* text-sm */
                font-weight: 600; /* font-semibold */
                z-index: 10;
                background-color: #fff;
                color: #000;
                text-decoration: none;
                transition: background-color 0.2s;
            }
            
            #bn-network-popup .bn-upgrade-link:hover {
                 background-color: #e5e7eb; /* hover:bg-gray-200 */
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.textContent = styleSheet;
        document.head.appendChild(styleElement);

        // 2. Define the HTML structure for the button
        const componentHTML = `
            <div id="bn-network-popup" role="button">
                <canvas id="particle-canvas"></canvas>
                <div class="bn-gradient-blur"><div></div></div>
                <button id="close-bn-popup" type="button" aria-label="Hide upsell banner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="stroke-width: 2; width: 1rem; height: 1rem;">
                        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor"></path>
                    </svg>
                </button>
                <div class="bn-content-wrapper">
                    <div>
                        <div class="bn-title">${config.buttonTitle}</div>
                        <p class="bn-description">${config.description}</p>
                    </div>
                    <a href="${config.upgradeLink}" target="_blank" rel="noopener noreferrer" class="bn-upgrade-link">
                        Start Now
                    </a>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', componentHTML);

        // 3. Initialize the JavaScript logic (particles, event listeners)
        initializeComponentLogic();
    }

    // --- Component Logic (Animation and Interaction) ---
    function initializeComponentLogic() {
        const popup = document.getElementById('bn-network-popup');
        const closeButton = document.getElementById('close-bn-popup');
        const canvas = document.getElementById('particle-canvas');
        
        if (!popup || !closeButton || !canvas) {
            console.error("BN Network Button: Could not find required elements.");
            return;
        }

        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 25;

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 1.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = config.particleColor;
                ctx.fill();
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
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

        // Event Listeners
        closeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            popup.style.display = 'none';
        });

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        // Initial setup
        resizeCanvas();
        initParticles();
        animate();
    }

    // --- Execution ---
    // Wait for the DOM to be fully loaded before creating the button.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createBNNetworkButton);
    } else {
        createBNNetworkButton();
    }

})();
