// setup/fetch-personas.js
// HuggingFace Datasets API로 Nemotron-Personas-Korea 샘플링
// 실행: node setup/fetch-personas.js
// 인증 불필요 (공개 데이터셋)

const fs = require('fs');
const path = require('path');

const BATCHES = [
  { offset: 0,    length: 100 },
  { offset: 300,  length: 100 },
  { offset: 1000, length: 100 },
  { offset: 5000, length: 100 },
  { offset: 15000, length: 100 },
];

const BASE_URL = 'https://datasets-server.huggingface.co/rows'
  + '?dataset=nvidia%2FNemotron-Personas-Korea'
  + '&config=default&split=train';

const TARGET_PROVINCES = new Set(['서울', '부산', '인천', '대구', '광주', '대전', '경기', '울산']);

// persona 텍스트에서 이름 추출: "황혜란 씨는..." → "황혜란"
function extractName(r) {
  const match = (r.persona || '').match(/^([가-힣]{2,4})\s씨/);
  return match ? match[1] : null;
}

async function fetchBatch(offset, length) {
  const url = `${BASE_URL}&offset=${offset}&length=${length}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} at offset ${offset}`);
  const json = await res.json();
  return (json.rows || []).map(row => ({ ...row.row, _name: extractName(row.row) }));
}

function isEcommerceCandidate(r) {
  return r.age >= 20 && r.age <= 58 && TARGET_PROVINCES.has(r.province);
}

async function main() {
  console.log('HuggingFace Datasets API에서 Nemotron-Personas-Korea 샘플링 중...\n');

  const allCandidates = [];
  for (const batch of BATCHES) {
    try {
      process.stdout.write(`  offset=${batch.offset} 배치 가져오는 중... `);
      const rows = await fetchBatch(batch.offset, batch.length);
      const filtered = rows.filter(isEcommerceCandidate);
      allCandidates.push(...filtered);
      console.log(`→ ${filtered.length}/${rows.length}명 통과 (누적 ${allCandidates.length}명)`);
    } catch (err) {
      console.error(`실패 (offset=${batch.offset}):`, err.message);
    }
  }

  console.log(`\n전체 이커머스 후보: ${allCandidates.length}명`);

  // 8가지 아케타입 (더 넓은 필터로 확실히 매칭)
  const archetypes = [
    { label: '30대 워킹맘 (배송 지연, 분노)',        filter: r => r.sex === '여자' && r.age >= 30 && r.age <= 39 },
    { label: '20대 남성 (교환 요청, 불만)',          filter: r => r.sex === '남자' && r.age >= 20 && r.age <= 29 },
    { label: '40대 (반품, 분노)',                   filter: r => r.age >= 40 && r.age <= 49 },
    { label: '50대 여성 (주문 취소, 불만)',           filter: r => r.sex === '여자' && r.age >= 48 && r.age <= 58 },
    { label: '20대 후반 남성 (배송지 변경, 냉정)',    filter: r => r.sex === '남자' && r.age >= 25 && r.age <= 30 },
    { label: '30대 중반 (제품 문의, 냉정)',           filter: r => r.age >= 34 && r.age <= 39 },
    { label: '40대 후반 남성 (품절 보상, 불만)',      filter: r => r.sex === '남자' && r.age >= 44 && r.age <= 52 },
    { label: '20대 후반 여성 재인입 (분노)',          filter: r => r.sex === '여자' && r.age >= 26 && r.age <= 33 },
  ];

  const selected = [];
  const usedUuids = new Set();

  for (const archetype of archetypes) {
    const match = allCandidates.find(r => archetype.filter(r) && !usedUuids.has(r.uuid));
    if (match) {
      selected.push({ archetype: archetype.label, ...match });
      usedUuids.add(match.uuid);
      console.log(`  ✓ [${archetype.label}]`);
      console.log(`    → ${match._name || '(이름 파싱 실패)'} (${match.age}세, ${match.sex}, ${match.occupation}, ${match.province})`);
    } else {
      console.log(`  ✗ [${archetype.label}] 매칭 실패 — 조건 재확인 필요`);
    }
  }

  const outPath = path.join(__dirname, 'candidates.json');
  fs.writeFileSync(outPath, JSON.stringify(selected, null, 2), 'utf8');
  console.log(`\n${selected.length}개 페르소나 저장 완료 → setup/candidates.json`);

  if (selected.length < 8) {
    console.log('\n⚠️  8개 미만 매칭. 배치 offset 범위를 늘리거나 필터를 완화하세요.');
  } else {
    console.log('다음 단계: node setup/generate-mock-data.js');
  }
}

main().catch(err => {
  console.error('오류:', err.message);
  process.exit(1);
});
