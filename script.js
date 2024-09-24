document.addEventListener("DOMContentLoaded", function () {
    /* ===========================
       Smooth Scrolling for All Anchor Links
    ============================ */
    const smoothScroll = (event) => {
        // Only handle anchor links that start with #
        if (event.target.tagName.toLowerCase() !== 'a' || !event.target.getAttribute("href").startsWith("#")) {
            return;
        }

        event.preventDefault();
        const targetId = event.target.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    document.body.addEventListener('click', smoothScroll);

    /* ===========================
       Typewriter Effect
    ============================ */
    const typewriter = () => {
        const element = document.querySelector('.typewriter span');
        if (!element) return;

        const fullText = element.getAttribute('data-text') || element.textContent;
        element.textContent = '';
        let index = 0;

        const typingSpeed = 100; // milliseconds per character

        const typing = () => {
            if (index < fullText.length) {
                element.textContent += fullText.charAt(index);
                index++;
                setTimeout(typing, typingSpeed);
            }
        };
        typing();
    };

    typewriter();

    /* ===========================
       Responsive Navigation Menu Toggle
    ============================ */
    const navbar = document.querySelector('.navbar');
    const navToggle = document.createElement('div');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = `<span></span><span></span><span></span>`;
    navbar.appendChild(navToggle);

    const navLinks = navbar.querySelector('ul');

    const toggleNav = () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    };

    navToggle.addEventListener('click', toggleNav);

    /* Close the navigation menu when a link is clicked (useful for mobile) */
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleNav();
            }
        });
    });

    /* ===========================
       Scroll Animations
    ============================ */
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) { // Trigger 100px before element is in view
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on load

    /* ===========================
       Responsive Adjustments on Resize
    ============================ */
    const handleResize = () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    };

    window.addEventListener('resize', handleResize);

    /* ===========================
       Contact Form Handling
    ============================ */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim() || 'No Subject'; 
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all required fields.');
                return;
            }

            // Construct mailto link
            const mailtoLink = `mailto:musfirahkorai@gmail.com?subject=${encodeURIComponent(subject)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;

            // Open default mail client
            window.location.href = mailtoLink;

            // Optionally, reset the form
            contactForm.reset();
        });
    }
});

const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

window.addEventListener('resize', debounce(handleResize, 200));
