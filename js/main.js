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
    sliderContainer.style.transform = `translateX(-${currentSlideIndex * 25}%)`;
    
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

  if (packageName.includes('Silver')) {
    serviceDropdown.value = 'Birthday Shoot';
  } else if (packageName.includes('Gold')) {
    serviceDropdown.value = 'Pre-Wedding Shoot';
  } else if (packageName.includes('Platinum')) {
    serviceDropdown.value = 'Wedding Shots';
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
// 11. LEAD CAPTURE FORM VALIDATION & SABPAISA PAYMENT WORKFLOW
// ===========================================================================
// (SabPaisa uses standard REST API v2 server-to-server endpoints returning checkoutUrls; no client-side SDK needed)

// Payment Choice State Configuration
window.selectedPaymentType = "online";
window.currentLeadData = null;

window.closePaymentModal = function() {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 400);
  }
};

window.selectPaymentOption = function(type) {
  window.selectedPaymentType = type;
  const onlineCard = document.getElementById('optionOnline');
  const offlineCard = document.getElementById('optionOffline');
  
  if (type === 'online') {
    onlineCard.classList.add('active');
    offlineCard.classList.remove('active');
  } else {
    offlineCard.classList.add('active');
    onlineCard.classList.remove('active');
  }
};

window.handleLeadSubmit = function(event) {
  event.preventDefault();
  
  const form = document.getElementById('leadForm');
  
  // Basic validation checks
  const fullName = document.getElementById('fullName').value.trim();
  const mobile = document.getElementById('mobileNumber').value.trim();
  const email = document.getElementById('emailAddress').value.trim();
  const message = document.getElementById('formMessage').value.trim();
  const business = document.getElementById('businessName').value.trim();
  const service = document.getElementById('serviceInterested').value;

  if (!fullName || !mobile || !email || !message || !service) {
    alert("Please fill out all required fields and select a Service Type.");
    return;
  }

  // Calculate pricing values based on selected plan
  let depositAmount = 5000;
  let planName = "Silver Plan - Birthday Shoot";

  if (service === "Wedding Shots") {
    depositAmount = 25000;
    planName = "Platinum Plan - Wedding Shots";
  } else if (service === "Pre-Wedding Shoot") {
    depositAmount = 12000;
    planName = "Gold Plan - Pre-Wedding Shoot";
  } else if (service === "Event Coverage") {
    depositAmount = 10000;
    planName = "Gold Plan - Event Coverage";
  } else if (service === "Birthday Shoot") {
    depositAmount = 5000;
    planName = "Silver Plan - Birthday Shoot";
  }

  // Store data in global lead holder
  window.currentLeadData = {
    name: fullName,
    phone: mobile,
    email: email,
    eventDetails: business || 'N/A',
    service: service || 'Not Selected',
    message: message,
    amount: depositAmount,
    planName: planName
  };

  // Render text values inside payment confirmation modal
  document.getElementById('modalPlanName').textContent = planName;
  document.getElementById('modalDepositAmount').textContent = `₹${depositAmount.toLocaleString('en-IN')}`;

  // Launch Payment Modal with animations
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.style.display = 'flex';
    // Force a browser reflow/repaint to trigger CSS transition
    modal.offsetHeight;
    modal.classList.add('show');
  }
};

// Process checkout or manual booking fallback based on customer decision
window.confirmPaymentChoice = function() {
  window.closePaymentModal();
  
  const leadData = window.currentLeadData;
  if (!leadData) return;

  const form = document.getElementById('leadForm');
  const submitBtn = form.querySelector('.form-submit-btn');
  const originalBtnHTML = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Booking...';

  if (window.selectedPaymentType === 'offline') {
    // Process manual booking details
    window.processManualBooking(leadData, submitBtn, originalBtnHTML);
  } else {
    // Process Online SabPaisa Checkout
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Initiating Payment...';
    
    // We try to call Vercel function first, if that fails we try PHP endpoint, if both fail we fallback to manual
    window.createSabPaisaOrder(leadData)
      .then(responseData => {
        if (!responseData || !responseData.checkoutUrl) {
          throw new Error("Invalid checkout URL returned from server");
        }
        
        // Success: Redirect user to SabPaisa Checkout window
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Redirecting to Payment...';
        window.location.href = responseData.checkoutUrl;
      })
      .catch(error => {
        console.error("Order creation failed, falling back to manual booking:", error);
        alert(
          "Payment Gateway Offline:\n" +
          error.message + "\n\n" +
          "How to resolve:\n" +
          "1. If you are hosting on GitHub Pages, backend scripts (Node/PHP) cannot execute. Please host your repo on Vercel or Netlify (both are free and support our serverless handlers).\n" +
          "2. If you are already on Vercel/PHP hosting, ensure you configured the environment variables SABPAISA_API_KEY and SABPAISA_SECRET_KEY in your hosting provider's dashboard."
        );
        window.processManualBooking(leadData, submitBtn, originalBtnHTML);
      });
  }
};

// Securely invoke Backend Endpoints to generate SabPaisa checkout redirect URL
window.createSabPaisaOrder = async function(leadData) {
  // Setup payload matching our api schemas
  const requestPayload = {
    amount: leadData.amount,
    customerName: leadData.name,
    customerPhone: leadData.phone,
    customerEmail: leadData.email,
    returnUrl: window.location.href // Redirect back here on payment completion
  };

  let errors = [];

  // 1. Attempt Vercel Serverless Function First
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestPayload)
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errData = await response.json().catch(() => ({}));
      errors.push(`- Vercel Serverless: [Status ${response.status}] ${errData.error || 'Server error'}`);
    }
  } catch(e) {
    errors.push(`- Vercel Serverless: [Network/CORS Error] ${e.message}`);
  }

  // 2. Attempt PHP Script Fallback Second
  try {
    const response = await fetch('create_order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestPayload)
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errData = await response.json().catch(() => ({}));
      errors.push(`- PHP Backend: [Status ${response.status}] ${errData.error || 'Server error'}`);
    }
  } catch(e) {
    errors.push(`- PHP Backend: [Network/CORS Error] ${e.message}`);
  }

  throw new Error(errors.join('\n'));
};

// Standard manual submission action
window.processManualBooking = function(leadData, submitBtn, originalBtnHTML) {
  const form = document.getElementById('leadForm');
  const successAlert = document.getElementById('formSuccess');

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
    const mailtoSubject = encodeURIComponent(`Photography Booking Inquiry - ${leadData.name}`);
    const mailtoBody = encodeURIComponent(
      `Lucky Digital Media - Photo Shoot Booking Details:\n\n` +
      `Full Name: ${leadData.name}\n` +
      `Mobile: ${leadData.phone}\n` +
      `Email: ${leadData.email}\n` +
      `Event Date & Venue: ${leadData.eventDetails}\n` +
      `Service Selected: ${leadData.service}\n` +
      `Selected Plan: ${leadData.planName}\n` +
      `Deposit Due (Offline): INR ${leadData.amount.toLocaleString('en-IN')}\n\n` +
      `Event Details / Message:\n${leadData.message}`
    );
    
    // We open a mailto trigger so the user can easily hit send to info@luckydigitalmedia.in
    window.location.href = `mailto:info@luckydigitalmedia.in?subject=${mailtoSubject}&body=${mailtoBody}`;

  }, 1500); // 1.5 seconds loading simulation for modern tech feel
};

// ===========================================================================
// 12. QUICK CUSTOM PAYMENT CONTROL SYSTEM
// ===========================================================================
window.openCustomPaymentModal = function() {
  const modal = document.getElementById('customPaymentModal');
  if (modal) {
    // Reset form inputs
    document.getElementById('customPayName').value = '';
    document.getElementById('customPayPhone').value = '';
    document.getElementById('customPayEmail').value = '';
    document.getElementById('customPayPurpose').value = '';
    document.getElementById('customPayAmount').value = '';

    modal.style.display = 'flex';
    // Force browser repaint to trigger CSS animation
    modal.offsetHeight;
    modal.classList.add('show');
  }
};

window.closeCustomPaymentModal = function() {
  const modal = document.getElementById('customPaymentModal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 400);
  }
};

window.submitCustomPayment = function() {
  const fullName = document.getElementById('customPayName').value.trim();
  const phone = document.getElementById('customPayPhone').value.trim();
  const email = document.getElementById('customPayEmail').value.trim();
  const purpose = document.getElementById('customPayPurpose').value.trim();
  const amountVal = document.getElementById('customPayAmount').value.trim();

  if (!fullName || !phone || !email || !purpose || !amountVal) {
    alert("Please fill out all required fields marked with *");
    return;
  }

  // Validate mobile number format (Exactly 10 digits)
  const phoneReg = /^[0-9]{10}$/;
  if (!phoneReg.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  // Validate email format syntax
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(email)) {
    alert("Please enter a valid email address (e.g., info@luckydigitalmedia.in).");
    return;
  }

  const amount = parseFloat(amountVal);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid positive payment amount.");
    return;
  }

  const payBtn = document.getElementById('btnConfirmCustomPay');
  const originalBtnHTML = payBtn.innerHTML;
  
  payBtn.disabled = true;
  payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Initiating Payment...';

  // Construct structured data object to send to backend API
  const paymentData = {
    name: fullName,
    phone: phone,
    email: email,
    amount: amount,
    service: "Custom Payment",
    planName: `Custom Payment: ${purpose}`,
    eventDetails: `Purpose: ${purpose}`
  };

  // Trigger backend API call to generate SabPaisa Order redirect URL
  window.createSabPaisaOrder(paymentData)
    .then(responseData => {
      if (!responseData || !responseData.checkoutUrl) {
        throw new Error("Invalid checkout response");
      }
      
      payBtn.innerHTML = '<i class="fas fa-check-circle"></i> Redirecting to Payment...';
      
      // Close custom payment modal before redirecting
      window.closeCustomPaymentModal();
      
      // Redirect directly to SabPaisa Checkout Page
      window.location.href = responseData.checkoutUrl;
    })
    .catch(error => {
      console.error("Custom order creation failed:", error);
      alert(
        "Payment Gateway Offline:\n" +
        error.message + "\n\n" +
        "How to resolve:\n" +
        "1. If you are hosting on GitHub Pages, backend scripts (Node/PHP) cannot execute. Please host your repo on Vercel or Netlify (both are free and support our serverless handlers).\n" +
        "2. If you are already on Vercel/PHP hosting, ensure you configured the environment variables SABPAISA_API_KEY and SABPAISA_SECRET_KEY in your hosting provider's dashboard."
      );
      payBtn.disabled = false;
      payBtn.innerHTML = originalBtnHTML;
    });
};

