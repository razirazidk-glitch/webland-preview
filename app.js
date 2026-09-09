/**
 * Webland.dk – Interaktiv Applikationslogik
 * Håndterer skabelongalleri, filtrering, modaler, onboarding-skema og sælgerkontakt
 */

document.addEventListener('DOMContentLoaded', () => {
  initTemplatesGrid();
  initFilterTabs();
  initModal();
  initOnboardingForm();
  initCallbackForm();
  initFaqAccordion();
  initMobileNav();
});

// Toast Notifikation System
function showToast(message, type = 'primary') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
    <span class="toast-msg">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// 1. Initialisering og Rendering af de 15 Skabeloner
function initTemplatesGrid(filter = 'all') {
  const grid = document.getElementById('templates-grid');
  if (!grid || typeof TEMPLATES_DATA === 'undefined') return;

  grid.innerHTML = '';

  const filtered = filter === 'all' 
    ? TEMPLATES_DATA 
    : TEMPLATES_DATA.filter(t => t.category === filter);

  filtered.forEach(template => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.setAttribute('data-id', template.id);

    // Mockup visual builder
    card.innerHTML = `
      <div class="mockup-preview">
        <div class="mockup-bar">
          <div class="mockup-dot"></div>
          <div class="mockup-dot"></div>
          <div class="mockup-dot"></div>
          <span class="mockup-url">webland.dk/demo/${template.id}</span>
        </div>
        <div class="mockup-body">
          <div class="mockup-hero-block" style="border-left: 3px solid ${template.accentColor};">
            <span style="font-size: 0.72rem; font-weight: 700; color: #fff;">${template.title}</span>
            <div class="mockup-accent-pill" style="background: ${template.accentColor};"></div>
          </div>
          <div class="mockup-grid-blocks">
            <div class="mockup-sub-block"></div>
            <div class="mockup-sub-block"></div>
            <div class="mockup-sub-block"></div>
          </div>
        </div>
      </div>

      <div class="template-card-body">
        <div class="template-meta-row">
          <span class="template-target">${template.target}</span>
          <span class="badge ${template.category === 'erhverv' ? 'badge-emerald' : 'badge-amber'}">${template.badge}</span>
        </div>

        <h3 class="template-title">${template.title}</h3>
        <p class="template-desc">${template.shortDesc}</p>

        <div class="template-pages-tag">
          <div class="pages-tag-title">
            <span>5 Undersider inkluderet:</span>
            <strong>10.000 kr.</strong>
          </div>
          <div class="pages-chip-list">
            ${template.pages.map(p => `<span class="page-chip">${p.name}</span>`).join('')}
          </div>
        </div>

        <div class="template-actions">
          <button class="btn btn-outline btn-sm btn-details" onclick="openTemplateModal('${template.id}')">
            Se detaljer
          </button>
          <button class="btn btn-primary btn-sm btn-select" onclick="selectTemplate('${template.id}')">
            Vælg skabelon →
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// 2. Filter Tabs
function initFilterTabs() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      initTemplatesGrid(category);
    });
  });
}

// 3. Modal Logik for Skabelon-detaljer
let currentModalTemplateId = null;

function initModal() {
  const modal = document.getElementById('template-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

window.openTemplateModal = function(id) {
  const template = TEMPLATES_DATA.find(t => t.id === id);
  if (!template) return;

  currentModalTemplateId = id;
  const modal = document.getElementById('template-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalTarget = document.getElementById('modal-target');
  const modalDesc = document.getElementById('modal-desc');
  const modalPagesList = document.getElementById('modal-pages-list');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalBanner = document.getElementById('modal-banner');

  if (modalTitle) modalTitle.textContent = template.title;
  if (modalTarget) modalTarget.textContent = `${template.target} • ${template.badge}`;
  if (modalDesc) modalDesc.textContent = template.fullDesc;

  if (modalBanner) {
    modalBanner.style.borderBottom = `3px solid ${template.accentColor}`;
  }

  if (modalPagesList) {
    modalPagesList.innerHTML = template.pages.map((p, idx) => `
      <div class="modal-page-item">
        <div class="page-item-num">${idx + 1}</div>
        <div class="page-item-content">
          <h5>${p.name}</h5>
          <p>${p.desc}</p>
        </div>
      </div>
    `).join('');
  }

  if (modalHighlights) {
    modalHighlights.innerHTML = template.highlights.map(h => `
      <span class="badge badge-emerald" style="margin-right: 6px; margin-bottom: 6px;">✓ ${h}</span>
    `).join('');
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  const modal = document.getElementById('template-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.selectTemplateFromModal = function() {
  if (currentModalTemplateId) {
    closeModal();
    selectTemplate(currentModalTemplateId);
  }
};

// 4. Vælg Skabelon Action (Knytter til Onboarding-skema)
window.selectTemplate = function(id) {
  const template = TEMPLATES_DATA.find(t => t.id === id);
  if (!template) return;

  // Opdater dropdown i skemaet
  const select = document.getElementById('selected-template-input');
  if (select) {
    select.value = template.id;
  }

  // Scroll glidende ned til skemaet
  const onboardingSection = document.getElementById('onboarding');
  if (onboardingSection) {
    onboardingSection.scrollIntoView({ behavior: 'smooth' });
  }

  showToast(`Skabelon valgt: "${template.title}". Skemaet er forudfyldt!`, 'success');
};

// 5. Onboarding Form & Logo Valg
function initOnboardingForm() {
  // Populate skabelon select dropdown
  const select = document.getElementById('selected-template-input');
  if (select && typeof TEMPLATES_DATA !== 'undefined') {
    select.innerHTML = '<option value="">-- Vælg en skabelon (eller beslut senere med sælger) --</option>';
    TEMPLATES_DATA.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = `${t.title} (${t.target})`;
      select.appendChild(opt);
    });
  }

  // Logo Radio Cards Switch
  const logoCards = document.querySelectorAll('.logo-radio-card');
  const uploadContainer = document.getElementById('logo-upload-container');
  const newLogoContainer = document.getElementById('new-logo-container');

  logoCards.forEach(card => {
    card.addEventListener('click', () => {
      logoCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const val = card.getAttribute('data-logo-type');

      if (val === 'have-logo') {
        if (uploadContainer) uploadContainer.style.display = 'block';
        if (newLogoContainer) newLogoContainer.style.display = 'none';
      } else {
        if (uploadContainer) uploadContainer.style.display = 'none';
        if (newLogoContainer) newLogoContainer.style.display = 'block';
      }
    });
  });

  // Mock File Upload
  const fileInput = document.getElementById('logo-file-input');
  const dropzone = document.getElementById('logo-dropzone');
  const previewBox = document.getElementById('logo-preview-box');
  const previewText = document.getElementById('logo-preview-text');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (previewText) previewText.textContent = `Valgt logo: ${file.name} (${Math.round(file.size / 1024)} KB)`;
        if (previewBox) previewBox.style.display = 'flex';
        showToast(`Logo fil "${file.name}" indlæst!`, 'success');
      }
    });
  }

  // Form submission
  const form = document.getElementById('client-onboarding-form');
  const successCard = document.getElementById('form-success-card');
  const submitBtn = document.getElementById('submit-brief-btn');

  if (form && successCard) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sender skema...';
      }

      setTimeout(() => {
        form.style.display = 'none';
        successCard.style.display = 'block';
        successCard.scrollIntoView({ behavior: 'smooth' });
        showToast('Onboarding-skema modtaget! Sælgeren kobler det med domænet nu.', 'success');
      }, 900);
    });
  }
}

// 6. Callback Sælger Form
function initCallbackForm() {
  const callbackForm = document.getElementById('callback-form');
  if (callbackForm) {
    callbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phoneInput = callbackForm.querySelector('input[type="tel"]');
      const phone = phoneInput ? phoneInput.value : '';
      
      showToast(`Tak! Vi har registreret ${phone}. En sælger ringer inden for 15 minutter.`, 'success');
      callbackForm.reset();
    });
  }
}

// 7. FAQ Akkordeon
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// 8. Mobil Navigation
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '80px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = '#0b0f19';
      navLinks.style.padding = '24px';
      navLinks.style.borderBottom = '1px solid var(--color-border)';
    });
  }
}
