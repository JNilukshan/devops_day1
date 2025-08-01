document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');
    const projectCards = document.querySelectorAll('.project-card');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Sticky header effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Project card animation on hover
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
});