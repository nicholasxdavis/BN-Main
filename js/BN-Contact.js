/**
 * Contact Popup Injector
 *
 * This script injects a configurable contact form popup into the page.
 * All HTML, CSS, and JavaScript are self-contained.
 *
 * How it Works:
 * - The popup is created and added to the page on load, but remains hidden.
 * - It will automatically appear if the page URL ends with #contact.
 * - You can also manually display the popup by calling the global function `showContactPopup()`.
 * - Clicking the close button, the overlay, or submitting the form will hide it.
 *
 * To Use:
 * 1. Include this script in your HTML file.
 * 2. Navigate to yourpage.html#contact to see it automatically.
 * 3. Or, call `showContactPopup()` from a button click or other event.
 * e.g., <button onclick="showContactPopup()">Contact Us</button>
 */

(function() {
    // --- Configuration ---
    // Easily change the popup's appearance and behavior here.
    const config = {
        fontFamily: "'Inter', sans-serif",
        fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",

  gradientTop: "#000000",
  gradientBottom: "#484848",

        submitButtonBg: "#000000",
    };

    // --- Shared variables for component logic ---
    let canvas, container, ctx, particles = [];
    const particleCount = 50; // Increased particle count

    // --- Main Function to Create the Popup ---
    function createContactPopup() {
        // 1. Inject CSS and Fonts into the document's <head>
        const styleSheet = `
            /* Injected Font */
            @import url('${config.fontUrl}');

            /* Main Popup Styles */
            #bn-contact-overlay {
                font-family: ${config.fontFamily};
                position: fixed;
                top: 0; right: 0; bottom: 0; left: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: none; /* Hidden by default */
                align-items: center;
                justify-content: center;
                padding: 1rem;
                z-index: 10000;
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
            }

            #bn-contact-popup-container {
                position: relative;
                width: 385px; /* Increased width */
                height: 610px;
                border-radius: 1.5rem; /* rounded-3xl */
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4); /* shadow-2xl */
                display: flex;
                align-items: flex-end; /* Aligns the inner box to the bottom */
                justify-content: center;
                overflow: hidden;
                padding-bottom: 1.25rem; /* pb-5 */
background-image: linear-gradient(to bottom, ${config.gradientTop}, ${config.gradientBottom});

                color: white;
            }

            #bn-contact-particle-canvas {
                position: absolute;
                top: 0; left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
            }
            
            #bn-contact-close-button {
                position: absolute;
                top: 1.5rem; /* top-6 */
                right: 1.5rem; /* right-6 */
                color: #eeeeee;
                z-index: 30;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                transition: color 0.2s ease-in-out;
            }
            #bn-contact-close-button:hover {
                color: white;
            }

            #bn-contact-form-title {
    position: absolute;
    top: 1.5rem; /* top-8 */
    left: 1.2rem; /* left-8 */
    font-size: 1.575rem; /* text-3xl */
    font-weight: 100; /* font-bold */
    text-align: left;
    z-index: 30;
    margin: 0;
    background: linear-gradient(to bottom, white 65%, transparent 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

            #bn-contact-inner-box {
                width: 360px; /* Increased width */
                height: 485px;
                background-color: #ffffff;
            opacity: 98%;
                color: #1a1a1a;
                border-radius: 1rem; /* rounded-2xl */
                z-index: 20;
                padding: 1.5rem 2rem;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
            }
            
            .bn-contact-input-group {
                margin-bottom: 1rem;
            }

            .bn-contact-label {
                display: block;
                margin-bottom: 0.5rem; /* mb-2 */
                font-size: 0.875rem; /* text-sm */
                font-weight: 500; /* font-medium */
                color: #374151; /* text-gray-700 */
            }

            .bn-contact-input, .bn-contact-textarea {
                width: 100%;
                padding: 0.75rem; /* p-3 */
                font-size: 1rem; /* text-base */
                border: 1px solid #d1d5db; /* border-gray-300 */
                border-radius: 0.5rem; /* rounded-lg */
                box-sizing: border-box; /* Important for padding and width */
                transition: border-color 0.2s, box-shadow 0.2s;
            }
            .bn-contact-input:focus, .bn-contact-textarea:focus {
                outline: none;
                border-color: #000000;
                box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
            }

            .bn-contact-textarea {
                resize: none; /* Disabled resize to work with flex-grow */
            }

            #bn-contact-submit-btn {
                width: 100%;
                margin-top: 0.5rem; /* mt- */
                padding: 0.875rem 0; /* py-3.5 */
                color: white;
                font-weight: 600; /* font-semibold */
                font-size: 1rem;
                border-radius: 1.5rem; /* rounded-lg */
                background-color: ${config.submitButtonBg};
                transition: opacity 0.2s;
                border: none;
                cursor: pointer;
            }
            #bn-contact-submit-btn:hover {
                opacity: 0.85;
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.textContent = styleSheet;
        document.head.appendChild(styleElement);

        // 2. Define the HTML structure for the popup
        const componentHTML = `
            <div id="bn-contact-overlay">
                <div id="bn-contact-popup-container">
                    <canvas id="bn-contact-particle-canvas"></canvas>
                    <button id="bn-contact-close-button" aria-label="Close popup">
                        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h1 id="bn-contact-form-title">Contact Us</h1>
                    <div id="bn-contact-inner-box">
                        <p style="text-align: center; margin-top: 0; margin-bottom: 1.5rem; color: #4b5563;">Fill out this form, We'll get back to you as soon as possible.</p>
                        <form id="bn-contact-form" style="flex-grow: 1; display: flex; flex-direction: column;">
                            <div class="bn-contact-input-group">
                                <label for="contact-name" class="bn-contact-label">Full Name</label>
                                <input id="contact-name" type="text" class="bn-contact-input" placeholder="John Doe" required>
                            </div>
                            <div class="bn-contact-input-group">
                                <label for="contact-email" class="bn-contact-label">Email Address</label>
                                <input id="contact-email" type="email" class="bn-contact-input" placeholder="you@example.com" required>
                            </div>
                            <div class="bn-contact-input-group" style="flex-grow: 1; display: flex; flex-direction: column;">
                                <label for="contact-message" class="bn-contact-label">Message</label>
                                <textarea id="contact-message" class="bn-contact-textarea" placeholder="How can we help you?" required style="flex-grow: 1;"></textarea>
                            </div>
                            <button id="bn-contact-submit-btn" type="submit">Submit Request</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', componentHTML);

        // 3. Initialize the JavaScript logic
        initializeComponentLogic();
    }

    // --- Particle Animation Logic ---
    class Particle {
        constructor() {
            this.radius = Math.random() * 1.5 + 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`;
            this.reset();
        }

        reset() {
            if (!canvas) return;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }

        draw() {
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (!canvas) return;
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
    }

    function resizeCanvas() {
        if (!canvas || !container) return;
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }
    }

    function initParticles() {
        particles = [];
        if (!canvas || canvas.width === 0) return;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const particle of particles) {
            particle.update();
            particle.draw();
        }
        requestAnimationFrame(animate);
    }

    // --- Component Logic (Interaction) ---
    function initializeComponentLogic() {
        const overlay = document.getElementById('bn-contact-overlay');
        const closeButton = document.getElementById('bn-contact-close-button');
        const contactForm = document.getElementById('bn-contact-form');
        
        // Assign canvas elements to higher-scoped variables
        canvas = document.getElementById('bn-contact-particle-canvas');
        container = document.getElementById('bn-contact-popup-container');
        ctx = canvas.getContext('2d');

        if (!overlay || !closeButton || !contactForm || !canvas || !container) {
            console.error("Contact Popup: Could not find required elements.");
            return;
        }

        const hidePopup = () => {
            overlay.style.display = 'none';
            if (history.pushState) {
                history.pushState("", document.title, window.location.pathname + window.location.search);
            } else {
                window.location.hash = '';
            }
        };

        // --- Form Submission ---
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            
            console.log("--- Contact Form Submitted ---");
            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Message:", message);
            
            alert("Thank you for your message! We'll be in touch.");
            hidePopup();
            contactForm.reset();
        });

        // --- Close Logic ---
        closeButton.addEventListener('click', hidePopup);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                hidePopup();
            }
        });
        
        // --- Event listener for window resize using ResizeObserver ---
        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
            initParticles();
        });
        resizeObserver.observe(container);

        // Start the animation loop
        animate();
    }

    // --- Global Trigger Function ---
    function showContactPopup() {
        const overlay = document.getElementById('bn-contact-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
            // Now that the popup is visible, initialize the canvas
            resizeCanvas();
            initParticles();
        } else {
            console.error("Contact Popup: Overlay element not found. Was createContactPopup() called?");
        }
    }

    // --- URL Hash Handling ---
    function checkHashForPopup() {
        if (window.location.hash === '#contact') {
            showContactPopup();
        }
    }

    // --- Execution ---
    function onDOMLoaded() {
        createContactPopup();
        checkHashForPopup();
        window.addEventListener('hashchange', checkHashForPopup, false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDOMLoaded);
    } else {
        onDOMLoaded();
    }

    window.showContactPopup = showContactPopup;

})();
