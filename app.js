/**
 * Webland.dk – Interaktiv Applikationslogik
 * Håndterer multi-page navigation, inspirationsgalleri med 15 eksempler, filtrering, modaler, onboarding-skema og sælgerkontakt
 */

document.addEventListener('DOMContentLoaded', () => {
  initTemplatesGrid();
  initFilterTabs();
  initModal();
  initOnboardingForm();
  initCallbackForm();
  initFaqAccordion();
  initMobileNav();
  highlightActiveNavLink();
});

// Aktiv Navigationslink baseret på URL
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

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

// 1. Initialisering og Rendering af Eksempler på hjemmesider vi kan bygge
function initTemplatesGrid(filter = 'all') {
  const grid = document.getElementById('templates-grid');
  if (!grid || typeof TEMPLATES_DATA === 'undefined') return;

  // Tjek om der er sat et maks antal (f.eks. på forsiden teaser)
  const maxLimitAttr = grid.getAttribute('data-limit');
  const maxLimit = maxLimitAttr ? parseInt(maxLimitAttr, 10) : null;

  grid.innerHTML = '';

  let filtered = filter === 'all' 
    ? TEMPLATES_DATA 
    : TEMPLATES_DATA.filter(t => t.category === filter);

  if (maxLimit && maxLimit > 0) {
    filtered = filtered.slice(0, maxLimit);
  }

  filtered.forEach(template => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.setAttribute('data-id', template.id);

    card.innerHTML = `
      <div class="mockup-preview" onclick="openTemplateModal('${template.id}')" title="Klik for at se visuelt eksempel på designet">
        <div class="mockup-bar">
          <div class="mockup-dot"></div>
          <div class="mockup-dot"></div>
          <div class="mockup-dot"></div>
          <span class="mockup-url">webland.dk/eksempler/${template.id}</span>
          <span class="mockup-preview-hint">👁️ Se design</span>
        </div>
        <div class="mockup-img-container">
          <img src="${template.image}" alt="${template.title}" class="mockup-card-img" loading="lazy">
          <div class="mockup-overlay-badge">
            <span>👁️ Se fuld forhåndsvisning</span>
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

        <div style="font-size: 0.76rem; color: #94a3b8; display: flex; align-items: center; gap: 5px; margin-bottom: 12px;">
          <span style="color: #38bdf8;">✨</span> <span>Kan tilpasses til <strong>enhver branche</strong></span>
        </div>

        <div class="template-actions">
          <button class="btn btn-outline btn-sm btn-details" onclick="openTemplateModal('${template.id}')">
            Se detaljer
          </button>
          <button class="btn btn-primary btn-sm btn-select" onclick="selectTemplate('${template.id}')">
            Brug som inspiration →
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

// 3. Modal Logik for Eksempler & Detaljer
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
  const modalImage = document.getElementById('modal-image');
  const modalUrl = document.getElementById('modal-url');
  const modalViewFull = document.getElementById('modal-view-full');

  if (modalTitle) modalTitle.textContent = template.title;
  if (modalTarget) modalTarget.textContent = `${template.target} • ${template.badge}`;
  if (modalDesc) modalDesc.textContent = template.fullDesc;

  if (modalImage) {
    modalImage.src = template.image;
    modalImage.alt = `Visuelt forhåndsvisningsbillede: ${template.title}`;
  }

  if (modalUrl) {
    modalUrl.textContent = `https://${template.id}.webland-demo.dk`;
  }

  if (modalViewFull) {
    modalViewFull.href = template.image;
  }

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

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
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

// 4. Vælg Eksempel Action (Knytter inspiration til Onboarding-skema)
window.selectTemplate = function(id) {
  const template = TEMPLATES_DATA.find(t => t.id === id);
  if (!template) return;

  const hiddenInput = document.getElementById('selected-template-input');
  const onboardingSection = document.getElementById('onboarding') || document.querySelector('.onboarding-section');

  // Hvis vi allerede er på onboarding-siden med visuel vælger
  if (hiddenInput && typeof window.selectVisualTemplate === 'function') {
    window.selectVisualTemplate(id);
    const showcase = document.getElementById('selected-template-showcase');
    if (showcase) showcase.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast(`Visuel inspiration valgt: "${template.title}". Vi tilpasser 100% til din branche!`, 'success');
  } else {
    // Hvis vi er på eksempler.html eller forsiden, navigér til onboarding.html med parameter
    window.location.href = `onboarding.html?eksempel=${encodeURIComponent(id)}`;
  }
};

// 5. Onboarding Form & Visuel Eksempelvælger
function initOnboardingForm() {
  const hiddenInput = document.getElementById('selected-template-input');
  const pickerGrid = document.getElementById('visual-picker-grid');
  const showcase = document.getElementById('selected-template-showcase');
  const neutralCard = document.getElementById('neutral-choice-card');
  const filterBtns = document.querySelectorAll('.picker-tab-btn');

  if (pickerGrid && typeof TEMPLATES_DATA !== 'undefined') {
    let currentFilter = 'all';

    function renderVisualPickerCards() {
      const list = currentFilter === 'all'
        ? TEMPLATES_DATA
        : TEMPLATES_DATA.filter(t => t.category === currentFilter);

      const selectedId = hiddenInput ? hiddenInput.value : '';

      pickerGrid.innerHTML = list.map(t => {
        const isSelected = t.id === selectedId;
        return `
          <div class="visual-picker-card ${isSelected ? 'active' : ''}" data-id="${t.id}" onclick="selectVisualTemplate('${t.id}')">
            <div class="visual-picker-thumb">
              <img src="${t.image}" alt="${t.title}" loading="lazy">
              <div class="visual-picker-check">${isSelected ? '✓' : ''}</div>
            </div>
            <div class="visual-picker-body">
              <div class="visual-picker-badge">${t.badge}</div>
              <div class="visual-picker-title">${t.title}</div>
              <div class="visual-picker-footer">
                <span class="visual-picker-preview-link" onclick="event.stopPropagation(); openTemplateModal('${t.id}')" title="Se stort billede og undersider">
                  👁️ Se detaljer
                </span>
                <span class="visual-picker-select-btn ${isSelected ? 'btn-emerald' : 'btn-outline'}" style="display: inline-block;">
                  ${isSelected ? '✓ Valgt' : 'Vælg'}
                </span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    window.selectVisualTemplate = function(id) {
      if (hiddenInput) hiddenInput.value = id;

      const matched = TEMPLATES_DATA.find(t => t.id === id);
      if (matched) {
        if (neutralCard) neutralCard.classList.remove('active');
        if (showcase) {
          showcase.style.display = 'block';
          const img = document.getElementById('showcase-img');
          const badge = document.getElementById('showcase-badge');
          const title = document.getElementById('showcase-title');
          const target = document.getElementById('showcase-target');
          const desc = document.getElementById('showcase-desc');
          const urlMock = document.getElementById('showcase-url');
          const modalBtn = document.getElementById('showcase-modal-btn');

          if (img) img.src = matched.image;
          if (badge) badge.textContent = `${matched.badge}`;
          if (title) title.textContent = matched.title;
          if (target) target.textContent = `${matched.target} • Tilpasses til enhver branche`;
          if (desc) desc.textContent = matched.shortDesc || matched.fullDesc;
          if (urlMock) urlMock.textContent = `https://${matched.id}.webland-demo.dk`;
          if (modalBtn) modalBtn.onclick = () => openTemplateModal(matched.id);
        }
      }
      renderVisualPickerCards();
    };

    window.selectNoTemplate = function() {
      if (hiddenInput) hiddenInput.value = '';
      if (showcase) showcase.style.display = 'none';
      if (neutralCard) neutralCard.classList.add('active');
      renderVisualPickerCards();
    };

    // Filter knapper
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-picker-filter');
        renderVisualPickerCards();
      });
    });

    // Showcase clear knap
    const clearBtn = document.getElementById('showcase-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', window.selectNoTemplate);
    }

    // Tjek om der er et eksempel overført i URL-parameter (?eksempel=)
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedId = urlParams.get('eksempel') || urlParams.get('skabelon');
    if (preselectedId) {
      window.selectVisualTemplate(preselectedId);
      const matched = TEMPLATES_DATA.find(t => t.id === preselectedId);
      if (matched) {
        setTimeout(() => {
          showToast(`Visuel inspiration forudvalgt: "${matched.title}". Vi tilpasser det 100% til din branche!`, 'success');
        }, 300);
      }
    } else {
      renderVisualPickerCards();
    }
  }

  // 5b. E-mail Checkboxes & Custom E-mails System (Sektion 02)
  const domainInput = document.getElementById('domain-name-input');
  const customEmailInput = document.getElementById('custom-email-input');
  const customEmailsList = document.getElementById('custom-emails-list');
  const emailsSummaryChips = document.getElementById('emails-summary-chips');
  const emailsCountBadge = document.getElementById('emails-count-badge');
  const selectedEmailsHidden = document.getElementById('selected-emails-input');

  const selectedStandardEmails = new Set(['kontakt']);
  const customEmails = [];

  function getCleanDomain() {
    if (!domainInput) return 'ditdomæne.dk';
    let val = domainInput.value.trim().toLowerCase();
    val = val.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
    return val || 'ditdomæne.dk';
  }

  function updateDomainSuffixes() {
    const domain = getCleanDomain();
    document.querySelectorAll('.domain-preview-suffix').forEach(el => {
      el.textContent = domain;
    });
    document.querySelectorAll('.custom-domain-suffix').forEach(el => {
      el.textContent = domain;
    });
    renderEmailsSummary();
  }

  function renderEmailsSummary() {
    if (!emailsSummaryChips) return;
    const domain = getCleanDomain();
    const allEmails = [];

    selectedStandardEmails.forEach(prefix => {
      allEmails.push({ email: `${prefix}@${domain}`, isStandard: true, prefix });
    });

    customEmails.forEach((prefix, idx) => {
      allEmails.push({ email: `${prefix}@${domain}`, isStandard: false, index: idx, prefix });
    });

    if (allEmails.length === 0) {
      emailsSummaryChips.innerHTML = `
        <span style="font-size: 0.82rem; color: #f59e0b;">
          ⚠️ Ingen e-mails valgt. Vi anbefaler at vælge mindst <em>kontakt@</em> til henvendelser.
        </span>
      `;
      if (emailsCountBadge) emailsCountBadge.textContent = '0 valgt';
      if (selectedEmailsHidden) selectedEmailsHidden.value = '';
      return;
    }

    emailsSummaryChips.innerHTML = allEmails.map(item => `
      <span class="email-tag-chip ${item.isStandard ? 'standard' : ''}">
        <span>${item.email}</span>
      </span>
    `).join('');

    if (emailsCountBadge) {
      emailsCountBadge.textContent = `${allEmails.length} ${allEmails.length === 1 ? 'valgt' : 'valgte'}`;
    }

    if (selectedEmailsHidden) {
      selectedEmailsHidden.value = allEmails.map(i => i.email).join(', ');
    }
  }

  function renderCustomEmailsList() {
    if (!customEmailsList) return;
    const domain = getCleanDomain();

    if (customEmails.length === 0) {
      customEmailsList.innerHTML = '';
      return;
    }

    customEmailsList.innerHTML = customEmails.map((prefix, idx) => `
      <span class="email-tag-chip">
        <span>${prefix}@${domain}</span>
        <button type="button" class="email-tag-remove" onclick="removeCustomEmail(${idx})" title="Fjern e-mail">✕</button>
      </span>
    `).join('');
  }

  window.toggleEmailOption = function(prefix) {
    const card = document.getElementById(`email-opt-${prefix}`);
    if (!card) return;

    if (selectedStandardEmails.has(prefix)) {
      selectedStandardEmails.delete(prefix);
      card.classList.remove('active');
      const box = card.querySelector('.email-checkbox-box');
      if (box) box.textContent = '';
    } else {
      selectedStandardEmails.add(prefix);
      card.classList.add('active');
      const box = card.querySelector('.email-checkbox-box');
      if (box) box.textContent = '✓';
    }

    renderEmailsSummary();
  };

  window.addCustomEmail = function() {
    if (!customEmailInput) return;
    let val = customEmailInput.value.trim().toLowerCase();
    val = val.replace(/@.*$/, '').replace(/[^a-z0-9._-]/g, '');

    if (!val) {
      showToast('Indtast venligst et gyldigt e-mailnavn (f.eks. peter, salg)', 'warning');
      return;
    }

    if (selectedStandardEmails.has(val) || customEmails.includes(val)) {
      showToast(`E-mailen "${val}@" er allerede på din liste.`, 'info');
      return;
    }

    customEmails.push(val);
    customEmailInput.value = '';
    renderCustomEmailsList();
    renderEmailsSummary();
    showToast(`E-mail "${val}@${getCleanDomain()}" tilføjet til oprettelse!`, 'success');
  };

  window.removeCustomEmail = function(idx) {
    if (idx >= 0 && idx < customEmails.length) {
      const removed = customEmails.splice(idx, 1);
      renderCustomEmailsList();
      renderEmailsSummary();
      showToast(`"${removed[0]}@" fjernet.`, 'info');
    }
  };

  if (domainInput) {
    domainInput.addEventListener('input', () => {
      updateDomainSuffixes();
      renderCustomEmailsList();
    });
  }

  if (customEmailInput) {
    customEmailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        window.addCustomEmail();
      }
    });
  }

  // Initial render
  updateDomainSuffixes();
  renderEmailsSummary();

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
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = '#0b0f19';
      navLinks.style.padding = '24px';
      navLinks.style.borderBottom = '1px solid var(--color-border)';
      navLinks.style.zIndex = '150';
    });
  }
}
