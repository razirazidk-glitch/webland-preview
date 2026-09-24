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
let currentCategoryFilter = 'all';
let currentLayoutFilter = 'all';

function renderTemplatesGrid() {
  const grid = document.getElementById('templates-grid');
  if (!grid || typeof TEMPLATES_DATA === 'undefined') return;

  const maxLimitAttr = grid.getAttribute('data-limit');
  const maxLimit = maxLimitAttr ? parseInt(maxLimitAttr, 10) : null;

  grid.innerHTML = '';

  let filtered = TEMPLATES_DATA.filter(t => {
    const matchCategory = currentCategoryFilter === 'all' || t.category === currentCategoryFilter;
    const matchLayout = currentLayoutFilter === 'all' || t.layoutType === currentLayoutFilter;
    return matchCategory && matchLayout;
  });

  if (maxLimit && maxLimit > 0) {
    filtered = filtered.slice(0, maxLimit);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 12px; margin: 20px 0;">
        <p style="font-size: 1.1rem; font-weight: 700; color: #334155; margin-bottom: 6px;">Ingen eksempler matcher denne kombination</p>
        <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 16px;">Prøv at vælge en anden kategori eller layout-stil.</p>
        <button class="btn btn-primary btn-sm" onclick="resetAllFilters()">Nulstil alle filtre (vis alle 25)</button>
      </div>
    `;
    return;
  }

  filtered.forEach((template, index) => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.setAttribute('data-id', template.id);

    const isAboveFold = index < 3;
    const isLcpCandidate = index === 0;

    card.innerHTML = `
      <div class="mockup-preview" tabindex="0" role="button" aria-label="Se forhåndsvisning af ${template.title}" onclick="openTemplateModal('${template.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openTemplateModal('${template.id}');}" title="Klik for at se visuelt eksempel på designet">
        <div class="mockup-bar">
          <div class="mockup-dot"></div>
          <div class="mockup-dot"></div>
          <div class="mockup-dot"></div>
          <span class="mockup-url">webland.dk/eksempler/${template.id}</span>
          <span class="mockup-preview-hint">👁️ Se design</span>
        </div>
        <div class="mockup-img-container">
          <img src="${template.image}" alt="Webdesign eksempel for ${template.title}" class="mockup-card-img" width="600" height="375" decoding="async" loading="${isAboveFold ? 'eager' : 'lazy'}" ${isLcpCandidate ? 'fetchpriority="high"' : ''}>
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

        <div class="template-layout-row">
          <span class="badge badge-layout">${template.layoutBadge || '🏛️ Unikt Layout'}</span>
        </div>

        <h3 class="template-title">${template.title}</h3>
        <p class="template-desc">${template.shortDesc}</p>

        <div class="template-pages-tag">
          <div class="pages-tag-title">
            <span>5 Undersider inkluderet:</span>
            <strong>9.995 kr. <span style="font-size: 0.72rem; font-weight: 500; color: #64748b;">excl. moms</span></strong>
          </div>
          <div class="pages-chip-list">
            ${template.pages.map(p => `<span class="page-chip">${p.name}</span>`).join('')}
          </div>
        </div>

        <div style="font-size: 0.76rem; color: #64748b; display: flex; align-items: center; justify-content: space-between; gap: 5px; margin-bottom: 12px; flex-wrap: wrap;">
          <span><span style="color: #38bdf8;">✨</span> Kan tilpasses <strong>alle brancher</strong></span>
          <span style="color: #059669; font-weight: 700;">🛡️ 0 kr./md. • Nul binding</span>
        </div>

        <div class="template-actions">
          <button class="btn btn-outline btn-sm btn-details" onclick="openTemplateModal('${template.id}')">
            Se forhåndsvisning & detaljer
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function initTemplatesGrid(filter = 'all') {
  currentCategoryFilter = filter;
  renderTemplatesGrid();
}

// 2. Filter Tabs (Brancher & Layout-Arkitektur)
function initFilterTabs() {
  const catButtons = document.querySelectorAll('.filter-btn');
  catButtons.forEach(btn => {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', () => {
      catButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const category = btn.getAttribute('data-filter');
      currentCategoryFilter = category;
      renderTemplatesGrid();
    });
  });

  const layoutButtons = document.querySelectorAll('.filter-layout-btn');
  layoutButtons.forEach(btn => {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', () => {
      layoutButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const layout = btn.getAttribute('data-layout');
      currentLayoutFilter = layout;
      renderTemplatesGrid();
    });
  });
}

window.resetAllFilters = function() {
  currentCategoryFilter = 'all';
  currentLayoutFilter = 'all';
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
  document.querySelectorAll('.filter-layout-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-layout') === 'all'));
  renderTemplatesGrid();
};

// 3. Modal Logik for Eksempler & Detaljer
let currentModalTemplateId = null;
let lastFocusedElementBeforeModal = null;

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
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal();
    }

    // Focus trapping inside active modal
    if (e.key === 'Tab') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) {
        const focusables = activeModal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (focusables.length > 0) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
  });
}

window.openTemplateModal = function(id) {
  const template = TEMPLATES_DATA.find(t => t.id === id);
  if (!template) return;

  currentModalTemplateId = id;
  const modal = document.getElementById('template-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalTarget = document.getElementById('modal-target');
  const modalLayoutBadge = document.getElementById('modal-layout-badge');
  const modalLayoutBox = document.getElementById('modal-layout-box');
  const modalDesc = document.getElementById('modal-desc');
  const modalPagesList = document.getElementById('modal-pages-list');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalBanner = document.getElementById('modal-banner');
  const modalImage = document.getElementById('modal-image');
  const modalUrl = document.getElementById('modal-url');
  const modalViewFull = document.getElementById('modal-view-full');

  if (modalTitle) modalTitle.textContent = template.title;
  if (modalTarget) modalTarget.textContent = `${template.target} • ${template.badge}`;
  if (modalLayoutBadge) modalLayoutBadge.textContent = template.layoutBadge || '🏛️ Unikt Layout';
  if (modalLayoutBox) {
    modalLayoutBox.innerHTML = `
      <div class="modal-layout-badge-box">
        <span class="badge badge-layout">${template.layoutBadge || '🏛️ Unikt Layout'}</span>
        <span style="font-size: 0.88rem; color: #475569; line-height: 1.4;">${template.layoutDesc || ''}</span>
      </div>
    `;
  }
  if (modalDesc) modalDesc.textContent = template.fullDesc;

  if (modalImage) {
    modalImage.src = template.image;
    modalImage.alt = `Visuelt forhåndsvisningsbillede: ${template.title}`;
    modalImage.width = 1200;
    modalImage.height = 750;
    modalImage.decoding = 'async';
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
    const badgesHtml = template.highlights.map(h => `
      <span class="badge badge-emerald" style="margin-right: 6px; margin-bottom: 6px;">✓ ${h}</span>
    `).join('');
    modalHighlights.innerHTML = badgesHtml;
  }

  if (modal) {
    lastFocusedElementBeforeModal = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }
};

function closeModal() {
  const modal = document.getElementById('template-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElementBeforeModal && typeof lastFocusedElementBeforeModal.focus === 'function') {
      lastFocusedElementBeforeModal.focus();
    }
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
          <div class="visual-picker-card ${isSelected ? 'active' : ''}" data-id="${t.id}">
            <div class="visual-picker-thumb" onclick="openTemplateModal('${t.id}')" title="Tryk på billedet for at se det i en stor popup">
              <img src="${t.image}" alt="${t.title}" loading="lazy">
              <div class="visual-picker-thumb-overlay">
                <span>👁️ Se i stor popup</span>
              </div>
              <div class="visual-picker-check">${isSelected ? '✓' : ''}</div>
            </div>
            <div class="visual-picker-body">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 6px;">
                <div class="visual-picker-badge" style="margin-bottom: 0;">${t.badge}</div>
              </div>
              <div class="visual-picker-title">${t.title}</div>
              <div class="visual-picker-desc">${t.shortDesc}</div>
              <div class="visual-picker-actions">
                <button type="button" 
                        class="btn ${isSelected ? 'btn-emerald' : 'btn-primary'} visual-picker-wide-btn" 
                        onclick="selectVisualTemplate('${t.id}')">
                  ${isSelected ? '✓ Dette eksempel er valgt' : 'Vælg dette eksempel'}
                </button>
                <div class="visual-picker-preview-link" onclick="openTemplateModal('${t.id}')">
                  👁️ Se stort popop preview
                </div>
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
        if (typeof window.updateColorPaletteForTemplate === 'function') {
          window.updateColorPaletteForTemplate(matched);
        }
      }
      renderVisualPickerCards();
    };

    window.selectNoTemplate = function() {
      if (hiddenInput) hiddenInput.value = '';
      if (showcase) showcase.style.display = 'none';
      if (neutralCard) neutralCard.classList.add('active');
      if (typeof window.updateColorPaletteForTemplate === 'function') {
        window.updateColorPaletteForTemplate(null);
      }
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

  const selectedStandardEmails = new Set();
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
        <div style="font-size: 0.85rem; color: #64748b; display: flex; align-items: center; gap: 8px; padding: 4px 0;">
          <span>👆</span> <span><strong>Ingen e-mails valgt endnu.</strong> Tag et aktivt valg ovenfor: Klik på de adresser du ønsker oprettet (eller brug hurtigknappen <em>"👉 Jeg ønsker kun kontakt@"</em>).</span>
        </div>
      `;
      if (emailsCountBadge) {
        emailsCountBadge.textContent = '0 valgt (Aktivt valg)';
        emailsCountBadge.style.background = 'var(--color-bg-secondary)';
        emailsCountBadge.style.color = 'var(--color-text-dim)';
      }
      if (selectedEmailsHidden) selectedEmailsHidden.value = 'Ingen e-mails (bruger ekstern mail)';
      return;
    }

    emailsSummaryChips.innerHTML = allEmails.map(item => `
      <span class="email-tag-chip ${item.isStandard ? 'standard' : ''}">
        <span>${item.email}</span>
      </span>
    `).join('');

    if (emailsCountBadge) {
      emailsCountBadge.textContent = `${allEmails.length} ${allEmails.length === 1 ? 'e-mail valgt' : 'e-mails valgte'}`;
      emailsCountBadge.style.background = 'rgba(5, 150, 105, 0.12)';
      emailsCountBadge.style.color = '#059669';
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
      card.setAttribute('aria-checked', 'false');
      const box = card.querySelector('.email-checkbox-box');
      if (box) box.textContent = '';
    } else {
      selectedStandardEmails.add(prefix);
      card.classList.add('active');
      card.setAttribute('aria-checked', 'true');
      const box = card.querySelector('.email-checkbox-box');
      if (box) box.textContent = '✓';
    }

    renderEmailsSummary();
  };

  // Aktivt valg: Vælg udelukkende kontakt@
  window.selectOnlyKontakt = function() {
    selectedStandardEmails.clear();
    selectedStandardEmails.add('kontakt');
    ['kontakt', 'info', 'bogholderi', 'faktura'].forEach(p => {
      const card = document.getElementById(`email-opt-${p}`);
      if (!card) return;
      const box = card.querySelector('.email-checkbox-box');
      if (p === 'kontakt') {
        card.classList.add('active');
        card.setAttribute('aria-checked', 'true');
        if (box) box.textContent = '✓';
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-checked', 'false');
        if (box) box.textContent = '';
      }
    });
    renderEmailsSummary();
    showToast('Aktivt valg registreret: Kun kontakt@ oprettes.', 'success');
  };

  // Aktivt valg: Fravælg alle Simply.com e-mails (hvis ekstern e-mail benyttes)
  window.clearAllEmails = function() {
    selectedStandardEmails.clear();
    customEmails.length = 0;
    ['kontakt', 'info', 'bogholderi', 'faktura'].forEach(p => {
      const card = document.getElementById(`email-opt-${p}`);
      if (!card) return;
      card.classList.remove('active');
      card.setAttribute('aria-checked', 'false');
      const box = card.querySelector('.email-checkbox-box');
      if (box) box.textContent = '';
    });
    renderCustomEmailsList();
    renderEmailsSummary();
    showToast('Alle Simply.com e-mails fravalgt (du bruger ekstern mail som f.eks. Google Workspace eller Microsoft 365).', 'info');
  };

  // Keyboard navigation for email checkboxes
  document.querySelectorAll('.email-checkbox-card').forEach(card => {
    card.setAttribute('role', 'checkbox');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-checked', card.classList.contains('active') ? 'true' : 'false');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const prefix = card.getAttribute('data-email-prefix');
        if (prefix && typeof window.toggleEmailOption === 'function') {
          window.toggleEmailOption(prefix);
        }
      }
    });
  });

  if (neutralCard) {
    neutralCard.setAttribute('role', 'radio');
    neutralCard.setAttribute('tabindex', '0');
    neutralCard.setAttribute('aria-checked', neutralCard.classList.contains('active') ? 'true' : 'false');
    neutralCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (typeof window.selectNoTemplate === 'function') window.selectNoTemplate();
      }
    });
  }

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
    card.setAttribute('role', 'radio');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-checked', card.classList.contains('active') ? 'true' : 'false');

    const selectLogoCard = () => {
      logoCards.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-checked', 'true');
      const val = card.getAttribute('data-logo-type');

      if (val === 'have-logo') {
        if (uploadContainer) uploadContainer.style.display = 'block';
        if (newLogoContainer) newLogoContainer.style.display = 'none';
      } else {
        if (uploadContainer) uploadContainer.style.display = 'none';
        if (newLogoContainer) newLogoContainer.style.display = 'block';
      }
    };

    card.addEventListener('click', selectLogoCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectLogoCard();
      }
    });
  });

  // 5b. Undersider Håndtering & Tæller (Sektion 05)
  let customPagesList = [];

  window.updatePagesCount = function() {
    const grid = document.getElementById('pages-checkbox-grid');
    const badge = document.getElementById('pages-counter-badge');
    const hiddenPagesInput = document.getElementById('selected-pages-input');
    if (!grid || !badge) return;

    const checkedBoxes = Array.from(grid.querySelectorAll('input[type="checkbox"]:checked'));
    const standardPages = checkedBoxes.map(cb => cb.value);
    const allSelectedPages = [...standardPages, ...customPagesList];
    const totalCount = allSelectedPages.length;

    // Opdater styling på standard labels
    grid.querySelectorAll('.page-checkbox-label').forEach(label => {
      const cb = label.querySelector('input[type="checkbox"]');
      if (cb && cb.checked) {
        label.classList.add('selected-page');
      } else {
        label.classList.remove('selected-page');
      }
    });

    if (hiddenPagesInput) {
      hiddenPagesInput.value = allSelectedPages.join(', ');
    }

    if (totalCount === 5) {
      badge.className = 'badge badge-emerald';
      badge.style.background = '#059669';
      badge.style.color = '#ffffff';
      badge.textContent = '5 af 5 sider valgt (Maksimal kvote nået ✓)';
    } else if (totalCount < 5) {
      badge.className = 'badge';
      badge.style.background = '#2563eb';
      badge.style.color = '#ffffff';
      badge.textContent = `${totalCount} af 5 sider valgt (${5 - totalCount} tilbage)`;
    } else {
      badge.className = 'badge';
      badge.style.background = '#dc2626';
      badge.style.color = '#ffffff';
      badge.textContent = `⚠️ ${totalCount} af 5 sider valgt (Fravælg ${totalCount - 5})`;
    }
  };

  window.addCustomPage = function() {
    const input = document.getElementById('custom-page-input');
    const chipsContainer = document.getElementById('custom-pages-chips');
    if (!input || !chipsContainer) return;

    const pageTitle = input.value.trim();
    if (!pageTitle) {
      showToast('Indtast venligst et navn på undersiden', 'info');
      return;
    }

    const grid = document.getElementById('pages-checkbox-grid');
    const checkedCount = grid ? grid.querySelectorAll('input[type="checkbox"]:checked').length : 0;
    const currentTotal = checkedCount + customPagesList.length;

    if (currentTotal >= 5) {
      showToast('Du har allerede valgt 5 undersider. Fravælg en side først for at tilføje din egen.', 'info');
      return;
    }

    if (customPagesList.includes(pageTitle)) {
      showToast('Denne underside er allerede tilføjet', 'info');
      return;
    }

    customPagesList.push(pageTitle);
    input.value = '';
    renderCustomPageChips();
    window.updatePagesCount();
    showToast(`Undersiden "${pageTitle}" er tilføjet!`, 'success');
  };

  window.removeCustomPage = function(index) {
    if (index >= 0 && index < customPagesList.length) {
      const removed = customPagesList.splice(index, 1);
      renderCustomPageChips();
      window.updatePagesCount();
      showToast(`Undersiden "${removed[0]}" er fjernet`, 'info');
    }
  };

  function renderCustomPageChips() {
    const chipsContainer = document.getElementById('custom-pages-chips');
    if (!chipsContainer) return;

    chipsContainer.innerHTML = customPagesList.map((p, idx) => `
      <span class="custom-page-chip">
        <span>📄 ${p}</span>
        <button type="button" class="remove-chip-btn" onclick="removeCustomPage(${idx})" aria-label="Fjern underside ${p}">×</button>
      </span>
    `).join('');
  }

  // 5c. Billedmateriale Vælger (Sektion 06 Del B)
  window.selectImageSource = function(type) {
    const stockCard = document.getElementById('img-source-stock');
    const customCard = document.getElementById('img-source-custom');
    const linkContainer = document.getElementById('custom-images-link-container');
    const stockRadio = document.querySelector('input[name="image_source_radio"][value="stock"]');
    const customRadio = document.querySelector('input[name="image_source_radio"][value="custom"]');

    if (type === 'custom') {
      if (stockCard) stockCard.classList.remove('active');
      if (customCard) customCard.classList.add('active');
      if (customRadio) customRadio.checked = true;
      if (linkContainer) linkContainer.style.display = 'block';
    } else {
      if (customCard) customCard.classList.remove('active');
      if (stockCard) stockCard.classList.add('active');
      if (stockRadio) stockRadio.checked = true;
      if (linkContainer) linkContainer.style.display = 'none';
    }
  };

  // 5d. CTA Radio Pill Interactive Selection (Sektion 07)
  const ctaPills = document.querySelectorAll('.cta-radio-pill');
  ctaPills.forEach(pill => {
    pill.addEventListener('click', () => {
      ctaPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const radio = pill.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Mock File Upload
  const fileInput = document.getElementById('logo-file-input');
  const dropzone = document.getElementById('logo-dropzone');
  const previewBox = document.getElementById('logo-preview-box');
  const previewText = document.getElementById('logo-preview-text');

  if (dropzone && fileInput) {
    dropzone.setAttribute('role', 'button');
    dropzone.setAttribute('tabindex', '0');
    dropzone.setAttribute('aria-label', 'Vælg logo fil til upload');
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (previewText) previewText.textContent = `Valgt logo: ${file.name} (${Math.round(file.size / 1024)} KB)`;
        if (previewBox) previewBox.style.display = 'flex';
        showToast(`Logo fil "${file.name}" indlæst!`, 'success');
      }
    });
  }

  // Form submission & Comprehensive Order Summary
  const form = document.getElementById('client-onboarding-form');
  const successCard = document.getElementById('form-success-card');
  const submitBtn = document.getElementById('submit-brief-btn');

  let submittedOrderData = null;

  if (form && successCard) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validering af undersider kvote
      const grid = document.getElementById('pages-checkbox-grid');
      const checkedCount = grid ? grid.querySelectorAll('input[type="checkbox"]:checked').length : 0;
      const totalPages = checkedCount + customPagesList.length;

      if (totalPages > 5) {
        showToast(`Du har valgt ${totalPages} undersider. Webland standardpakken inkluderer op til 5 undersider. Fravælg venligst ${totalPages - 5} side(r).`, 'info');
        const badge = document.getElementById('pages-counter-badge');
        if (badge) badge.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Validering af handelsbetingelser
      const termsCheck = document.getElementById('accept-terms-checkbox');
      if (termsCheck && !termsCheck.checked) {
        showToast('Venligst bekræft handelsbetingelserne for at fuldføre.', 'info');
        termsCheck.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sender skema & verificerer data...';
      }

      // Opsaml alle felter i struktureret format
      const clientName = document.getElementById('client-name')?.value || '';
      const companyName = document.getElementById('company-name')?.value || '';
      const cvr = document.getElementById('client-cvr')?.value || 'Privat / Ikke oplyst';
      const salesRep = document.getElementById('sales-rep')?.value || 'Webland salgsteam';
      const address = document.getElementById('client-address')?.value || '';
      const city = document.getElementById('client-city')?.value || '';
      const hours = document.getElementById('client-hours')?.value || 'Standard';
      const email = document.getElementById('client-email')?.value || '';
      const phone = document.getElementById('client-phone')?.value || '';
      const domain = document.getElementById('domain-name-input')?.value || '';
      const emails = document.getElementById('selected-emails-input')?.value || 'Ingen e-mails';
      const template = document.getElementById('selected-template-input')?.value || 'Aftales med sælger';
      const palette = document.getElementById('selected-color-palette-input')?.value || 'Nordisk Skifer & Isblå';
      const pages = document.getElementById('selected-pages-input')?.value || 'Forside, Om os, Ydelser, Galleri, Kontakt';
      const logoType = document.querySelector('.logo-radio-card.active')?.dataset.logoType === 'need-logo' 
        ? `Nyt logo ønskes (${document.getElementById('new-logo-wishes')?.value || 'Specifikation aftales'})`
        : (fileInput?.files?.[0]?.name ? `Eget logo uploadet: ${fileInput.files[0].name}` : 'Eget logo haves (eftersendes)');
      const imageType = document.querySelector('input[name="image_source_radio"]:checked')?.value === 'custom'
        ? `Egne billeder (Link: ${document.getElementById('images-cloud-link')?.value || 'Eftersendes'})`
        : 'Webland finder professionelle stockfotos';
      const primaryGoal = document.querySelector('input[name="primary_goal"]:checked')?.value || 'Ring mig op direkte';
      const notes = document.getElementById('additional-notes')?.value || 'Ingen særlige noter';

      submittedOrderData = {
        clientName, companyName, cvr, salesRep, address, city, hours,
        email, phone, domain, emails, template, palette, pages,
        logoType, imageType, primaryGoal, notes,
        timestamp: new Date().toLocaleString('da-DK')
      };

      try {
        localStorage.setItem('webland_last_order', JSON.stringify(submittedOrderData));
      } catch (err) {
        console.warn('Could not save to localStorage', err);
      }

      // Renders struktureret ordreresumé i successCard
      const summaryContent = document.getElementById('order-summary-content');
      if (summaryContent) {
        summaryContent.innerHTML = `
          <div class="order-summary-item">
            <span class="order-summary-label">Aftalt Domæne:</span>
            <span class="order-summary-value" style="color: #2563eb; font-weight: 700;">${domain || 'Aftales med sælger'}</span>
          </div>
          <div class="order-summary-item">
            <span class="order-summary-label">Din Salgsrådgiver:</span>
            <span class="order-summary-value">${salesRep}</span>
          </div>
          <div class="order-summary-item">
            <span class="order-summary-label">Kunde & Firma:</span>
            <span class="order-summary-value">${clientName} ${companyName ? '• ' + companyName : ''} ${cvr !== 'Privat / Ikke oplyst' ? '(CVR: ' + cvr + ')' : ''}</span>
          </div>
          ${address || city ? `
          <div class="order-summary-item">
            <span class="order-summary-label">Fysisk Adresse:</span>
            <span class="order-summary-value">${address ? address + ', ' : ''}${city}</span>
          </div>` : ''}
          <div class="order-summary-item">
            <span class="order-summary-label">Kontakt:</span>
            <span class="order-summary-value">${phone} • ${email}</span>
          </div>
          <div class="order-summary-item">
            <span class="order-summary-label">De 5 Undersider:</span>
            <span class="order-summary-value" style="color: #059669;">${pages}</span>
          </div>
          <div class="order-summary-item">
            <span class="order-summary-label">Simply.com E-mails:</span>
            <span class="order-summary-value">${emails}</span>
          </div>
          <div class="order-summary-item">
            <span class="order-summary-label">Visuel Inspiration:</span>
            <span class="order-summary-value">${template}</span>
          </div>
          <div class="order-summary-item">
            <span class="order-summary-label">Farvepalet:</span>
            <span class="order-summary-value">${palette}</span>
          </div>
          <div class="order-summary-item">
            <span class="order-summary-label">Logo & Billeder:</span>
            <span class="order-summary-value">${logoType} • ${imageType}</span>
          </div>
          <div class="order-summary-item">
            <span class="order-summary-label">Primært Mål:</span>
            <span class="order-summary-value">${primaryGoal}</span>
          </div>
        `;
      }

      const salesSpan = document.getElementById('summary-sales-rep-name');
      if (salesSpan) salesSpan.textContent = salesRep;

      // Klargør e-mail link til kunden
      const emailLink = document.getElementById('email-summary-link');
      if (emailLink) {
        const mailBody = `Hej ${clientName},\n\nHer er en kopi af dit udfyldte onboarding-skema til Webland.dk:\n\nAftalt Domæne: ${domain}\nSalgsrådgiver: ${salesRep}\nFirma: ${companyName} (CVR: ${cvr})\nAdresse: ${address}, ${city}\nTelefon: ${phone}\nDe 5 Undersider: ${pages}\nSimply.com E-mails: ${emails}\nDesign & Farver: ${template} / ${palette}\nLogo: ${logoType}\nBilleder: ${imageType}\nPrimært Mål: ${primaryGoal}\n\nFast pris: 9.995 kr. excl. moms (0 kr./md., 100% uden binding).\nLeveringstid: Maks. 72 timer.\n\nMed venlig hilsen,\nWebland.dk`;
        emailLink.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Webland.dk Ordrebekræftelse: ' + (domain || companyName))}&body=${encodeURIComponent(mailBody)}`;
      }

      setTimeout(() => {
        form.style.display = 'none';
        successCard.style.display = 'block';
        successCard.scrollIntoView({ behavior: 'smooth' });
        showToast('Onboarding-skema modtaget! Sælgeren kobler det med domænet nu.', 'success');
      }, 700);
    });
  }

  // Hjælpefunktion til at kopiere ordreresumé
  window.copyOrderSummary = function() {
    if (!submittedOrderData) {
      showToast('Ingen ordredata at kopiere endnu', 'info');
      return;
    }
    const d = submittedOrderData;
    const text = `--- WEBLAND.DK ONBOARDING ORDRESAMMENFATNING ---\nAftalt Domæne: ${d.domain}\nSalgsrådgiver: ${d.salesRep}\nKunde: ${d.clientName} (${d.companyName} - CVR: ${d.cvr})\nAdresse: ${d.address}, ${d.city}\nKontakt: ${d.phone} | ${d.email}\nDe 5 Undersider: ${d.pages}\nSimply.com E-mails: ${d.emails}\nDesign Inspiration: ${d.template}\nFarvepalet: ${d.palette}\nLogo: ${d.logoType}\nBilleder: ${d.imageType}\nPrimært Mål: ${d.primaryGoal}\nNoter: ${d.notes}\nFast pris: 9.995 kr. excl. moms (0 kr./md., ingen binding)\nUdfyldt: ${d.timestamp}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Ordresammenfatning kopieret til udklipsholderen!', 'success');
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  };

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Ordresammenfatning kopieret til udklipsholderen!', 'success');
  }

  // Initialiser Farvekombinationer & Paletter (Sektion 04)
  initColorPalettePicker();
}

// 5c. Farvekombinationer & Paletter System (Sektion 04)
function initColorPalettePicker() {
  const curatedGrid = document.getElementById('curated-palettes-grid');
  const paletteHiddenInput = document.getElementById('selected-color-palette-input');
  const statusTitle = document.getElementById('palette-status-title');
  const statusSwatches = document.getElementById('palette-status-swatches');
  const modeCards = {
    logo: document.getElementById('color-mode-logo'),
    template: document.getElementById('color-mode-template'),
    custom: document.getElementById('color-mode-custom')
  };
  const customBox = document.getElementById('custom-color-picker-box');
  const customPrimaryPicker = document.getElementById('custom-primary-picker');
  const customPrimaryHex = document.getElementById('custom-primary-hex');
  const customAccentPicker = document.getElementById('custom-accent-picker');
  const customAccentHex = document.getElementById('custom-accent-hex');
  const customNotes = document.getElementById('custom-color-notes');
  const templateColorHint = document.getElementById('template-color-hint');
  const templateHiddenInput = document.getElementById('selected-template-input');

  if (!curatedGrid || typeof PALETTES_DATA === 'undefined') return;

  let activeMode = 'curated'; // 'curated' | 'logo' | 'template' | 'custom'
  let activePaletteId = 'nordisk-skifer';

  function renderCuratedCards() {
    curatedGrid.innerHTML = PALETTES_DATA.map(p => {
      const isSelected = activeMode === 'curated' && p.id === activePaletteId;
      return `
        <div class="palette-card ${isSelected ? 'active' : ''}" data-palette-id="${p.id}" onclick="selectCuratedPalette('${p.id}')">
          <div class="palette-swatches-strip">
            <div class="palette-swatch-bar swatch-primary" style="background: ${p.primary};" title="Primær brandfarve: ${p.primary}"></div>
            <div class="palette-swatch-bar swatch-accent" style="background: ${p.accent};" title="Accent knapfarve: ${p.accent}"></div>
            <div class="palette-swatch-bar swatch-dark" style="background: ${p.dark};" title="Mørk kontrastbase: ${p.dark}"></div>
            <div class="palette-swatch-bar swatch-light" style="background: ${p.light};" title="Lys nuance: ${p.light}"></div>
          </div>
          <div class="palette-card-body">
            <div class="palette-header-row">
              <div class="palette-card-title">${p.name}</div>
              ${isSelected ? '<span class="palette-card-badge">✓ Valgt</span>' : ''}
            </div>
            <div class="palette-card-vibe">${p.vibe}</div>
            <div class="palette-card-desc">${p.previewText}</div>
            <div class="palette-hex-legend">
              <span class="palette-hex-tag"><span class="palette-hex-dot" style="background:${p.primary};"></span>${p.primary}</span>
              <span class="palette-hex-tag"><span class="palette-hex-dot" style="background:${p.accent};"></span>${p.accent}</span>
            </div>
            <button type="button" class="btn ${isSelected ? 'btn-emerald' : 'btn-outline'} palette-select-btn">
              ${isSelected ? '✓ Dette farvevalg er aktivt' : 'Vælg denne farvestemning'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function updateStatusDisplay(titleText, swatchesHtml) {
    if (statusTitle) statusTitle.textContent = titleText;
    if (statusSwatches) statusSwatches.innerHTML = swatchesHtml;
  }

  window.selectCuratedPalette = function(id) {
    activeMode = 'curated';
    activePaletteId = id;

    // Fjern aktiv markering fra special-modes
    Object.values(modeCards).forEach(card => {
      if (card) card.classList.remove('active');
    });
    if (customBox) customBox.style.display = 'none';

    const p = PALETTES_DATA.find(item => item.id === id);
    if (p) {
      if (paletteHiddenInput) {
        paletteHiddenInput.value = `${p.name} (Primær: ${p.primary}, Accent: ${p.accent})`;
      }
      updateStatusDisplay(
        p.name,
        `
          <span class="status-swatch" style="background: ${p.primary};" title="Primær: ${p.primary}"></span>
          <span class="status-swatch" style="background: ${p.accent};" title="Accent: ${p.accent}"></span>
          <span class="status-swatch" style="background: ${p.dark};" title="Mørk base: ${p.dark}"></span>
          <span class="status-swatch" style="background: ${p.light};" title="Lys baggrund: ${p.light}"></span>
        `
      );
      showToast(`Farvestemning valgt: "${p.name}"`, 'success');
    }
    renderCuratedCards();
  };

  window.selectColorSpecialMode = function(mode) {
    activeMode = mode;

    // Håndter radio states
    Object.entries(modeCards).forEach(([k, card]) => {
      if (card) {
        if (k === mode) card.classList.add('active');
        else card.classList.remove('active');
      }
    });

    renderCuratedCards();

    if (mode === 'logo') {
      if (customBox) customBox.style.display = 'none';
      if (paletteHiddenInput) {
        paletteHiddenInput.value = 'Brug farverne fra mit logo / min profil';
      }
      updateStatusDisplay(
        'Brug mit logos farver (Webland matcher automatisk)',
        `
          <span class="status-swatch" style="background: linear-gradient(135deg, #3b82f6, #ec4899);" title="Logo primær"></span>
          <span class="status-swatch" style="background: linear-gradient(135deg, #10b981, #f59e0b);" title="Logo accent"></span>
          <span class="status-swatch" style="background: #0f172a;" title="Kontrast base"></span>
          <span class="status-swatch" style="background: #ffffff;" title="Lys baggrund"></span>
        `
      );
      showToast('Farvestemning sat: Vi matcher automatisk farverne til dit logo!', 'info');
    } else if (mode === 'template') {
      if (customBox) customBox.style.display = 'none';
      const currentTemplateId = templateHiddenInput ? templateHiddenInput.value : '';
      const matched = (typeof TEMPLATES_DATA !== 'undefined' && currentTemplateId)
        ? TEMPLATES_DATA.find(t => t.id === currentTemplateId)
        : null;

      if (matched) {
        if (paletteHiddenInput) {
          paletteHiddenInput.value = `Originale farver fra eksemplet "${matched.title}" (Accent: ${matched.accentColor})`;
        }
        updateStatusDisplay(
          `Originale farver fra "${matched.title}"`,
          `
            <span class="status-swatch" style="background: ${matched.accentColor};" title="Accent: ${matched.accentColor}"></span>
            <span class="status-swatch" style="background: #0f172a;" title="Dark base"></span>
            <span class="status-swatch" style="background: #1e293b;" title="Card slate"></span>
            <span class="status-swatch" style="background: #ffffff;" title="Hvid kontrast"></span>
          `
        );
        showToast(`Farvestemning sat: Bevarer originale farver fra "${matched.title}"`, 'info');
      } else {
        if (paletteHiddenInput) {
          paletteHiddenInput.value = 'Brug eksemplets originale farver';
        }
        updateStatusDisplay(
          'Originale farver fra det valgte design (sektion 03)',
          `
            <span class="status-swatch" style="background: #3b82f6;" title="Original accent"></span>
            <span class="status-swatch" style="background: #0f172a;" title="Mørk base"></span>
            <span class="status-swatch" style="background: #ffffff;" title="Lys base"></span>
          `
        );
        showToast('Farvestemning sat: Bevarer det valgte eksempels originale farver.', 'info');
      }
    } else if (mode === 'custom') {
      if (customBox) customBox.style.display = 'block';
      updateCustomColors();
      showToast('Brugerdefinerede farver aktiveret – justér dine farver nedenfor.', 'info');
    }
  };

  function updateCustomColors() {
    const pColor = customPrimaryPicker ? customPrimaryPicker.value.toUpperCase() : '#1E3A8A';
    const aColor = customAccentPicker ? customAccentPicker.value.toUpperCase() : '#F59E0B';
    const notes = customNotes ? customNotes.value.trim() : '';

    if (customPrimaryHex) customPrimaryHex.value = pColor;
    if (customAccentHex) customAccentHex.value = aColor;

    if (paletteHiddenInput) {
      paletteHiddenInput.value = `Brugerdefineret (Primær: ${pColor}, Accent: ${aColor}${notes ? ', Noter: ' + notes : ''})`;
    }

    updateStatusDisplay(
      `Brugerdefineret: Primær ${pColor} • Accent ${aColor}`,
      `
        <span class="status-swatch" style="background: ${pColor};" title="Primær: ${pColor}"></span>
        <span class="status-swatch" style="background: ${aColor};" title="Accent: ${aColor}"></span>
        <span class="status-swatch" style="background: #0f172a;" title="Mørk base"></span>
        <span class="status-swatch" style="background: #ffffff;" title="Hvid kontrast"></span>
      `
    );
  }

  // Lyttere for custom color inputs
  if (customPrimaryPicker) {
    customPrimaryPicker.addEventListener('input', () => {
      if (activeMode === 'custom') updateCustomColors();
    });
  }
  if (customPrimaryHex) {
    customPrimaryHex.addEventListener('input', (e) => {
      let val = e.target.value.trim();
      if (!val.startsWith('#') && val.length > 0) val = '#' + val;
      if (/^#[0-9A-Fa-f]{6}$/.test(val) && customPrimaryPicker) {
        customPrimaryPicker.value = val;
        if (activeMode === 'custom') updateCustomColors();
      }
    });
  }

  if (customAccentPicker) {
    customAccentPicker.addEventListener('input', () => {
      if (activeMode === 'custom') updateCustomColors();
    });
  }
  if (customAccentHex) {
    customAccentHex.addEventListener('input', (e) => {
      let val = e.target.value.trim();
      if (!val.startsWith('#') && val.length > 0) val = '#' + val;
      if (/^#[0-9A-Fa-f]{6}$/.test(val) && customAccentPicker) {
        customAccentPicker.value = val;
        if (activeMode === 'custom') updateCustomColors();
      }
    });
  }

  if (customNotes) {
    customNotes.addEventListener('input', () => {
      if (activeMode === 'custom') updateCustomColors();
    });
  }

  // Hook til opdatering af template farve-hint når et template vælges i sektion 03
  window.updateColorPaletteForTemplate = function(templateObj) {
    if (!templateObj) {
      if (templateColorHint) {
        templateColorHint.textContent = 'Bevar den gennemførte farvesammensætning og kontrast fra det valgte design i sektion 03.';
      }
      return;
    }
    if (templateColorHint) {
      templateColorHint.textContent = `Bevarer originale farver fra "${templateObj.title}" (accentfarve: ${templateObj.accentColor}).`;
    }
    if (activeMode === 'template') {
      window.selectColorSpecialMode('template');
    }
  };

  // Initial render med "nordisk-skifer" forudvalgt
  renderCuratedCards();
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
  faqItems.forEach((item, idx) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (question) {
      if (!question.id) question.id = `faq-q-${idx + 1}`;
      if (answer && !answer.id) answer.id = `faq-ans-${idx + 1}`;
      question.setAttribute('role', 'button');
      question.setAttribute('tabindex', '0');
      question.setAttribute('aria-expanded', 'false');
      if (answer) {
        question.setAttribute('aria-controls', answer.id);
        answer.setAttribute('role', 'region');
        answer.setAttribute('aria-labelledby', question.id);
      }

      const toggle = () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => {
          i.classList.remove('active');
          const q = i.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      };

      question.addEventListener('click', toggle);
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
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
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-controls', 'nav-links');

    const toggleMenu = () => {
      const isVisible = navLinks.classList.contains('mobile-open');
      if (isVisible) {
        navLinks.classList.remove('mobile-open');
        navLinks.style.display = 'none';
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Åbn menu');
      } else {
        navLinks.classList.add('mobile-open');
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#ffffff';
        navLinks.style.padding = '24px';
        navLinks.style.borderBottom = '1px solid var(--color-border)';
        navLinks.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.08)';
        navLinks.style.zIndex = '150';
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'Luk menu');
      }
    };

    menuBtn.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
        toggleMenu();
        menuBtn.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('mobile-open') && !menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        toggleMenu();
      }
    });
  }
}
