// 고객 데이터(inbox, conversation)는 항상 mock
// AI 생성(glance context, handoff summary)만 USE_MOCK 플래그 확인

async function getInbox({ limit = 20 } = {}) {
  return mockCustomers.slice(0, limit);
}

async function getMissedCustomers() {
  return mockMissedCustomers;
}

async function getCustomer(customerId) {
  const base = mockCustomers.find(c => c.id === customerId)
            || mockMissedCustomers.find(c => c.id === customerId)
            || null;
  if (!base) return null;
  // mockCustomerMeta(customerType, pastHistory) 병합
  return { ...base, ...(mockCustomerMeta[customerId] || {}) };
}

async function getConversation(customerId) {
  return mockConversations[customerId]
      || mockMissedConversations[customerId]
      || [];
}

async function generateGlanceContext(customer) {
  if (CONFIG.USE_MOCK) {
    await new Promise(r => setTimeout(r, 500));
    return {
      emotion:  customer.emotion,
      summary:  customer.alfSummary,
      openings: customer.openingTexts || [customer.openingText],
    };
  }
  // USE_MOCK: false → 실제 Claude (proxy 서버 필요)
  const messages = await getConversation(customer.id);
  const res = await fetch(CONFIG.PROXY_URL + '/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer, messages }),
  });
  if (!res.ok) throw new Error('proxy error ' + res.status);
  return res.json();
}

async function generateHandoffSummary(customer) {
  if (CONFIG.USE_MOCK) {
    await new Promise(r => setTimeout(r, 400));
    return mockHandoffSummaries[customer.id] || null;
  }
  // USE_MOCK: false → 실제 Claude (proxy 서버 필요)
  const messages = await getConversation(customer.id);
  const res = await fetch(CONFIG.PROXY_URL + '/handoff', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer, messages }),
  });
  if (!res.ok) throw new Error('proxy error ' + res.status);
  return res.json();
}
