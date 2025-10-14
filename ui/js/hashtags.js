document.addEventListener('DOMContentLoaded', function() {
    // Service content definitions with hero icons
    const services = {
        'web-development': {
            icon: 'fas fa-laptop-code',
            title: 'Web Development Services',
            description: 'Comprehensive solutions to build, optimize, and maintain your digital presence.',
            features: [
                {
                    icon: 'fas fa-laptop-code',
                    title: 'Custom Website Development',
                    description: 'We build responsive, high-performing websites that are secure, scalable, and tailored to your brand. From simple landing pages to complex web applications, our solutions drive user engagement and conversions.',
                    points: [
                        'Mobile-first responsive design',
                        'Custom functionality development',
                        'Performance optimization',
                        'SEO-friendly architecture'
                    ]
                },
                {
                    icon: 'fas fa-shopping-cart',
                    title: 'E-Commerce Solutions',
                    description: 'Launch and grow your online store with our end-to-end e-commerce solutions. We build secure, user-friendly platforms with seamless payment gateway integration that boost sales.',
                    points: [
                        'Product catalog management',
                        'Secure checkout systems',
                        'Inventory and order tracking',
                        'Marketing tools integration'
                    ]
                },
                {
                    icon: 'fas fa-cogs',
                    title: 'CMS Integration',
                    description: 'Take control of your content with our easy-to-use content management solutions. Update your website without needing developer assistance.',
                    points: [
                        'WordPress, Craft CMS, and custom',
                        'Intuitive admin interfaces',
                        'Role-based access control',
                        'Content versioning'
                    ]
                }
            ]
        },
        'graphic-design': {
            icon: 'fas fa-palette',
            title: 'Graphic Design Services',
            description: 'Visual storytelling that captivates your audience and strengthens your brand identity.',
            features: [
                {
                    icon: 'fas fa-palette',
                    title: 'Brand Identity Design',
                    description: 'Create a memorable brand identity with custom logos, color schemes, and visual elements that authentically represent your business values.',
                    points: [
                        'Logo design and branding',
                        'Color palette development',
                        'Typography selection',
                        'Brand style guides'
                    ]
                },
                {
                    icon: 'fas fa-images',
                    title: 'Marketing Materials',
                    description: 'Design compelling marketing materials that capture attention and communicate your message effectively across all channels.',
                    points: [
                        'Brochures and flyers',
                        'Social media graphics',
                        'Presentation design',
                        'Advertisement layouts'
                    ]
                },
                {
                    icon: 'fas fa-pencil-alt',
                    title: 'Digital Illustrations',
                    description: 'Custom illustrations that enhance your content and create a unique visual experience for your audience.',
                    points: [
                        'Custom artwork creation',
                        'Infographic design',
                        'Icon and element design',
                        'Visual storytelling'
                    ]
                }
            ]
        },
        'seo-optimization': {
            icon: 'fas fa-search',
            title: 'SEO Optimization Services',
            description: 'Boost your online visibility with tailored SEO strategies that drive organic traffic and increase conversions.',
            features: [
                {
                    icon: 'fas fa-chart-line',
                    title: 'On-Page SEO',
                    description: 'Optimize your website\'s content and structure to rank higher on search engines and attract qualified leads that convert.',
                    points: [
                        'Keyword research and optimization',
                        'Meta tags and descriptions',
                        'Content optimization',
                        'Internal linking strategies'
                    ]
                },
                {
                    icon: 'fas fa-link',
                    title: 'Off-Page SEO',
                    description: 'Build your website\'s authority through strategic link-building and online reputation management that establishes trust.',
                    points: [
                        'High-quality backlink acquisition',
                        'Guest posting and outreach',
                        'Social media signals',
                        'Local SEO optimization'
                    ]
                },
                {
                    icon: 'fas fa-tools',
                    title: 'Technical SEO',
                    description: 'Ensure your website is crawlable, fast, and secure to maximize search engine performance and user experience.',
                    points: [
                        'Site speed optimization',
                        'Mobile usability improvements',
                        'XML sitemap and robots.txt',
                        'Structured data implementation'
                    ]
                }
            ]
        },
        'cloud-solutions': {
            icon: 'fas fa-cloud',
            title: 'Cloud Solutions Services',
            description: 'Harness the power of the cloud to enhance scalability, security, and efficiency for your business operations.',
            features: [
                {
                    icon: 'fas fa-cloud-upload-alt',
                    title: 'Cloud Migration',
                    description: 'Seamlessly transition your applications and data to the cloud with minimal downtime and disruption to your business.',
                    points: [
                        'Migration strategy and planning',
                        'Data transfer and validation',
                        'Application re-architecture',
                        'Post-migration support'
                    ]
                },
                {
                    icon: 'fas fa-server',
                    title: 'Infrastructure Management',
                    description: 'Optimize and maintain your cloud infrastructure for performance, cost-efficiency, and reliability that scales with your business.',
                    points: [
                        'Automated scaling solutions',
                        'Cost optimization strategies',
                        'Security and compliance',
                        'Monitoring and alerts'
                    ]
                },
                {
                    icon: 'fas fa-code-branch',
                    title: 'Cloud-Native Development',
                    description: 'Build scalable, resilient applications designed specifically for cloud environments that future-proof your business.',
                    points: [
                        'Microservices architecture',
                        'Containerization with Docker',
                        'Kubernetes orchestration',
                        'Serverless computing'
                    ]
                }
            ]
        },
        'digital-marketing': {
            icon: 'fas fa-bullhorn',
            title: 'Digital Marketing Services',
            description: 'Engage your audience and grow your brand with data-driven digital marketing campaigns that deliver measurable results.',
            features: [
                {
                    icon: 'fas fa-bullhorn',
                    title: 'Content Marketing',
                    description: 'Create compelling content that resonates with your audience and drives meaningful engagement and conversions.',
                    points: [
                        'Blog and article creation',
                        'Video and infographic production',
                        'Content strategy planning',
                        'Email marketing campaigns'
                    ]
                },
                {
                    icon: 'fas fa-ad',
                    title: 'PPC Advertising',
                    description: 'Maximize ROI with targeted pay-per-click campaigns on Google Ads and social platforms that reach your ideal customers.',
                    points: [
                        'Keyword and audience targeting',
                        'Ad copy and creative design',
                        'Bid management and optimization',
                        'Performance tracking and reporting'
                    ]
                },
                {
                    icon: 'fas fa-share-alt',
                    title: 'Social Media Marketing',
                    description: 'Build your brand and connect with customers through strategic social media campaigns that foster community and loyalty.',
                    points: [
                        'Platform-specific strategies',
                        'Engaging content creation',
                        'Community management',
                        'Analytics and insights'
                    ]
                }
            ]
        },
        'e-commerce': {
            icon: 'fas fa-shopping-cart',
            title: 'E-Commerce Services',
            description: 'Launch and scale your online store with secure, user-friendly e-commerce platforms that drive sales and growth.',
            features: [
                {
                    icon: 'fas fa-shopping-cart',
                    title: 'Store Development',
                    description: 'Build a robust e-commerce platform tailored to your business needs and customer expectations that converts visitors into buyers.',
                    points: [
                        'Custom storefront design',
                        'Mobile-optimized checkout',
                        'Payment gateway integration',
                        'Multi-language support'
                    ]
                },
                {
                    icon: 'fas fa-box-open',
                    title: 'Inventory Management',
                    description: 'Streamline your operations with efficient inventory and order management systems that save time and reduce errors.',
                    points: [
                        'Real-time inventory tracking',
                        'Automated stock alerts',
                        'Order fulfillment integration',
                        'Multi-channel selling'
                    ]
                },
                {
                    icon: 'fas fa-chart-bar',
                    title: 'Analytics & Optimization',
                    description: 'Drive sales with data-driven insights and continuous optimization of your e-commerce platform that maximizes revenue.',
                    points: [
                        'Customer behavior analytics',
                        'Conversion rate optimization',
                        'A/B testing and experimentation',
                        'Sales funnel analysis'
                    ]
                }
            ]
        },
        'api-integration': {
            icon: 'fas fa-plug',
            title: 'API Integration Services',
            description: 'Connect your systems and automate workflows with seamless API integrations that streamline operations and boost productivity.',
            features: [
                {
                    icon: 'fas fa-cogs',
                    title: 'Custom API Development',
                    description: 'Build secure, scalable APIs to connect your applications and enable seamless data exchange that powers your business.',
                    points: [
                        'REST and GraphQL APIs',
                        'Secure authentication methods',
                        'API documentation',
                        'Performance optimization'
                    ]
                },
                {
                    icon: 'fas fa-plug',
                    title: 'Third-Party Integration',
                    description: 'Integrate with popular platforms to enhance functionality and streamline operations across your entire tech stack.',
                    points: [
                        'Payment and CRM integrations',
                        'Social media and marketing APIs',
                        'Shipping and logistics APIs',
                        'Custom webhook setup'
                    ]
                },
                {
                    icon: 'fas fa-sync-alt',
                    title: 'Data Synchronization',
                    description: 'Ensure real-time data consistency across your applications and platforms that eliminates data silos and errors.',
                    points: [
                        'Bi-directional data sync',
                        'Error handling and logging',
                        'Data transformation and mapping',
                        'Scheduled sync processes'
                    ]
                }
            ]
        },
        'initiatives': {
            icon: 'fas fa-hands-helping',
            title: 'Community Focused',
            description: 'We reinvest in local businesses and support the growth of the Mesilla Valley\'s digital economy because your success is our success.',
            features: [
                {
                    icon: 'fas fa-hands-helping',
                    title: 'Local Business Support',
                    description: 'We prioritize working with local businesses to strengthen our community\'s economic foundation and foster mutual growth.',
                    points: [
                        'Special rates for local businesses',
                        'Pro bono work for select non-profits',
                        'Community workshops and training',
                        'Local business partnerships'
                    ]
                },
                {
                    icon: 'fas fa-seedling',
                    title: 'Digital Growth Initiatives',
                    description: 'Programs designed to help local businesses thrive in the digital economy and compete effectively in today\'s market.',
                    points: [
                        'Digital literacy programs',
                        'Small business web development grants',
                        'Mentorship for local entrepreneurs',
                        'Tech education partnerships'
                    ]
                },
                {
                    icon: 'fas fa-heart',
                    title: 'Community Investment',
                    description: 'We believe in giving back to the community that supports our business and making a positive impact where we live and work.',
                    points: [
                        'Local event sponsorship',
                        'School and education support',
                        'Charitable contributions',
                        'Volunteer time off for employees'
                    ]
                }
            ]
        },
        'meet-us': {
            icon: 'fas fa-handshake',
            title: 'Personal Service',
            description: 'Unlike national agencies, we offer face-to-face consultations and personalized support because you deserve more than a ticket number.',
            features: [
                {
                    icon: 'fas fa-handshake',
                    title: 'Local Presence',
                    description: 'We\'re your neighbors, with a physical presence in the Mesilla Valley community who understands your unique market challenges.',
                    points: [
                        'In-person consultations',
                        'Local phone number with real people',
                        'Quick response times',
                        'Understanding of local market'
                    ]
                },
                {
                    icon: 'fas fa-user-friends',
                    title: 'Dedicated Support',
                    description: 'Work directly with our team, not a call center or automated system, for personalized service that understands your vision.',
                    points: [
                        'Direct access to our team',
                        'Assigned account manager',
                        'Personalized service approach',
                        'Long-term relationship building'
                    ]
                },
                {
                    icon: 'fas fa-lightbulb',
                    title: 'Collaborative Process',
                    description: 'We work with you, not just for you, to ensure your vision becomes reality through transparent communication and partnership.',
                    points: [
                        'Regular progress updates',
                        'Collaborative decision making',
                        'Transparent communication',
                        'Flexible approach to changes'
                    ]
                }
            ]
        }
    };

    // Function to create a feature card
    function createFeatureCard(feature, index) {
        return `
            <div class="${index < 2 ? 'mb-12 pb-12 border-b border-[#333333]' : 'mb-12'}">
                <div class="flex flex-col md:flex-row gap-8 items-start">
                    <div class="flex-shrink-0">
                        <div class="w-16 h-16 rounded-xl flex items-center justify-center text-2xl">
                            <i class="${feature.icon}" style="color: #d4611c;"></i>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-2xl font-medium mb-4 text-white">${feature.title}</h3>
                        <p class="text-gray-400 mb-4">${feature.description}</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${feature.points.map(point => `
                                <div class="flex items-start">
                                    <span class="text-[#d4611c] mr-3 mt-1">•</span>
                                    <span class="text-gray-400">${point}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }


    // Function to create a service section
    function createServiceSection(serviceId, serviceData) {
        const section = document.createElement('section');
        section.className = 'service-section py-20 bg-black poppins-font-section relative';
        section.style.marginTop = '25px';
        section.dataset.serviceId = serviceId;

        const container = document.createElement('div');
        container.className = 'container mx-auto px-6 max-w-4xl';

        // Back button
        const backButtonContainer = document.createElement('div');
        backButtonContainer.className = 'fixed left-0 top-1/2 transform -translate-y-1/2 z-50 group';
        const backButton = document.createElement('a');
        backButton.href = '#';
        backButton.className = 'flex items-center bg-[#1a1a1a] text-white rounded-r-3xl border border-[#d4611c] border-l-0 transition-all duration-300 overflow-hidden';
        backButton.style.width = '40px';
        backButton.style.height = '40px';
        backButton.innerHTML = `
            <span class="flex items-center justify-center w-10 h-10 min-w-[40px]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
            </span>
            <span class="whitespace-nowrap pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Back to Homepage
            </span>
        `;

        // Calculate text width for hover effect
        const tempSpan = document.createElement('span');
        tempSpan.className = 'whitespace-nowrap pr-4';
        tempSpan.textContent = 'Back to Homepage';
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        document.body.appendChild(tempSpan);
        const textWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);

        backButton.addEventListener('mouseenter', function() {
            this.style.width = `${40 + textWidth + 4}px`;
        });

        backButton.addEventListener('mouseleave', function() {
            this.style.width = '40px';
        });

        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            history.pushState("", document.title, window.location.pathname + window.location.search);
            handleHashChange();
        });

        backButtonContainer.appendChild(backButton);

        // Heading with hero icon
        const headingDiv = document.createElement('div');
        headingDiv.className = 'text-center mb-16';
        headingDiv.innerHTML = `
            <div class="flex justify-center mb-4">
                <div class="w-16 h-16 flex items-center justify-center text-3xl">
                    <i class="${serviceData.icon}" style="color: #d4611c;"></i>
                </div>
            </div>
            <h2 class="text-4xl md:text-5xl font-medium mb-6 text-white">
                ${serviceData.title}
            </h2>
            <p class="max-w-2xl mx-auto text-gray-400">${serviceData.description}</p>
        `;

        // Content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'bg-[#1a1a1a] p-8 md:p-12 rounded-3xl shadow-lg border border-[#333333]';
        serviceData.features.forEach((feature, index) => {
            contentDiv.innerHTML += createFeatureCard(feature, index);
        });

        // Conditional CTA based on serviceId
        let ctaHtml = '';
        if (serviceId === 'initiatives') {
            // No button for initiatives
            ctaHtml = `
                <div class="text-center mt-12">
                    <p class="text-gray-500 mt-4 text-sm">Have questions? <a href="#contact" class="text-[#d4611c] hover:underline">Contact our team</a></p>
                </div>
            `;
        } else if (serviceId === 'meet-us') {
            // "Schedule Meeting" button for meet-us
            ctaHtml = `
                <div class="text-center mt-12">
                    <a href="eco/schedule/index.html" class="inline-block px-8 py-4 bg-[#d4611c] text-white rounded-3xl font-semibold hover:bg-[#e67a35] transition-colors group btn-pulse-outline">
                        Schedule Meeting
                    </a>
                    <p class="text-gray-500 mt-4 text-sm">Have questions? <a href="#contact" class="text-[#d4611c] hover:underline">Contact our team</a></p>
                </div>
            `;
        } else {
            // Default "Get Started" button
            ctaHtml = `
                <div class="text-center mt-12">
                    <a href="#quote" id="quote-cta" class="inline-block px-8 py-4 bg-[#d4611c] text-white rounded-3xl font-semibold hover:bg-[#e67a35] transition-colors group btn-pulse-outline">
                        Get Started
                    </a>
                    <p class="text-gray-500 mt-4 text-sm">Have questions? <a href="#contact" class="text-[#d4611c] hover:underline">Contact our team</a></p>
                </div>
            `;
        }
        
        contentDiv.innerHTML += ctaHtml;

        container.appendChild(headingDiv);
        container.appendChild(contentDiv);
        section.appendChild(backButtonContainer);
        section.appendChild(container);

        // Add event listener for quote CTA only if it exists
        if (serviceId !== 'initiatives' && serviceId !== 'meet-us') {
            setTimeout(() => {
                const quoteCta = document.getElementById('quote-cta');
                if (quoteCta) {
                    quoteCta.addEventListener('click', function(e) {
                        e.preventDefault();
                        window.location.href = window.location.pathname + '#quote';
                        window.location.reload();
                    });
                }
            }, 100);
        }

        return section;
    }

    // Track current open service
    let currentService = null;

    // Handle hash changes
    function handleHashChange() {
        const sections = document.querySelectorAll('main > section:not(.service-section)');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const hash = window.location.hash.slice(1); // Remove '#'

        // If we're already viewing a service and clicking a different one
        if (currentService && currentService !== hash && services[hash]) {
            // Remove current service section
            const currentSection = document.querySelector(`.service-section[data-service-id="${currentService}"]`);
            if (currentSection) {
                currentSection.remove();
            }
        }

        if (services[hash]) {
            // Hide all sections except header and footer
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Find or create service section
            let serviceSection = document.querySelector(`.service-section[data-service-id="${hash}"]`);
            if (!serviceSection) {
                serviceSection = createServiceSection(hash, services[hash]);
                header.insertAdjacentElement('afterend', serviceSection);
            } else {
                serviceSection.style.display = 'block';
                serviceSection.style.marginTop = '25px';
            }

            // Set current service
            currentService = hash;

            // Force scroll to top with additional offset to ensure it's at the very top
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
            
            // Additional manual scroll to ensure we're at the absolute top
            setTimeout(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
            }, 50);
            
        } else {
            // Show all sections
            sections.forEach(section => {
                section.style.display = 'block';
            });

            // Hide all service sections
            document.querySelectorAll('.service-section').forEach(section => {
                section.style.display = 'none';
            });

            // Reset current service
            currentService = null;
            
            // If the hash is #quote, scroll to it smoothly
            if (hash === 'quote') {
                setTimeout(() => {
                    const quoteElement = document.getElementById('quote');
                    if (quoteElement) {
                        quoteElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    }

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Additional scroll to top on page load if there's a service hash (not #quote)
    if (window.location.hash && window.location.hash !== '#quote') {
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
        }, 100);
    }
});
