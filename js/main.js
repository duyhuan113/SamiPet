/**
 * Pet Shop Hanoi - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Product quick view functionality
  const quickViewButtons = document.querySelectorAll('.btn-product-action');
  
  if (quickViewButtons.length > 0) {
    quickViewButtons.forEach(button => {
      if (button.querySelector('i.bi-eye')) {
        button.addEventListener('click', function() {
          // Here you would typically show a modal with product details
          // For demo purposes, we'll just log to console
          console.log('Quick view clicked for:', 
            this.closest('.product-card').querySelector('.product-title').textContent);
        });
      }
    });
  }

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.btn-product-action');
  
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      if (button.querySelector('i.bi-cart-plus')) {
        button.addEventListener('click', function() {
          // Get product info
          const productCard = this.closest('.product-card');
          const productName = productCard.querySelector('.product-title').textContent;
          const productPrice = productCard.querySelector('.product-price').textContent;
          
          // Update cart count
          const cartCount = document.querySelector('.cart-count');
          if (cartCount) {
            cartCount.textContent = parseInt(cartCount.textContent) + 1;
          }
          
          // Show add to cart notification
          showNotification(`${productName} added to cart!`);
        });
      }
    });
  }

  // Wishlist functionality
  const wishlistButtons = document.querySelectorAll('.btn-product-action');
  
  if (wishlistButtons.length > 0) {
    wishlistButtons.forEach(button => {
      if (button.querySelector('i.bi-heart')) {
        button.addEventListener('click', function() {
          // Toggle wishlist state
          const heart = this.querySelector('i.bi-heart');
          
          if (heart.classList.contains('bi-heart-fill')) {
            heart.classList.remove('bi-heart-fill');
            heart.classList.add('bi-heart');
            showNotification('Removed from wishlist!');
          } else {
            heart.classList.remove('bi-heart');
            heart.classList.add('bi-heart-fill');
            heart.style.color = '#ff6b6b';
            showNotification('Added to wishlist!');
          }
        });
      }
    });
  }

  // Contact form validation
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let isValid = true;
      const name = this.querySelector('#name');
      const email = this.querySelector('#email');
      const message = this.querySelector('#message');
      
      if (!name.value.trim()) {
        showInputError(name);
        isValid = false;
      } else {
        removeInputError(name);
      }
      
      if (!email.value.trim() || !isValidEmail(email.value)) {
        showInputError(email);
        isValid = false;
      } else {
        removeInputError(email);
      }
      
      if (!message.value.trim()) {
        showInputError(message);
        isValid = false;
      } else {
        removeInputError(message);
      }
      
      if (isValid) {
        // Simulate form submission
        this.reset();
        showNotification('Thank you! Your message has been sent successfully.');
      }
    });
  }

  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        showInputError(emailInput);
      } else {
        removeInputError(emailInput);
        this.reset();
        showNotification('Thank you for subscribing to our newsletter!');
      }
    });
  }

  // Filter functionality for products page
  const filterButtons = document.querySelectorAll('.sidebar-widget .form-check-input, .price-range button');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('change', function() {
        // In a real application, this would trigger an AJAX request to filter products
        // For demo purposes, we'll just show a notification
        showNotification('Filters applied!');
      });
    });
  }

  // Clear all filters button
  const clearFiltersButton = document.querySelector('.btn-outline-danger');
  
  if (clearFiltersButton) {
    clearFiltersButton.addEventListener('click', function() {
      // Reset all checkboxes and inputs
      document.querySelectorAll('.sidebar-widget .form-check-input').forEach(input => {
        input.checked = false;
      });
      
      document.querySelectorAll('.price-range input').forEach(input => {
        input.value = input.defaultValue;
      });
      
      // Show notification
      showNotification('All filters cleared!');
    });
  }

  // Products sorting
  const sortingSelect = document.querySelector('.products-sorting select');
  
  if (sortingSelect) {
    sortingSelect.addEventListener('change', function() {
      // In a real application, this would trigger an AJAX request to sort products
      // For demo purposes, we'll just show a notification
      showNotification(`Products sorted by: ${this.value}`);
    });
  }

  // Utility functions
  function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="bi bi-check-circle"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function showInputError(input) {
    input.classList.add('is-invalid');
  }

  function removeInputError(input) {
    input.classList.remove('is-invalid');
  }

  // Add notification styles
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: var(--white);
      border-radius: 0.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      z-index: 9999;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification-content {
      display: flex;
      align-items: center;
    }
    
    .notification-content i {
      font-size: 1.5rem;
      color: var(--success);
      margin-right: 0.75rem;
    }
    
    .notification-content span {
      font-size: 0.9rem;
      color: var(--dark);
    }
  `;
  document.head.appendChild(notificationStyles);
});