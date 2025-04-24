// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Handle contact form submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission
  
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
  
        if (name === "" || email === "" || message === "") {
          alert("Please fill in all fields.");
        } else {
          alert(`Thank you, ${name}! Your message has been sent.`);
          contactForm.reset();
        }
      });
    }
  
    // Booking form submission confirmation
const bookingForm = document.querySelector('#bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('date').value;
    const service = document.getElementById('service').value;

    if (name === "" || date === "" || service === "") {
      alert("Please complete all fields before booking.");
    } else {
      alert(`Thank you, ${name}! Your ${service} on ${date} has been booked.`);
      bookingForm.reset();
    }
  });
}

  
    // Highlight active nav link (optional)
    const currentPage = location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-link");
  
    navLinks.forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  
    // Placeholder: Add other features like gallery interactions, sliders, or localStorage here


    // Animate gallery images on scroll
const galleryItems = document.querySelectorAll('.gallery-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.2,
});

galleryItems.forEach(item => {
  observer.observe(item);
});

  });
  