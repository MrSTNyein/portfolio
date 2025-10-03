document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Sidebar Toggle
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarBack = document.getElementById('sidebarBack');
    if (menuBtn && sidebar && sidebarBack) {
        menuBtn.onclick = () => sidebar.classList.add('active');
        sidebarBack.onclick = () => sidebar.classList.remove('active');
        document.querySelectorAll('.nav-link').forEach(l => l.onclick = () => sidebar.classList.remove('active'));
    }
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.onclick = () => document.body.classList.toggle('light');
    }
    
    // Typing Effect
    const typing = document.getElementById("typing");
    if (typing) {
        const roles = ["I'm a Digital Marketer", "I'm an AI Enthusiast", "I'm a Content Creator"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeRole() {
            const currentRole = roles[roleIndex];
            const currentText = currentRole.substring(0, charIndex);
            typing.textContent = currentText;
            typing.style.borderRightColor = 'var(--accent)';

            if (!isDeleting) {
                if (charIndex < currentRole.length) {
                    charIndex++;
                    setTimeout(typeRole, 150);
                } else {
                    isDeleting = true;
                    setTimeout(typeRole, 1200);
                }
            } else {
                if (charIndex > 0) {
                    charIndex--;
                    setTimeout(typeRole, 80);
                } else {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(typeRole, 200);
                }
            }
        }
        typeRole();
    }

    // Scroll Animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('show');
                if (e.target.classList.contains('skill')) {
                    const fill = e.target.querySelector('.fill');
                    if (fill) {
                       setTimeout(() => {
                          fill.style.width = fill.dataset.width;
                       }, 200);
                    }
                }
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hero, .section, .skill').forEach(el => observer.observe(el));
  
    // Modal Logic
    const modal = document.getElementById('modal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalImage = document.getElementById('modalImage');
        const modalClose = document.getElementById('modalClose');

        const handleReadMore = () => {
            const isOverflowing = modalDesc.scrollHeight > 72;
            const existingBtn = modalContent.querySelector('.read-more-btn');
            if (existingBtn) {
                existingBtn.remove();
            }

            if (isOverflowing) {
                modalDesc.classList.add('truncated');
                const readMoreBtn = document.createElement('button');
                readMoreBtn.textContent = 'Read More';
                readMoreBtn.className = 'read-more-btn';
                modalDesc.after(readMoreBtn);

                readMoreBtn.addEventListener('click', () => {
                    modalDesc.classList.toggle('expanded');
                    modalDesc.classList.toggle('truncated');
                    readMoreBtn.textContent = modalDesc.classList.contains('expanded') ? 'Read Less' : 'Read More';
                });
            }
        };
  
        document.querySelectorAll('.card, .blog, .certificate').forEach(el => {
            el.addEventListener('click', () => {
                modalTitle.textContent = el.dataset.title;
                modalDesc.textContent = el.dataset.desc;
                modalImage.src = el.dataset.img;
                modalDesc.classList.remove('expanded', 'truncated');
                modal.classList.add('show');
                setTimeout(handleReadMore, 50); 
            });
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    // Scroll Down Button
    const scrollDown = document.getElementById('scrollDown');
    if (scrollDown) {
        scrollDown.onclick = () => {
            document.getElementById('projects').scrollIntoView();
        };
    }

    // Back to Top Button
    const backTop = document.getElementById('backTop');
    if (backTop) {
        window.addEventListener('scroll', () => {
            backTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        });
        backTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Testimonials Carousel
    const track = document.getElementById('testimonialTrack');
    if (track) {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const testimonials = Array.from(track.children);
        let testimonialIndex = 0;
        const totalTestimonials = testimonials.length;
        
        const showTestimonial = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            testimonialIndex = index;
        };
        
        const nextTestimonial = () => {
            const nextIndex = (testimonialIndex + 1) % totalTestimonials;
            showTestimonial(nextIndex);
        };

        const prevTestimonial = () => {
            const prevIndex = (testimonialIndex - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(prevIndex);
        };

        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
        
        setInterval(nextTestimonial, 5000);
    }

    // Project Filtering
    const filterContainer = document.querySelector('.filter-buttons');
    if (filterContainer) {
        const projectCards = document.querySelectorAll('.projects .card');
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                const filterValue = e.target.getAttribute('data-filter');
                projectCards.forEach(card => {
                    if (card.getAttribute('data-category') === filterValue || filterValue === 'all') {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            }
        });
    }
  
    // AJAX Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const formStatus = document.getElementById('form-status');
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: {'Accept': 'application/json'}
                });
                if (response.ok) {
                    formStatus.textContent = "Thanks for your message!";
                    formStatus.style.color = "var(--accent)";
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Oops! There was a problem.";
                    formStatus.style.color = "red";
                }
            } catch (error) {
                formStatus.textContent = "Oops! There was a problem.";
                formStatus.style.color = "red";
            }
            setTimeout(() => { formStatus.textContent = '' }, 5000);
        });
    }
  
    // Cookie Consent Banner
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    if (banner && acceptBtn) {
        if (localStorage.getItem('cookieConsent') === 'true') {
          banner.style.display = 'none';
          if (typeof gtag === 'function') {
            gtag('consent', 'update', {'analytics_storage': 'granted'});
            gtag('event', 'page_view'); 
          }
        }
        acceptBtn.addEventListener('click', () => {
          localStorage.setItem('cookieConsent', 'true');
          banner.style.display = 'none';
          if (typeof gtag === 'function') {
            gtag('consent', 'update', {'analytics_storage': 'granted'});
            gtag('event', 'page_view');
          }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // --- FIX FOR VH UNIT ON MOBILE --- //
    const setVhVariable = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
    
    
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Sidebar Toggle
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarBack = document.getElementById('sidebarBack');
    if (menuBtn && sidebar && sidebarBack) {
        menuBtn.onclick = () => sidebar.classList.add('active');
        sidebarBack.onclick = () => sidebar.classList.remove('active');
        document.querySelectorAll('.nav-link').forEach(l => l.onclick = () => sidebar.classList.remove('active'));
    }
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.onclick = () => {
            document.body.classList.toggle('light');
            // Save theme preference
            if (document.body.classList.contains('light')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        };
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light');
        }
    }
    
    // Typing Effect
    const typing = document.getElementById("typing");
    if (typing) {
        const roles = ["I'm a Digital Marketer", "I'm an AI Enthusiast", "I'm a Content Creator"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeRole() {
            const currentRole = roles[roleIndex];
            typing.textContent = currentRole.substring(0, charIndex);
            
            if (!isDeleting) {
                if (charIndex < currentRole.length) {
                    charIndex++;
                    setTimeout(typeRole, 150);
                } else {
                    isDeleting = true;
                    setTimeout(typeRole, 1200);
                }
            } else {
                if (charIndex > 0) {
                    charIndex--;
                    setTimeout(typeRole, 80);
                } else {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(typeRole, 200);
                }
            }
        }
        typeRole();
    }

    // --- MODIFIED: Scroll Animations --- //
    // The observer now only watches sections BELOW the hero
    const observer = new IntersectionObserver(entries => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('show');
                if (e.target.classList.contains('skill')) {
                    const fill = e.target.querySelector('.fill');
                    if (fill) {
                       setTimeout(() => {
                          fill.style.width = fill.dataset.width;
                       }, 200);
                    }
                }
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    // MODIFIED: We removed '.hero' from this list
    document.querySelectorAll('.section, .skill').forEach(el => observer.observe(el));
  
    // --- NEW: Hero Animation on Page Load --- //
    // This directly targets the hero section and makes it appear reliably.
    const hero = document.getElementById('hero');
    if (hero) {
        setTimeout(() => {
            hero.classList.add('show');
        }, 100); // 100ms delay to ensure everything is ready
    }

    // Modal Logic, Scroll Down, Back to Top, Carousel, Filter, Form, Cookie...
    // (The rest of your script.js file remains the same here)
});
