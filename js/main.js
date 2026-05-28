/* 
  Lucky Digital Media - Interactive Script System
  Author: Antigravity AI
*/

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. SCROLL PROGRESS & STICKY GLASSMORPHIC HEADER
  // =========================================================================
  const header = document.getElementById('header');
  const scrollProgressBar = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Update scroll progress bar
    if (docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Toggle Header scrolled status
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // =========================================================================
  // 2. HAMBURGER MENU DRAWER (MOBILE RESPONSIVE)
  // =========================================================================
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close mobile drawer when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerMenu.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // =========================================================================
  // 3. DUAL-BEHAVIOR IMAGE SLIDER (SERVICE CAROUSEL)
  // =========================================================================
  const sliderContainer = document.getElementById('sliderContainer');
  const slides = document.querySelectorAll('.slide');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');
  const sliderDots = document.querySelectorAll('#sliderDots .slider-dot');
  
  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  let sliderAutoInterval;

  function updateSliderPosition() {
    sliderContainer.style.transform = `translateX(-${currentSlideIndex * 33.3333}%)`;
    
    // Update active dots
    sliderDots.forEach((dot, index) => {
      if (index === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToNextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSliderPosition();
  }

  function goToPrevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
  }

  // Next / Prev triggers
  sliderNext.addEventListener('click', () => {
    goToNextSlide();
    resetSliderTimer();
  });

  sliderPrev.addEventListener('click', () => {
    goToPrevSlide();
    resetSliderTimer();
  });

  // Dot triggers
  sliderDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentSlideIndex = parseInt(e.target.getAttribute('data-index'));
      updateSliderPosition();
      resetSliderTimer();
    });
  });

  // Auto Scroll slider every 5 seconds
  function startSliderTimer() {
    sliderAutoInterval = setInterval(goToNextSlide, 5000);
  }

  function resetSliderTimer() {
    clearInterval(sliderAutoInterval);
    startSliderTimer();
  }

  startSliderTimer();

  // =========================================================================
  // 4. GOOGLE-REVIEW TESTIMONIALS SLIDER
  // =========================================================================
  const testimonialContainer = document.getElementById('testimonialContainer');
  const testimonialDots = document.querySelectorAll('#testimonialDots .testimonial-dot');
  const totalTestimonials = testimonialDots.length;
  let currentReviewIndex = 0;
  let reviewAutoInterval;

  function updateTestimonialPosition() {
    testimonialContainer.style.transform = `translateX(-${currentReviewIndex * 20}%)`;
    
    testimonialDots.forEach((dot, index) => {
      if (index === currentReviewIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToNextTestimonial() {
    currentReviewIndex = (currentReviewIndex + 1) % totalTestimonials;
    updateTestimonialPosition();
  }

  testimonialDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentReviewIndex = parseInt(e.target.getAttribute('data-index'));
      updateTestimonialPosition();
      resetReviewTimer();
    });
  });

  function startReviewTimer() {
    reviewAutoInterval = setInterval(goToNextTestimonial, 6000);
  }

  function resetReviewTimer() {
    clearInterval(reviewAutoInterval);
    startReviewTimer();
  }

  startReviewTimer();

  // =========================================================================
  // 5. ANIMATED NUMERIC COUNTERS (VIEWPORT TRIGGERED)
  // =========================================================================
  const counterNumbers = document.querySelectorAll('.stat-number');
  
  const countUp = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 seconds animation duration
    const frameRate = 1000 / 60; // 60 fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quadratic animation
      const currentValue = Math.round(target * progress * (2 - progress));
      
      if (target === 3) {
        counter.textContent = `${currentValue}+`;
      } else if (target === 98) {
        counter.textContent = `${currentValue}%`;
      } else {
        counter.textContent = `${currentValue}+`;
      }

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        if (target === 3) {
          counter.textContent = '3+';
        } else if (target === 98) {
          counter.textContent = '98%';
        } else {
          counter.textContent = `${target}+`;
        }
      }
    };
    
    animate();
  };

  // Intersection Observer for Counters
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        countUp(counter);
        observer.unobserve(counter); // Trigger once
      }
    });
  }, { threshold: 0.5 });

  counterNumbers.forEach(counter => {
    counterObserver.observe(counter);
  });

  // =========================================================================
  // 6. SCROLL ENTRANCE ANIMATIONS (Intersection Observer)
  // =========================================================================
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // =========================================================================
  // 7. ACTIVE MENU SECTION LINK TRACKING
  // =========================================================================
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 150; // offset for header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 8. INTERACTIVE FAQ ACCORDIONS (SMOOTH HEIGHT)
  // =========================================================================
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const faqItem = header.parentElement;
      const faqBody = faqItem.querySelector('.faq-body');
      
      // Close other FAQs if active
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
          item.classList.remove('active');
          item.querySelector('.faq-body').style.maxHeight = '0px';
        }
      });

      faqItem.classList.toggle('active');
      
      if (faqItem.classList.contains('active')) {
        faqBody.style.maxHeight = `${faqBody.scrollHeight}px`;
      } else {
        faqBody.style.maxHeight = '0px';
      }
    });
  });

  // =========================================================================
  // 9. BACK TO TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});

// ===========================================================================
// 10. SELECT PRICING PLAN HELPER (dropdown synchronizer)
// ===========================================================================
window.selectPricing = function(packageName) {
  const serviceDropdown = document.getElementById('serviceInterested');
  if (!serviceDropdown) return;

  if (packageName.includes('Starter')) {
    serviceDropdown.value = 'Search Engine Optimization (SEO)';
  } else if (packageName.includes('Growth')) {
    serviceDropdown.value = 'Social Media Marketing';
  } else if (packageName.includes('Premium')) {
    serviceDropdown.value = 'Complete Digital Marketing';
  }

  // Smooth scroll down to consultation form section
  const targetSection = document.getElementById('consultation');
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
    
    // Focus full name input field after scroll
    setTimeout(() => {
      const nameInput = document.getElementById('fullName');
      if (nameInput) nameInput.focus();
    }, 800);
  }
};

// ===========================================================================
// 11. LEAD CAPTURE FORM VALIDATION & SIMULATED SUBMIT
// ===========================================================================
window.handleLeadSubmit = function(event) {
  event.preventDefault();
  
  const form = document.getElementById('leadForm');
  const successAlert = document.getElementById('formSuccess');
  
  // Basic validation checks
  const fullName = document.getElementById('fullName').value.trim();
  const mobile = document.getElementById('mobileNumber').value.trim();
  const email = document.getElementById('emailAddress').value.trim();
  const message = document.getElementById('formMessage').value.trim();
  const business = document.getElementById('businessName').value.trim();
  const service = document.getElementById('serviceInterested').value;

  if (!fullName || !mobile || !email || !message) {
    alert("Please fill out all required fields marked with *");
    return;
  }

  // Display submit loading state on button
  const submitBtn = form.querySelector('.form-submit-btn');
  const originalBtnHTML = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Request...';

  // Construct structured data object to simulate sending leads
  const leadData = {
    name: fullName,
    phone: mobile,
    email: email,
    company: business || 'N/A',
    service: service || 'Not Selected',
    message: message
  };

  console.log('Lead request captured:', leadData);

  // We perform an asynchronous Formspree submission or mailto redirect setup.
  // To keep the user experience premium, we will:
  // 1. Submit the form asynchronously using fetch (via a standard form post endpoint, or locally log it).
  // 2. Display our custom animated success banner.
  // 3. Highlight the conversion success.
  // 4. Trigger mailto in background if fallback is needed, but inline success is MUCH more modern!
  
  setTimeout(() => {
    // Hide form scroll and show success alert
    successAlert.style.display = 'flex';
    form.reset();
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;

    // Scroll card to top inside form container to display success banner
    const formCard = document.querySelector('.form-card');
    if (formCard) {
      formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Automatically hide success alert after 8 seconds
    setTimeout(() => {
      successAlert.style.style = 'none';
      // Fade it out
      let opacity = 1;
      const fadeInterval = setInterval(() => {
        if (opacity > 0) {
          opacity -= 0.1;
          successAlert.style.opacity = opacity;
        } else {
          clearInterval(fadeInterval);
          successAlert.style.display = 'none';
          successAlert.style.opacity = 1;
        }
      }, 50);
    }, 8000);

    // Fallback: If user explicitly wants local email client delivery, we can trigger mailto construct:
    const mailtoSubject = encodeURIComponent(`Growth Consultation - ${leadData.name}`);
    const mailtoBody = encodeURIComponent(
      `Lucky Digital Media - Consultation Request Details:\n\n` +
      `Full Name: ${leadData.name}\n` +
      `Mobile: ${leadData.phone}\n` +
      `Email: ${leadData.email}\n` +
      `Business: ${leadData.company}\n` +
      `Service: ${leadData.service}\n\n` +
      `Client Message:\n${leadData.message}`
    );
    
    // We open a mailto trigger so the user can easily hit send to info@luckydigitalmedia.in
    window.location.href = `mailto:info@luckydigitalmedia.in?subject=${mailtoSubject}&body=${mailtoBody}`;

  }, 1500); // 1.5 seconds loading simulation for modern tech feel
};

