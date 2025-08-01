const menuToggle = document.getElementById('hamburger-btn'); // Hamburger menu icon
const overlayMenu = document.getElementById('overlay-menu'); // Fullscreen overlay menu
const menuIcon = menuToggle.querySelector('i');
const closeMenu = document.getElementById('close-menu'); // Close button in overlay
const allItems = document.querySelectorAll('.menu-item'); // All clickable menu items

// Show the overlay menu when hamburger icon is clicked
menuToggle?.addEventListener('click', () => {
  overlayMenu.classList.remove('hidden'); // Make overlay visible
  overlayMenu.classList.add('show');
});

// Close overlay when close button is clicked
closeMenu?.addEventListener('click', () => {
  overlayMenu.classList.remove('show');
  overlayMenu.classList.add('hidden');
});

document.querySelectorAll('.close-and-scroll').forEach(item => {
  item.addEventListener('click', () => {
    overlayMenu.classList.remove('show');
    setTimeout(() => {
      overlayMenu.classList.add('hidden');
    }, 600);
  });
});

// Function to update navigation background based on theme and scroll position
function updateNavBackground() {
  const nav = document.querySelector('nav');
  const isDark = document.body.classList.contains('dark');
  const isScrolled = window.scrollY > 100;
  
  if (isDark) {
    // Dark mode backgrounds
    if (isScrolled) {
      nav.style.background = 'rgba(17, 17, 17, 0.95)';
      nav.style.backdropFilter = 'blur(10px)';
    } else {
      nav.style.background = 'rgba(17, 17, 17, 0.9)';
      nav.style.backdropFilter = 'none';
    }
    // Remove gradient animation in dark mode
    nav.style.animation = 'none';
  } else {
    // Light mode backgrounds
    if (isScrolled) {
      nav.style.background = 'linear-gradient(60deg, rgba(255, 209, 102, 0.95), rgba(212, 170, 125, 0.95), rgba(239, 208, 158, 0.95), rgba(216, 151, 60, 0.95), rgba(251, 255, 18, 0.95))';
    } else {
      nav.style.background = 'linear-gradient(60deg, #FFD166, #D4AA7D, #EFD09E, #D8973C, #FBFF12)';
    }
    nav.style.backgroundSize = '200% 200%';
    nav.style.animation = 'gradientShift 8s ease infinite';
    nav.style.backdropFilter = 'none';
  }
}

// Theme toggle functionality
const button = document.getElementById('theme-toggle');
const icon = button.querySelector('i');

button.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  // Update icon based on theme
  if (document.body.classList.contains('dark')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
  
  // Update nav background immediately after theme change
  updateNavBackground();
});

// Header background on scroll
window.addEventListener('scroll', updateNavBackground);

// Initialize nav background on page load
document.addEventListener('DOMContentLoaded', updateNavBackground);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.mission, .services, .tools').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.6s ease';
  observer.observe(section);
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Tool items staggered animation
document.querySelectorAll('.tool-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'all 0.5s ease';
  item.style.transitionDelay = `${index * 0.1}s`;
  
  // Trigger animation when tools section is visible
  const toolsSection = document.querySelector('.tools');
  const toolsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.tool-item').forEach(toolItem => {
          toolItem.style.opacity = '1';
          toolItem.style.transform = 'translateY(0)';
        });
      }
    });
  }, observerOptions);
  
  toolsObserver.observe(toolsSection);
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const rate = scrolled * -0.2;
  
  if (scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add loading animation for service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  card.style.transitionDelay = `${index * 0.2}s`;
  
  const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  servicesObserver.observe(card);
});

// Button click animations
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

document.querySelectorAll('.service-card').forEach(card => {
  const singleBtn = card.querySelector('.single');
  const multiBtn = card.querySelector('.multi');
  const priceText = card.querySelector('.price-amount');

  const updatePrice = (btnToActivate, btnToDeactivate) => {
    const price = btnToActivate.dataset.price;
    priceText.textContent = `$${parseInt(price).toLocaleString()}`;
    btnToActivate.classList.add('active');
    btnToDeactivate.classList.remove('active');
  };

  singleBtn.addEventListener('click', () => {
    updatePrice(singleBtn, multiBtn);
  });

  multiBtn.addEventListener('click', () => {
    updatePrice(multiBtn, singleBtn);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => observer.observe(card));
});

emailjs.init("safbQLpWAhWMOuQKI");

  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    statusMsg.textContent = "⏳ Sending message...";
    statusMsg.classList.remove("hidden");
    statusMsg.classList.add("show");

    emailjs.sendForm("service_7nfnwjj", "template_4oshgld", this)
      .then(() => {
        statusMsg.textContent = "✅ Message sent!";
        form.reset();

        setTimeout(() => {
          statusMsg.classList.remove("show");
          statusMsg.classList.add("hidden");
        }, 3000);

      }, (error) => {
        statusMsg.textContent = "❌ Failed to send. Please try again.";
        setTimeout(() => {
          statusMsg.classList.remove("show");
          statusMsg.classList.add("hidden");
        }, 4000);
      });
  });
