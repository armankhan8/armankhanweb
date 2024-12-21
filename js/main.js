// Cursor Animation
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Scroll Reveal
const scrollElements = document.querySelectorAll('[data-scroll]');

const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
};

const displayScrollElement = (element) => {
    element.classList.add('is-visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);

// Theme Toggle
const themeToggle = document.querySelector('.nav__theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.classList.replace('bx-moon', 'bx-sun');
    }
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.classList.replace('bx-sun', 'bx-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.classList.replace('bx-moon', 'bx-sun');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive); 

// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
    "Computer Science Student", 
    "Data Science Enthusiast",
    "Problem Solver" ,
    "Web Developer"
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
}); 

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    // Toggle theme on click
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        localStorage.setItem('theme', 
            body.classList.contains('dark-theme') ? 'dark' : 'light'
        );
    });
}); 

// Enquiry Form Modal
document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('openEnquiryForm');
    const modal = document.getElementById('enquiryModal');
    const closeButton = document.getElementById('closeModal');
    const form = document.getElementById('enquiryForm');

    openButton.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Message sent successfully!');
        modal.classList.remove('active');
        form.reset();
    });
}); 

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav__link');
    const body = document.body;

    if (!navToggle || !navMenu) {
        console.error('Navigation elements not found');
        return;
    }

    // Toggle menu
    const toggleMenu = () => {
        navMenu.classList.toggle('show-menu');
        body.classList.toggle('show-menu-overlay');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('bx-menu');
            icon.classList.toggle('bx-x');
        }
    };

    // Show/hide menu
    navToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);

    // Hide menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            body.classList.remove('show-menu-overlay');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.add('bx-menu');
                icon.classList.remove('bx-x');
            }
        });
    });
}); 