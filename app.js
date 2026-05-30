// === Global State ===
let selectedCustomerId = null;
let currentCustomers   = [];
let snoozedCustomers   = [];
let closedCustomers    = [];
let missedCustomers    = [];
let currentTab         = 'open';
let currentSortKey     = 'priority';   // 'priority' | 'waiting' | 'reentry'
let currentSortDir     = 'desc';       // 'desc' (기본, 높은 값 먼저) | 'asc' (낮은 값 먼저)
const glanceCache      = new Map();
const handoffCache     = new Map();
const viewedCustomers  = new Set();

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('btn-send')?.addEventListener('click', handleSend);
  document.getElementById('chat-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });
  document.getElementById('btn-ai-draft')?.addEventListener('click', () => {
    showToast('AI 초안은 다음 버전에서 지원 예정입니다');
  });

  document.querySelectorAll('.inbox-tab').forEach(tab => {
    tab.addEventListener('click', () => switchInboxTab(tab.dataset.tab));
  });

  // 정렬 버튼 — 같은 버튼 재클릭 시 방향 토글, 다른 버튼 클릭 시 desc로 활성화
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.sort === currentSortKey) {
        currentSortDir = currentSortDir === 'desc' ? 'asc' : 'desc';
      } else {
        currentSortKey = btn.dataset.sort;
        currentSortDir = 'desc';
      }
      updateSortButtonUI();
      if (currentTab === 'open') renderInbox(currentCustomers, true);
    });
  });

  document.getElementById('btn-handoff-header')?.addEventListener('click', async () => {
    if (!selectedCustomerId) return;
    const customer = await getCustomer(selectedCustomerId);
    openHandoff(customer);
  });

  document.querySelectorAll('.quick-reply-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const input = document.getElementById('chat-input');
      if (input) {
        input.value = chip.dataset.text;
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  });

  document.getElementById('btn-snooze')?.addEventListener('click', () => {
    handleStatusAction('snoozed', '상담이 보류 처리됐습니다');
  });
  document.getElementById('btn-end-chat')?.addEventListener('click', () => {
    handleStatusAction('closed', '상담이 종료됐습니다');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeHandoffModal();
  });

  await loadInbox();
});

// === Inbox ===

async function loadInbox() {
  const container = document.getElementById('inbox-list');
  showSkeletonInbox(container);

  try {
    const [customers, missed] = await Promise.all([getInbox(), getMissedCustomers()]);
    if (!customers.length) { showEmpty(container); return; }

    currentCustomers = customers;
    missedCustomers  = missed;
    closedCustomers  = [...missed];

    const countEl = document.getElementById('inbox-count');
    if (countEl) countEl.textContent = customers.length;

    renderInbox(customers, true);
    handleCustomerClick(sortCustomers(customers, 'priority')[0].id);
  } catch (err) {
    showError(container);
  }
}

// 정렬 버튼 UI 업데이트 (활성화 + 방향 화살표)
function updateSortButtonUI() {
  document.querySelectorAll('.sort-btn').forEach(b => {
    const isActive = b.dataset.sort === currentSortKey;
    b.classList.toggle('active', isActive);
    b.textContent = isActive
      ? `${b.dataset.label} ${currentSortDir === 'desc' ? '↓' : '↑'}`
      : b.dataset.label;
  });
}

// 다차원 정렬 — sortKey + sortDir에 따라 기준/방향 전환
function sortCustomers(customers, sortKey, sortDir) {
  const dir = (sortDir ?? currentSortDir) === 'asc' ? -1 : 1;
  const score = { angry: 3, frustrated: 2, anxious: 2, neutral: 1 };
  const arr = [...customers];
  switch (sortKey) {
    case 'waiting':
      return arr.sort((a, b) => dir * (b.waitingMinutes - a.waitingMinutes));
    case 'reentry':
      return arr.sort((a, b) =>
        dir * (b.reEntryCount - a.reEntryCount) || score[b.emotion] - score[a.emotion]
      );
    default: // 'priority': 감정 강도 → 대기 시간 보조
      return arr.sort((a, b) => {
        const d = dir * (score[b.emotion] - score[a.emotion]);
        return d !== 0 ? d : dir * (b.waitingMinutes - a.waitingMinutes);
      });
  }
}

function sortByPriority(customers) {
  return sortCustomers(customers, 'priority', 'desc');
}

function renderInbox(customers, showPriority = false) {
  const sorted = showPriority
    ? sortCustomers(customers, currentSortKey)
    : [...customers].sort((a, b) => b.waitingMinutes - a.waitingMinutes);

  // "먼저 처리" 배지: 감정 강도 정렬일 때만 표시
  const showFirstBadge = showPriority && currentSortKey === 'priority';
  // 섹션 구분: 감정 강도 정렬일 때만
  const useSections    = showPriority && currentSortKey === 'priority';

  const container = document.getElementById('inbox-list');

  if (useSections) {
    const isDesc = currentSortDir === 'desc';
    const sectionDefs = isDesc
      ? [
          { emotions: ['angry'],               label: '즉시 처리 필요', colorKey: 'angry'      },
          { emotions: ['frustrated', 'anxious'], label: '주의',         colorKey: 'frustrated' },
          { emotions: ['neutral'],              label: '일반',           colorKey: 'neutral'    },
        ]
      : [
          { emotions: ['neutral'],              label: '일반',           colorKey: 'neutral'    },
          { emotions: ['frustrated', 'anxious'], label: '주의',         colorKey: 'frustrated' },
          { emotions: ['angry'],               label: '즉시 처리 필요', colorKey: 'angry'      },
        ];

    let html = '';
    let globalIdx = 0;

    sectionDefs.forEach(sec => {
      const items = sorted.filter(c => sec.emotions.includes(c.emotion));
      if (!items.length) return;

      html += `
        <div class="inbox-section-header inbox-section-${sec.colorKey}">
          <span class="inbox-section-label">${sec.label}</span>
          <span class="inbox-section-count">${items.length}</span>
        </div>`;

      items.forEach(c => {
        html += renderCustomerItem(c, showFirstBadge && globalIdx === 0);
        globalIdx++;
      });
    });

    container.innerHTML = html;
  } else {
    container.innerHTML = sorted.map((c, i) =>
      renderCustomerItem(c, showFirstBadge && i === 0)
    ).join('');
  }

  container.querySelectorAll('.customer-item').forEach(el => {
    el.addEventListener('click', () => handleCustomerClick(el.dataset.customerId));
  });
}

function renderCustomerItem(customer, isFirst) {
  const em        = getEmotionConfig(customer.emotion);
  const ctConfig  = getCustomerTypeConfig(customer.customerType);
  const isSelected = customer.id === selectedCustomerId;
  const isUnread  = !viewedCustomers.has(customer.id);

  const msgTime = new Date(Date.now() - customer.waitingMinutes * 60000);
  const timeStr = msgTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

  const waitLabel = customer._status === 'missed'
    ? `📵 ${customer.waitingMinutes}분 전`
    : `⏱ ${customer.waitingMinutes}분 대기`;

  const avatarHtml = customer.avatarUrl
    ? `<img class="customer-avatar avatar-${em.key}" src="${escapeHtml(customer.avatarUrl)}" alt="" loading="lazy">`
    : `<div class="customer-avatar avatar-${em.key}">${escapeHtml(customer.name[0])}</div>`;

  // 고객 유형 배지 (주의 고객만 표시)
  const ctBadgeHtml = ctConfig
    ? `<span class="customer-type-badge ct-${customer.customerType}">${ctConfig.badge}</span>`
    : '';

  return `
    <div class="customer-item${isSelected ? ' selected' : ''}${isUnread ? ' unread' : ''}" data-customer-id="${customer.id}" data-emotion="${customer.emotion}">
      <div class="customer-item-main">
        ${avatarHtml}
        <div class="customer-item-body">
          <div class="customer-item-top">
            <div class="customer-name-row">
              ${isUnread ? '<span class="unread-dot"></span>' : ''}
              <span class="customer-name">${escapeHtml(customer.name)}</span>
              ${ctBadgeHtml}
              ${customer.assigneeName ? `<span class="customer-assignee">· ${escapeHtml(customer.assigneeName)}</span>` : ''}
            </div>
            <span class="inbox-time">${timeStr}</span>
          </div>
          <div class="customer-item-preview">${escapeHtml(customer.lastMessage)}</div>
          <div class="customer-item-meta">
            <span class="wait-time">${waitLabel}</span>
            ${customer.reEntryCount > 0 ? `<span class="reentry-count">재문의 ${customer.reEntryCount}회</span>` : ''}
            <span class="emotion-badge emotion-${em.key}">${em.badge} ${em.label}</span>
            ${isFirst ? '<span class="priority-badge">먼저 처리</span>' : ''}
          </div>
        </div>
      </div>
    </div>`;
}

// === Customer Click ===

async function handleCustomerClick(customerId) {
  selectedCustomerId = customerId;

  viewedCustomers.add(customerId);
  document.querySelector(`.customer-item[data-customer-id="${customerId}"]`)
    ?.classList.remove('unread');

  document.querySelectorAll('.customer-item').forEach(el => {
    el.classList.toggle('selected', el.dataset.customerId === customerId);
  });

  const canHandoff = currentTab === 'open';
  const canSnooze  = currentTab === 'open';
  const canEnd     = currentTab === 'open' || currentTab === 'snoozed';
  document.getElementById('btn-handoff-header')?.toggleAttribute('disabled', !canHandoff);
  document.getElementById('btn-snooze')?.toggleAttribute('disabled', !canSnooze);
  document.getElementById('btn-end-chat')?.toggleAttribute('disabled', !canEnd);

  if (currentTab === 'open' && !handoffCache.has(customerId)) {
    getCustomer(customerId)
      .then(c => generateHandoffSummary(c))
      .then(data => { if (data) handoffCache.set(customerId, data); })
      .catch(() => {});
  }

  await Promise.all([
    loadConversation(customerId),
    loadGlancePanel(customerId),
  ]);
}

// === Chat ===

async function loadConversation(customerId) {
  const container = document.getElementById('chat-messages');
  const nameEl    = document.getElementById('chat-customer-name');
  showLoading(container);

  try {
    const [customer, messages] = await Promise.all([
      getCustomer(customerId),
      getConversation(customerId),
    ]);
    if (selectedCustomerId !== customerId) return;
    if (nameEl) {
      const em = getEmotionConfig(customer.emotion);
      nameEl.innerHTML = `
        <span class="panel-title">${escapeHtml(customer.name)}</span>
        <div class="chat-header-meta">
          <span class="emotion-badge emotion-${em.key}">${em.badge} ${em.label}</span>
          <span class="chat-wait-badge">⏱ ${customer.waitingMinutes}분 대기</span>
          ${customer.reEntryCount > 0 ? `<span class="reentry-count">재문의 ${customer.reEntryCount}회</span>` : ''}
        </div>`;
    }

    let opts;
    if (customer._status === 'missed') {
      opts = { showHandoffDivider: false, endMarker: '고객이 연결을 종료했습니다' };
    } else if (currentTab === 'closed') {
      opts = { showHandoffDivider: true,  endMarker: '상담이 종료됐습니다' };
    } else {
      opts = { showHandoffDivider: true,  endMarker: null };
    }

    renderConversation(messages, opts);
    updateChatFooter();
  } catch (err) {
    showError(container);
  }
}

function renderConversation(messages, { showHandoffDivider = true, endMarker = null } = {}) {
  const container = document.getElementById('chat-messages');

  const bubbles = messages.map((msg, i) => {
    const prevMsg  = i > 0 ? messages[i - 1] : null;
    const isGrouped = prevMsg && prevMsg.role === msg.role;
    return `
    <div class="message message-${msg.role}${isGrouped ? ' message-grouped' : ''}">
      ${!isGrouped ? `<div class="message-role">${getRoleLabel(msg.role)}</div>` : ''}
      <div class="message-content">${escapeHtml(msg.content)}</div>
      <div class="message-time">${formatTime(msg.createdAt)}</div>
    </div>`;
  }).join('');

  const divider = showHandoffDivider
    ? '<div class="handoff-divider"><span>지금부터 매니저</span></div>'
    : '';

  const endDiv = endMarker
    ? `<div class="handoff-divider handoff-divider-end"><span>${endMarker}</span></div>`
    : '';

  container.innerHTML = bubbles + divider + endDiv;
  container.scrollTop = container.scrollHeight;
  container.animate(
    [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 220, easing: 'ease', fill: 'backwards' }
  );
}

function handleSend() {
  const input = document.getElementById('chat-input');
  const text  = input?.value.trim();
  if (!text) return;

  const container = document.getElementById('chat-messages');
  if (!container) return;

  const bubble = document.createElement('div');
  bubble.className = 'message message-manager';
  bubble.innerHTML = `
    <div class="message-role">${getRoleLabel('manager')}</div>
    <div class="message-content">${escapeHtml(text)}</div>
    <div class="message-time">${formatTime(new Date().toISOString())}</div>`;

  container.appendChild(bubble);
  bubble.animate(
    [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 180, easing: 'ease', fill: 'backwards' }
  );

  container.scrollTop = container.scrollHeight;
  input.value = '';
  input.focus();
}

// === Glance Panel ===

async function loadGlancePanel(customerId) {
  const container = document.getElementById('glance-content');

  if (glanceCache.has(customerId)) {
    const customer = await getCustomer(customerId);
    if (selectedCustomerId !== customerId) return;
    renderGlancePanel(customer, glanceCache.get(customerId));
    return;
  }

  showSkeletonGlance(container);

  try {
    const customer = await getCustomer(customerId);
    if (selectedCustomerId !== customerId) return;

    const glanceData = await generateGlanceContext(customer);
    if (selectedCustomerId !== customerId) return;

    glanceCache.set(customerId, glanceData);
    renderGlancePanel(customer, glanceData);
  } catch (err) {
    if (selectedCustomerId === customerId) showError(container);
  }
}

function renderGlancePanel(customer, glanceData) {
  const container = document.getElementById('glance-content');
  const em        = getEmotionConfig(customer.emotion);
  const ctConfig  = getCustomerTypeConfig(customer.customerType);
  const openingId = `opening-${customer.id}`;

  const openings = Array.isArray(glanceData.openings) && glanceData.openings.length > 0
    ? glanceData.openings
    : glanceData.opening
      ? [glanceData.opening]
      : ['(오프닝 생성 실패)'];

  // 고객 유형 배지 (주의 고객만)
  const ctBannerHtml = ctConfig ? `
    <div class="customer-type-banner ct-banner-${customer.customerType}">
      ${ctConfig.badge} ${ctConfig.label}
    </div>` : '';

  // 고객 정보 키-값 블록 (주의 고객이면 섹션 강조 통합)
  const infoBlockHtml = `
    <div class="glance-section glance-customer-info${ctConfig ? ' glance-section-caution' : ''}">
      <div class="glance-section-title">
        <span>👤 고객 정보</span>
        ${ctConfig ? `<span class="ci-caution-badge">${ctConfig.badge} ${ctConfig.label}</span>` : ''}
      </div>
      <div class="ci-row">
        <span class="ci-label">문의 유형</span>
        <span class="ci-inquiry emotion-text-${em.key}">${escapeHtml(customer.inquiryType || '-')}</span>
      </div>
      <div class="ci-row">
        <span class="ci-label">구매 제품</span>
        <span class="ci-value">${escapeHtml(customer.purchasedItem || '-')}</span>
      </div>
      <div class="ci-row">
        <span class="ci-label">연락처</span>
        <span class="ci-value ci-phone">${escapeHtml(customer.phoneNumber || '-')}</span>
      </div>
    </div>`;

  // 이전 상담 이력 섹션
  const pastHistory = customer.pastHistory || [];
  const historyHtml = pastHistory.length > 0 ? `
    <div class="glance-section">
      <div class="glance-section-title">📂 이전 상담 이력</div>
      <div class="past-history-list">
        ${pastHistory.map(h => {
          const hem = getEmotionConfig(h.emotion);
          const statusClass = h.resolved ? 'ph-resolved' : 'ph-unresolved';
          const statusLabel = h.resolved ? '처리완료' : '미처리';
          return `
          <div class="past-history-item">
            <div class="past-history-meta">
              <span class="ph-date">${h.date}</span>
              <span class="ph-type">${h.type}</span>
              <span>${hem.badge}</span>
              <span class="ph-status ${statusClass}">${statusLabel}</span>
            </div>
            <div class="ph-id-row">
              <span class="ph-id">${escapeHtml(h.historyId)}</span>
              <button class="ph-copy-btn" data-id="${escapeHtml(h.historyId)}" title="상담 번호 복사">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="4.5" y="4.5" width="7" height="7" rx="1.2"/>
                  <path d="M1.5 8.5V2A1 1 0 0 1 2.5 1H9"/>
                </svg>
              </button>
            </div>
            <div class="ph-summary">${escapeHtml(h.summary)}</div>
          </div>`;
        }).join('')}
      </div>
      <button class="ph-more-btn">
        <span>상세 이력 더보기</span>
        <span class="ph-more-arrow">→</span>
      </button>
    </div>` : '';

  // 분노 고객 대응 가이드 (emotion === 'angry' + angryGuide 데이터 있을 때만)
  const angryGuideHtml = (customer.emotion === 'angry' && customer.angryGuide) ? (() => {
    const g = customer.angryGuide;
    const stepsHtml = g.steps.map(s => `
      <div class="ag-step">
        <span class="ag-step-num">${escapeHtml(s.num)}</span>
        <div class="ag-step-body">
          <div class="ag-step-title">${escapeHtml(s.title)}</div>
          <div class="ag-step-desc">${escapeHtml(s.desc)}</div>
        </div>
      </div>`).join('');
    const avoidHtml = g.avoidSaying.map(a =>
      `<div class="ag-avoid-item">❌ ${escapeHtml(a)}</div>`
    ).join('');
    return `
      <div class="glance-section glance-angry-guide">
        <div class="glance-section-title">🚨 분노 고객 대응 가이드</div>
        <div class="ag-cause">
          <span class="ag-cause-label">분노 원인</span>
          <span class="ag-cause-text">${escapeHtml(g.cause)}</span>
        </div>
        <div class="ag-steps-label">단계별 대응</div>
        <div class="ag-steps">${stepsHtml}</div>
        <div class="ag-avoid-label">피해야 할 말</div>
        <div class="ag-avoid">${avoidHtml}</div>
      </div>`;
  })() : '';

  container.innerHTML = `
    ${infoBlockHtml}
    ${angryGuideHtml}

    <div class="glance-section">
      <div class="glance-section-title">⚡ 상담 맥락</div>
      <div class="alf-summary-text">${escapeHtml(glanceData.summary)}</div>
    </div>

    <div class="glance-section">
      <div class="glance-section-title">✍️ 추천 첫 마디</div>
      <div class="opening-options" id="${openingId}">
        ${openings.map((text, i) => `
          <div class="opening-option" data-idx="${i}">
            <span class="opening-option-text">${escapeHtml(text)}</span>
          </div>`).join('')}
      </div>
    </div>

    ${historyHtml}
  `;

  container.animate(
    [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 240, easing: 'ease', fill: 'backwards' }
  );

  container.querySelectorAll('.opening-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const text = opt.querySelector('.opening-option-text')?.textContent || '';
      const input = document.getElementById('chat-input');
      if (input) { input.value = text; input.focus(); input.setSelectionRange(text.length, text.length); }
      try { if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {}); } catch {}
      showToast('추천 첫마디를 입력창에 추가했습니다');
    });
  });

  // 이전 상담 이력 — 상담번호 복사
  container.querySelectorAll('.ph-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const original = btn.innerHTML;
      try { await navigator.clipboard.writeText(id); } catch {}
      btn.innerHTML = '✅';
      setTimeout(() => { btn.innerHTML = original; }, 1500);
      showToast(`${id} 복사됨`);
    });
  });

  // 이전 상담 이력 — 더보기 (준비 중)
  container.querySelector('.ph-more-btn')?.addEventListener('click', () => {
    showToast('준비 중인 서비스입니다');
  });
}

async function handleCopyOpening(e) {
  const optionsEl = document.getElementById(e.currentTarget.dataset.target);
  const selected  = optionsEl?.querySelector('.opening-option.selected .opening-option-text');
  const text      = selected?.textContent || '';

  const input = document.getElementById('chat-input');
  if (input) {
    input.value = text;
    input.focus();
    input.setSelectionRange(text.length, text.length);
  }

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = Object.assign(document.createElement('textarea'), {
        value: text, style: 'position:fixed;opacity:0'
      });
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  } catch { /* clipboard 실패해도 입력창엔 이미 들어감 */ }

  e.currentTarget.textContent = '✅ 입력창에 추가됨';
  setTimeout(() => { e.currentTarget.textContent = '📋 복사'; }, 2000);
}

// === Handoff Modal ===

async function openHandoff(customer) {
  const btn = document.getElementById('btn-handoff-header');
  if (btn) { btn.textContent = '불러오는 중...'; btn.disabled = true; }

  try {
    const summary = handoffCache.has(customer.id)
      ? handoffCache.get(customer.id)
      : await generateHandoffSummary(customer);

    if (summary && !handoffCache.has(customer.id)) handoffCache.set(customer.id, summary);
    showHandoffModal(customer, summary);
  } catch (err) {
    alert('이관 요약을 불러올 수 없습니다.');
  } finally {
    if (btn) { btn.textContent = '이관'; btn.disabled = false; }
  }
}

function showHandoffModal(customer, summary) {
  document.getElementById('handoff-modal')?.remove();

  const em = getEmotionConfig(customer.emotion);

  const modal = document.createElement('div');
  modal.id = 'handoff-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div class="modal-title-row">
          <span class="modal-title">이관 요약</span>
          <span class="emotion-badge emotion-${em.key}">${em.badge} ${em.label}</span>
        </div>
        <div class="modal-customer">${escapeHtml(customer.name)} · 대기 ${customer.waitingMinutes}분</div>
      </div>

      <div class="modal-body">
        <div class="handoff-item">
          <div class="handoff-label">📌 고객 요청</div>
          <div class="handoff-text">${escapeHtml(summary?.request ?? '요약 정보를 불러올 수 없습니다.')}</div>
        </div>
        <div class="handoff-item">
          <div class="handoff-label">📋 진행 상황</div>
          <div class="handoff-text">${escapeHtml(summary?.status ?? '-')}</div>
        </div>
        <div class="handoff-item">
          <div class="handoff-label">✅ 다음 할 일</div>
          <div class="handoff-text">${escapeHtml(summary?.next ?? '-')}</div>
        </div>

        <div class="handoff-item">
          <div class="handoff-label">✏️ 담당자에게 전달</div>
          <textarea
            class="handoff-note"
            id="handoff-note"
            placeholder="다음 담당자가 알아야 할 내용을 적어주세요.&#10;예) 고객이 오전 배송 강하게 요청 / 목소리 톤 주의"
            rows="3"
          ></textarea>
        </div>

        <div class="handoff-assignee">
          <span class="assignee-label">담당자 배정</span>
          <select class="assignee-select" id="assignee-select">
            <option value="">담당자 선택</option>
            <option value="김지수">김지수</option>
            <option value="이민정">이민정</option>
            <option value="박서연">박서연</option>
          </select>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" id="btn-cancel-handoff">취소</button>
        <button class="btn btn-primary" id="btn-confirm-handoff" disabled>이관 완료</button>
      </div>
    </div>`;

  document.body.appendChild(modal);

  const confirmBtn = document.getElementById('btn-confirm-handoff');
  const selectEl   = document.getElementById('assignee-select');

  selectEl.addEventListener('change', () => {
    confirmBtn.disabled = !selectEl.value;
  });

  modal.addEventListener('click', e => { if (e.target === modal) closeHandoffModal(); });
  document.getElementById('btn-cancel-handoff').addEventListener('click', closeHandoffModal);
  confirmBtn.addEventListener('click', () => confirmHandoff(customer));
}

function closeHandoffModal() {
  const modal = document.getElementById('handoff-modal');
  if (!modal) return;
  modal.classList.add('modal-closing');
  modal.addEventListener('animationend', () => modal.remove(), { once: true });
}

function confirmHandoff(customer) {
  const assignee = document.getElementById('assignee-select')?.value || '';

  closeHandoffModal();
  handoffCache.delete(customer.id);

  currentCustomers = currentCustomers.filter(c => c.id !== customer.id);

  const countEl = document.getElementById('inbox-count');
  if (countEl) countEl.textContent = currentCustomers.length;

  if (currentCustomers.length) {
    renderInbox(currentCustomers, true);
    handleCustomerClick(sortByPriority(currentCustomers)[0].id);
  } else {
    showEmpty(document.getElementById('inbox-list'));
    showEmpty(document.getElementById('chat-messages'));
    showEmpty(document.getElementById('glance-content'));
    const nameEl = document.getElementById('chat-customer-name');
    if (nameEl) nameEl.innerHTML = '<span class="panel-title">모든 상담 처리 완료</span>';
  }

  const who = assignee ? ` → ${assignee}` : '';
  showToast(`${customer.name} 고객 이관 완료${who}`);
}

// === Tab & Status ===

function switchInboxTab(tabKey) {
  currentTab = tabKey;

  document.querySelectorAll('.inbox-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabKey);
  });

  const panelChat = document.querySelector('.panel-chat');
  if (panelChat) panelChat.classList.toggle('tab-closed', tabKey === 'closed');

  // 정렬 바: 진행중 탭에서만 활성화
  const sortBar = document.querySelector('.sort-bar');
  if (sortBar) sortBar.style.opacity = tabKey === 'open' ? '1' : '0.4';

  const container = document.getElementById('inbox-list');
  const config = {
    open:    { data: currentCustomers, priority: true,  empty: '진행 중인 상담이 없습니다.' },
    snoozed: { data: snoozedCustomers, priority: false, empty: '보류 중인 상담이 없습니다.' },
    closed:  { data: closedCustomers,  priority: false, empty: '종료된 상담이 없습니다.' },
  }[tabKey];

  if (!config) return;

  if (config.data.length) {
    renderInbox(config.data, config.priority);
  } else {
    container.innerHTML = `<div class="state-empty">${config.empty}</div>`;
  }

  selectedCustomerId = null;
  document.getElementById('btn-handoff-header')?.setAttribute('disabled', '');
  document.getElementById('btn-snooze')?.setAttribute('disabled', '');
  document.getElementById('btn-end-chat')?.setAttribute('disabled', '');
  const inputEl = document.getElementById('chat-input');
  if (inputEl) inputEl.value = '';
  const nameEl = document.getElementById('chat-customer-name');
  if (nameEl) nameEl.innerHTML = '<span class="panel-title">고객을 선택하세요</span>';
  document.getElementById('chat-messages').innerHTML = '<div class="state-empty">왼쪽 목록에서 상담을 선택하세요</div>';
  document.getElementById('glance-content').innerHTML = '<div class="state-empty">고객을 선택하면<br>컨텍스트가 표시됩니다</div>';
  updateChatFooter();
}

function handleStatusAction(newTabKey, toastMsg) {
  if (!selectedCustomerId) return;

  const sourceMap = { open: currentCustomers, snoozed: snoozedCustomers };
  const sourceList = sourceMap[currentTab];
  const customer = sourceList?.find(c => c.id === selectedCustomerId);
  if (!customer) return;

  if (currentTab === 'open') {
    currentCustomers = currentCustomers.filter(c => c.id !== customer.id);
    const countEl = document.getElementById('inbox-count');
    if (countEl) countEl.textContent = currentCustomers.length;
  } else if (currentTab === 'snoozed') {
    snoozedCustomers = snoozedCustomers.filter(c => c.id !== customer.id);
  }

  if (newTabKey === 'snoozed') snoozedCustomers.unshift(customer);
  if (newTabKey === 'closed')  closedCustomers.unshift(customer);

  switchInboxTab(newTabKey);
  showToast(`${customer.name} ${toastMsg}`);
}

function updateChatFooter() {
  const footer       = document.getElementById('chat-footer');
  const closedNotice = document.getElementById('chat-footer-closed');
  const textEl       = document.getElementById('chat-footer-closed-text');
  if (!footer || !closedNotice) return;

  const isReadOnly = currentTab === 'closed';
  footer.style.display       = isReadOnly ? 'none' : '';
  closedNotice.style.display = isReadOnly ? 'flex'  : 'none';

  if (textEl) textEl.textContent = '종료된 상담입니다';
}

// === Toast ===

function showToast(message) {
  document.getElementById('glance-toast')?.remove();

  const toast = document.createElement('div');
  toast.id = 'glance-toast';
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-visible'));
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 2400);
}

// === State Helpers ===

function showSkeletonInbox(container) {
  const item = () => `
    <div class="skeleton-inbox-item">
      <div class="skeleton-inbox-avatar"></div>
      <div class="skeleton-inbox-body">
        <div class="skeleton-inbox-top">
          <div class="skeleton-inbox-name"></div>
          <div class="skeleton-inbox-badge"></div>
        </div>
        <div class="skeleton-inbox-line"></div>
        <div class="skeleton-inbox-meta"></div>
      </div>
    </div>`;
  container.innerHTML = Array(6).fill(null).map(item).join('');
}

function showSkeletonGlance(container) {
  container.innerHTML = `
    <div class="glance-skeleton">
      <div class="skeleton-section">
        <div class="skeleton-title"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line" style="width:85%"></div>
        <div class="skeleton-line" style="width:92%"></div>
      </div>
      <div class="skeleton-section">
        <div class="skeleton-meta"></div>
        <div class="skeleton-meta"></div>
        <div class="skeleton-meta"></div>
      </div>
      <div class="skeleton-section">
        <div class="skeleton-title"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line" style="width:70%"></div>
        <div class="skeleton-btn"></div>
      </div>
    </div>`;
}

function showLoading(el) {
  el.innerHTML = '<div class="state-loading"><div class="spinner"></div><span>불러오는 중...</span></div>';
}

function showError(el) {
  el.innerHTML = '<div class="state-error">데이터를 불러올 수 없습니다.<br>새로고침 해주세요.</div>';
}

function showEmpty(el) {
  el.innerHTML = '<div class="state-empty">상담 내역이 없습니다.</div>';
}

// === Utils ===

function getEmotionConfig(emotion) {
  const map = {
    angry:      { key: 'angry',      badge: '😡', label: '분노' },
    frustrated: { key: 'frustrated', badge: '😤', label: '불만' },
    anxious:    { key: 'anxious',    badge: '😰', label: '불안' },
    neutral:    { key: 'neutral',    badge: '😐', label: '냉정' },
  };
  return map[emotion] || map.neutral;
}

// 고객 유형 설정 — normal은 null (배지 미표시)
function getCustomerTypeConfig(type) {
  const map = {
    caution: { badge: '⚠️', label: '주의 고객', desc: '재문의 이력 또는 강한 불만 표출 이력 있음' },
  };
  return map[type] || null;
}

function getRoleLabel(role) {
  return { bot: '🤖 챗봇', user: '👤 고객', manager: '🙋 매니저' }[role] || role;
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
