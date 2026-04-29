// ============================
// NAVBAR SCROLL EFFECT
// ============================
const mainNav = document.getElementById('main-nav');
if (mainNav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  });
}

// ============================
// SCROLL TO TOP BUTTON
// ============================
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================
// SCROLL REVEAL ANIMATION
// ============================
function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============================
// PROGRESS BAR ANIMATION (Skills Page)
// ============================
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-bar[data-width]');
  bars.forEach(bar => {
    const rect = bar.closest('.skill-card').getBoundingClientRect();
    if (rect.top < window.innerHeight - 50 && !bar.dataset.animated) {
      bar.style.width = bar.dataset.width + '%';
      bar.dataset.animated = true;
    }
  });
}

window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', () => {
  // Set all progress bars to 0 first
  document.querySelectorAll('.progress-bar[data-width]').forEach(bar => {
    bar.style.width = '0%';
  });
  setTimeout(animateProgressBars, 400);
});

// ============================
// CONTACT FORM VALIDATION
// ============================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const formAlert = document.getElementById('formAlert');
  const submitBtn = document.getElementById('submitBtn');

  // Real-time validation helpers
  function showError(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    const feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.textContent = message;
    }
  }

  function showSuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }

  function validateName() {
    const val = nameInput.value.trim();
    if (!val) {
      showError(nameInput, 'Nama tidak boleh kosong.');
      return false;
    } else if (val.length < 3) {
      showError(nameInput, 'Nama minimal 3 karakter.');
      return false;
    }
    showSuccess(nameInput);
    return true;
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      showError(emailInput, 'Email tidak boleh kosong.');
      return false;
    } else if (!emailRegex.test(val)) {
      showError(emailInput, 'Format email tidak valid.');
      return false;
    }
    showSuccess(emailInput);
    return true;
  }

  function validateSubject() {
    const val = subjectInput.value.trim();
    if (!val) {
      showError(subjectInput, 'Subjek tidak boleh kosong.');
      return false;
    } else if (val.length < 5) {
      showError(subjectInput, 'Subjek minimal 5 karakter.');
      return false;
    }
    showSuccess(subjectInput);
    return true;
  }

  function validateMessage() {
    const val = messageInput.value.trim();
    if (!val) {
      showError(messageInput, 'Pesan tidak boleh kosong.');
      return false;
    } else if (val.length < 20) {
      showError(messageInput, 'Pesan minimal 20 karakter.');
      return false;
    }
    showSuccess(messageInput);
    return true;
  }

  // Live validation on blur
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  subjectInput.addEventListener('blur', validateSubject);
  messageInput.addEventListener('blur', validateMessage);

  // Clear error on input
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    });
  });

  // Form submit
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const isNameOk = validateName();
    const isEmailOk = validateEmail();
    const isSubjectOk = validateSubject();
    const isMessageOk = validateMessage();

    if (isNameOk && isEmailOk && isSubjectOk && isMessageOk) {
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';

      // Simulate sending
      setTimeout(() => {
        formAlert.className = 'alert alert-success';
        formAlert.innerHTML = `
          <i class="bi bi-check-circle-fill me-2"></i>
          <strong>Pesan berhasil dikirim!</strong> Terima kasih, saya akan segera membalas pesanmu.
        `;
        formAlert.classList.remove('d-none');
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Reset form
        contactForm.reset();
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
          input.classList.remove('is-valid', 'is-invalid');
        });

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Kirim Pesan';

        // Auto hide alert
        setTimeout(() => {
          formAlert.classList.add('d-none');
        }, 6000);
      }, 1800);
    } else {
      formAlert.className = 'alert alert-danger';
      formAlert.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        <strong>Ada kesalahan!</strong> Mohon periksa kembali isian form di atas.
      `;
      formAlert.classList.remove('d-none');
    }
  });

  // Character counter for message
  messageInput.addEventListener('input', function() {
    const counter = document.getElementById('msgCounter');
    if (counter) {
      counter.textContent = this.value.length + ' karakter';
    }
  });
}

// ============================
// GALLERY MODAL
// ============================
const galleryItems = document.querySelectorAll('.gallery-placeholder, .gallery-item');
if (galleryItems.length > 0) {
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const title = this.dataset.title || 'Gallery';
      const desc = this.dataset.desc || 'Foto dari galeri saya.';
      const modalTitle = document.getElementById('galleryModalTitle');
      const modalDesc = document.getElementById('galleryModalDesc');
      const modalImg = document.getElementById('galleryModalImg');

      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;

      const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
      galleryModal.show();
    });
  });
}

// ============================
// TYPED TEXT EFFECT (Home page)
// ============================
const typedEl = document.getElementById('typedText');
if (typedEl) {
  const texts = ['Web Developer', 'UI Designer', 'Mahasiswa Aktif', 'Problem Solver'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const current = texts[textIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeText, 1800);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(typeText, isDeleting ? 60 : 100);
  }

  typeText();
}