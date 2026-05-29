// setup/generate-mock-data.js
// candidates.json → mock-data.js 변환
// 실행: node setup/generate-mock-data.js

const fs = require('fs');
const path = require('path');

const candidates = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'candidates.json'), 'utf8')
);

// 아케타입 인덱스 → 직업+연령 기반 구매 제품 & 상담 컨텍스트 매핑
const CONTEXTS = [
  // [0] 황혜란 33세 경리 사무원 인천 — 배송 지연, 분노
  {
    id: 'user_001',
    phoneNumber: '010-2847-5931',
    email: 'hran.hwang@gmail.com',
    waitingMinutes: 14,
    reEntryCount: 2,
    emotion: 'angry',
    purchasedItem: '원목 수납 캐비닛',
    inquiryType: '배송 지연',
    lastMessage: '도대체 언제 오는 건가요? 이미 어제도 연락했는데 답장도 없었잖아요.',
    alfEscalationReason: '배송 조회 시스템상 "배송 준비중" 상태가 4일째 변경 없음. 택배사 직접 확인 필요 — ALF 처리 범위 초과.',
    alfSummary: '4일째 배송 상태 변화 없는 원목 수납 캐비닛 문의. 어제에 이어 오늘 2번째 재인입. 주문번호(GN-20260518-441) 확인 완료했으나 택배사 측 지연 원인을 ALF가 확인 불가해 에스컬레이션.',
    openingText: '안녕하세요 황혜란님, 이틀이나 기다리게 해드려 정말 죄송합니다. 지금 바로 택배사에 직접 확인해드리겠습니다.',
    conversations: [
      { role: 'bot',  content: '안녕하세요! 무엇을 도와드릴까요?',                                  createdAt: '2026-05-21T09:38:00Z' },
      { role: 'user', content: '수납장 주문했는데 배송이 왜 이렇게 오래 걸려요?',                    createdAt: '2026-05-21T09:38:40Z' },
      { role: 'bot',  content: '불편을 드려 죄송합니다. 주문번호를 알려주시겠어요?',                  createdAt: '2026-05-21T09:39:00Z' },
      { role: 'user', content: 'GN-20260518-441요. 어제도 물어봤는데 답이 없었잖아요',              createdAt: '2026-05-21T09:39:30Z' },
      { role: 'bot',  content: '확인했습니다. 현재 "배송 준비중" 상태인데, 택배사 측 정보를 추가로 확인해야 할 것 같습니다.', createdAt: '2026-05-21T09:40:00Z' },
      { role: 'user', content: '도대체 언제 오는 건가요? 이미 어제도 연락했는데 답장도 없었잖아요.',   createdAt: '2026-05-21T09:40:30Z' },
      { role: 'bot',  content: '죄송합니다. 정확한 확인을 위해 담당자와 연결해드리겠습니다.',          createdAt: '2026-05-21T09:41:00Z' },
    ]
  },
  // [1] 이태훈 27세 무직 경기 — 사이즈 교환, 불만
  {
    id: 'user_002',
    phoneNumber: '010-3912-6048',
    email: 'taehoon.lee@naver.com',
    waitingMinutes: 5,
    reEntryCount: 1,
    emotion: 'frustrated',
    purchasedItem: '러닝화 (나이키 페가수스 스타일)',
    inquiryType: '사이즈 교환',
    lastMessage: '265인데 270으로 교환 가능한가요? 신어보니까 너무 작아서요',
    alfEscalationReason: '수령 후 14일 경과 케이스. 착용 흔적 여부 판단이 필요해 매니저 최종 확인 요청.',
    alfSummary: '5월 7일 구매한 러닝화 265 → 270 사이즈 교환 요청. 수령일 기준 14일이 경과해 정책상 교환 기간이 만료됐으나, 고객은 "미착용 상태"라고 주장. 착용 여부 확인 후 예외 처리 여부 매니저 판단 필요.',
    openingText: '안녕하세요 이태훈님, 신발 사이즈 때문에 불편하셨겠어요. 미착용 상태시면 방법을 같이 찾아볼게요.',
    conversations: [
      { role: 'bot',  content: '안녕하세요! 무엇을 도와드릴까요?',                              createdAt: '2026-05-21T10:05:00Z' },
      { role: 'user', content: '러닝화 사이즈 교환하고 싶은데요',                               createdAt: '2026-05-21T10:05:30Z' },
      { role: 'bot',  content: '구매하신 날짜가 언제이신가요? 교환은 수령일로부터 7일 이내 가능합니다.', createdAt: '2026-05-21T10:06:00Z' },
      { role: 'user', content: '5월 7일이요. 근데 한 번도 안 신었어요',                        createdAt: '2026-05-21T10:06:30Z' },
      { role: 'bot',  content: '수령 후 14일이 경과해서 교환 기간이 초과됐습니다. 단, 미착용 상태 확인 후 예외 처리가 가능한지 담당자 확인이 필요합니다.', createdAt: '2026-05-21T10:07:00Z' },
      { role: 'user', content: '265인데 270으로 교환 가능한가요? 신어보니까 너무 작아서요',     createdAt: '2026-05-21T10:07:30Z' },
      { role: 'bot',  content: '담당자와 연결해드리겠습니다.',                                  createdAt: '2026-05-21T10:08:00Z' },
    ]
  },
  // [2] 김다희 46세 무직 경기 — 반품, 분노
  {
    id: 'user_003',
    phoneNumber: '010-5523-7819',
    email: 'dahee.kim@kakao.com',
    waitingMinutes: 10,
    reEntryCount: 1,
    emotion: 'angry',
    purchasedItem: '공기청정기 (가정용)',
    inquiryType: '반품',
    lastMessage: '이거 처음부터 소음이 심했는데 왜 제가 왕복 배송비를 내야 해요?',
    alfEscalationReason: '초기 불량 주장 + 14일 이후 반품 요청. 단순 변심 vs 상품 하자 판단이 필요한 케이스.',
    alfSummary: '구매 3주차 공기청정기 소음 불량 반품 요청. 고객은 "처음부터 소음이 심했다"고 주장하나 2주간 사용 이력 있음. 단순 변심이면 왕복 배송비 고객 부담이지만, 초기 불량이면 전액 환불 대상. 사용 패턴 및 소음 원인 확인 필요.',
    openingText: '안녕하세요 김다희님, 처음부터 소음 문제가 있으셨다면 정말 불편하셨겠어요. 정확한 상황 확인 후 가장 좋은 방법으로 처리해드릴게요.',
    conversations: [
      { role: 'bot',  content: '안녕하세요! 무엇을 도와드릴까요?',                                       createdAt: '2026-05-21T09:48:00Z' },
      { role: 'user', content: '공기청정기 반품하고 싶어요. 소음이 너무 심해요',                          createdAt: '2026-05-21T09:48:30Z' },
      { role: 'bot',  content: '불편하셨겠어요. 구매일이 언제이신가요?',                                  createdAt: '2026-05-21T09:49:00Z' },
      { role: 'user', content: '4월 30일이요',                                                         createdAt: '2026-05-21T09:49:20Z' },
      { role: 'bot',  content: '수령 후 14일이 초과되어 단순 변심 반품은 어려운 상황입니다. 상품 불량이 있으시면 별도 확인이 가능합니다.', createdAt: '2026-05-21T09:49:50Z' },
      { role: 'user', content: '이거 처음부터 소음이 심했는데 왜 제가 왕복 배송비를 내야 해요?',          createdAt: '2026-05-21T09:50:20Z' },
      { role: 'bot',  content: '초기 불량 여부 확인을 위해 담당자 연결이 필요합니다. 잠시만 기다려주세요.', createdAt: '2026-05-21T09:50:50Z' },
    ]
  },
  // [3] 설숙자 50세 서비스 종사원 부산 — 주문 취소, 불만
  {
    id: 'user_004',
    phoneNumber: '010-6634-8920',
    email: 'sukja.seol@naver.com',
    waitingMinutes: 6,
    reEntryCount: 0,
    emotion: 'frustrated',
    purchasedItem: '업소용 청소용품 세트',
    inquiryType: '주문 취소',
    lastMessage: '아직 출고도 안 됐다고 했는데 왜 취소가 안 된다는 거예요',
    alfEscalationReason: '"배송 준비중" 상태에서 취소 버튼이 비활성화된 케이스. 시스템 권한 이슈로 매니저 직접 처리 필요.',
    alfSummary: '오늘 아침 주문한 업소용 청소용품 당일 취소 요청. 주문 상태는 "배송 준비중"으로 시스템상 취소 버튼이 잠겨있으나, 실제 출고 여부는 미확인. 취소 가능 여부 및 직접 처리 권한이 필요해 에스컬레이션.',
    openingText: '안녕하세요 설숙자님, 취소가 안 돼서 당황하셨겠어요. 지금 바로 출고 여부 확인하고 처리해드릴게요.',
    conversations: [
      { role: 'bot',  content: '안녕하세요! 무엇을 도와드릴까요?',                                     createdAt: '2026-05-21T10:15:00Z' },
      { role: 'user', content: '오늘 아침에 주문한 거 취소하고 싶어요',                                 createdAt: '2026-05-21T10:15:30Z' },
      { role: 'bot',  content: '주문번호를 알려주시겠어요?',                                           createdAt: '2026-05-21T10:15:50Z' },
      { role: 'user', content: 'GN-20260521-889요',                                                 createdAt: '2026-05-21T10:16:10Z' },
      { role: 'bot',  content: '현재 "배송 준비중" 상태로 확인됩니다. 이 단계에서는 시스템상 자동 취소가 어렵습니다.', createdAt: '2026-05-21T10:16:30Z' },
      { role: 'user', content: '아직 출고도 안 됐다고 했는데 왜 취소가 안 된다는 거예요',               createdAt: '2026-05-21T10:17:00Z' },
      { role: 'bot',  content: '출고 전 취소 처리를 위해 담당자 확인이 필요합니다. 연결해드리겠습니다.',  createdAt: '2026-05-21T10:17:30Z' },
    ]
  },
  // [4] 박현식 26세 무직 서울 — 배송지 변경, 냉정
  {
    id: 'user_005',
    phoneNumber: '010-7745-9031',
    email: 'hyunsik.park@gmail.com',
    waitingMinutes: 2,
    reEntryCount: 0,
    emotion: 'neutral',
    purchasedItem: '무선 이어폰',
    inquiryType: '배송지 변경',
    lastMessage: '아직 출고 전이면 주소 바꿀 수 있을까요?',
    alfEscalationReason: '출고 전 배송지 변경 요청. 시스템에서 직접 수정 권한 없음 — 매니저 수동 처리 필요.',
    alfSummary: '어제 주문한 무선 이어폰 배송지 변경 요청. 현재 "배송 준비중" 상태로 아직 출고 전 가능성 있음. 주소 직접 수정 시스템 권한이 없어 담당자 처리 필요. 고객 응대 양호, 간단히 처리 가능할 것으로 판단.',
    openingText: '안녕하세요 박현식님, 배송지 변경 요청이시군요. 현재 출고 전이면 바로 수정 가능합니다. 새 주소 알려주시겠어요?',
    conversations: [
      { role: 'bot',  content: '안녕하세요! 무엇을 도와드릴까요?',                                createdAt: '2026-05-21T10:20:00Z' },
      { role: 'user', content: '배송지를 바꾸고 싶은데요',                                       createdAt: '2026-05-21T10:20:20Z' },
      { role: 'bot',  content: '주문번호를 알려주시면 확인해드리겠습니다.',                        createdAt: '2026-05-21T10:20:35Z' },
      { role: 'user', content: 'GN-20260520-712요. 이어폰 주문했어요',                          createdAt: '2026-05-21T10:20:55Z' },
      { role: 'bot',  content: '현재 "배송 준비중" 상태입니다. 배송지 변경은 담당자가 직접 처리해야 합니다.', createdAt: '2026-05-21T10:21:15Z' },
      { role: 'user', content: '아직 출고 전이면 주소 바꿀 수 있을까요?',                        createdAt: '2026-05-21T10:21:35Z' },
      { role: 'bot',  content: '담당자와 연결해드리겠습니다.',                                   createdAt: '2026-05-21T10:21:50Z' },
    ]
  },
  // [5] 김수진 38세 생산기 조작원 울산 — 제품 사양 문의, 냉정
  {
    id: 'user_006',
    phoneNumber: '010-8856-0142',
    email: 'sujin.kim@daum.net',
    waitingMinutes: 1,
    reEntryCount: 0,
    emotion: 'neutral',
    purchasedItem: '산업용 방진 마스크 (10매입)',
    inquiryType: '제품 사양 문의',
    lastMessage: 'KF94 방진 등급이 맞는 건지 확인하고 싶어서요. 작업장 기준에 맞는지 알고 싶습니다',
    alfEscalationReason: '제품 상세 스펙 확인 요청 — ALF의 일반 FAQ 범위 초과. 실제 인증서 및 규격 정보 확인 가능한 담당자 연결 필요.',
    alfSummary: '작업장 안전 기준 충족 여부 확인 목적으로 방진 마스크 KF94 인증 관련 문의. ALF가 제품 페이지 안내까지는 제공했으나 산업안전보건법상 적합 여부 판단은 범위 초과로 전문 상담 필요. 차분한 문의 상황.',
    openingText: '안녕하세요 김수진님, 작업장 안전 기준에 맞는 마스크가 필요하신 거군요. 해당 제품의 인증 규격 확인 후 안내해드릴게요.',
    conversations: [
      { role: 'bot',  content: '안녕하세요! 무엇을 도와드릴까요?',                                          createdAt: '2026-05-21T10:25:00Z' },
      { role: 'user', content: '방진 마스크 구매하려는데 제품 스펙 확인하고 싶어요',                         createdAt: '2026-05-21T10:25:20Z' },
      { role: 'bot',  content: '어떤 제품을 문의하시는 건가요?',                                           createdAt: '2026-05-21T10:25:35Z' },
      { role: 'user', content: 'GN-MDK-3M-9001 이 제품이요. 작업장에서 쓸 건데 KF94 맞는지 확인하고 싶어요', createdAt: '2026-05-21T10:25:55Z' },
      { role: 'bot',  content: '제품 페이지에는 KF94 등급으로 표시되어 있습니다. 산업 현장 적합 여부 등 상세 스펙은 담당자 확인이 필요합니다.', createdAt: '2026-05-21T10:26:15Z' },
      { role: 'user', content: 'KF94 방진 등급이 맞는 건지 확인하고 싶어서요. 작업장 기준에 맞는지 알고 싶습니다', createdAt: '2026-05-21T10:26:35Z' },
      { role: 'bot',  content: '자세한 인증 관련 내용은 담당자와 확인해드리겠습니다.',                        createdAt: '2026-05-21T10:26:50Z' },
    ]
  },
  // [6] 송순근 49세 정보보안 전문가 서울 — 품절 보상, 불만
  {
    id: 'user_007',
    phoneNumber: '010-9967-1253',
    email: 'soongeun.song@work.co.kr',
    waitingMinutes: 7,
    reEntryCount: 1,
    emotion: 'frustrated',
    purchasedItem: '보안 USB 드라이브 (암호화 지원)',
    inquiryType: '품절 보상',
    lastMessage: '결제까지 됐는데 품절이라니요. 다른 보상은 없는 건가요?',
    alfEscalationReason: '결제 완료 후 재고 소진으로 강제 취소 케이스. 보상 정책 적용 범위 판단 및 대체 상품 안내 가능한 담당자 필요.',
    alfSummary: '결제 완료 후 재고 소진으로 자동 취소 처리된 보안 USB 건. 고객이 "결제까지 완료됐는데 품절이면 보상이 없냐"고 문의. ALF가 자동 환불 안내까지는 했으나 추가 보상 정책 판단은 범위 초과. 재고 상황 확인 및 보상 처리 권한 있는 담당자 필요.',
    openingText: '안녕하세요 송순근님, 결제 후 취소로 많이 당황하셨겠어요. 보상 방안을 확인해보고 바로 안내해드리겠습니다.',
    conversations: [
      { role: 'bot',  content: '안녕하세요! 무엇을 도와드릴까요?',                                      createdAt: '2026-05-21T10:30:00Z' },
      { role: 'user', content: '보안 USB 주문했는데 갑자기 취소됐어요',                                 createdAt: '2026-05-21T10:30:30Z' },
      { role: 'bot',  content: '주문번호를 알려주시겠어요?',                                          createdAt: '2026-05-21T10:30:45Z' },
      { role: 'user', content: 'GN-20260521-003이요',                                              createdAt: '2026-05-21T10:31:00Z' },
      { role: 'bot',  content: '확인했습니다. 재고 소진으로 자동 취소 처리된 건입니다. 결제 금액은 자동 환불 예정입니다.', createdAt: '2026-05-21T10:31:20Z' },
      { role: 'user', content: '결제까지 됐는데 품절이라니요. 다른 보상은 없는 건가요?',                createdAt: '2026-05-21T10:31:45Z' },
      { role: 'bot',  content: '불편을 드려 죄송합니다. 추가 보상 여부는 담당자 확인이 필요합니다.',      createdAt: '2026-05-21T10:32:00Z' },
    ]
  },
  // [7] 박유하 32세 무직 인천 — 재인입 3회, 분노
  {
    id: 'user_008',
    phoneNumber: '010-1078-2364',
    email: 'yuha.park@gmail.com',
    waitingMinutes: 9,
    reEntryCount: 3,
    emotion: 'angry',
    purchasedItem: '여름 원피스 (2종 세트)',
    inquiryType: '오배송',
    lastMessage: '오전부터 세 번이나 들어왔는데 아직도 해결이 안 됐어요. 이건 너무한 거 아닌가요',
    alfEscalationReason: '오배송 건으로 오전부터 3회 재인입. 동일 케이스 반복 에스컬레이션으로 당일 최우선 처리 필요.',
    alfSummary: '원피스 2종 세트를 주문했으나 전혀 다른 제품이 배송된 오배송 건. 오전 9시부터 동일 건으로 3번째 문의 중이며 매번 "확인 중" 응답만 받았다고 강하게 불만 표출. 교환 배송 일정 및 기존 제품 회수 절차 확정을 위해 즉시 담당자 개입 필요.',
    openingText: '안녕하세요 박유하님, 오늘 세 번이나 연락하셨는데 해결을 못 드려 정말 죄송합니다. 지금 바로 오배송 건 처리 시작하겠습니다.',
    conversations: [
      { role: 'bot',  content: '안녕하세요! 무엇을 도와드릴까요?',                                          createdAt: '2026-05-21T10:33:00Z' },
      { role: 'user', content: '아까 두 번이나 연락했는데 또 처음부터 해야 하는 거예요?',                    createdAt: '2026-05-21T10:33:20Z' },
      { role: 'bot',  content: '불편을 드려 죄송합니다. 이전 문의 내역을 확인하겠습니다. 주문번호를 알려주시겠어요?', createdAt: '2026-05-21T10:33:40Z' },
      { role: 'user', content: 'GN-20260520-227이요. 원피스 시켰는데 완전 다른 게 왔어요',                  createdAt: '2026-05-21T10:34:00Z' },
      { role: 'bot',  content: '오배송 건으로 확인됩니다. 교환 처리 진행을 위해 고객님의 현재 주소 확인이 필요합니다.', createdAt: '2026-05-21T10:34:20Z' },
      { role: 'user', content: '오전부터 세 번이나 들어왔는데 아직도 해결이 안 됐어요. 이건 너무한 거 아닌가요', createdAt: '2026-05-21T10:34:45Z' },
      { role: 'bot',  content: '정말 죄송합니다. 지금 즉시 담당자와 연결해드리겠습니다.',                    createdAt: '2026-05-21T10:35:00Z' },
    ]
  },
];

function buildMockData(candidates, contexts) {
  const customers = candidates.map((persona, i) => {
    const ctx = contexts[i];
    const name = persona._name || `고객${i + 1}`;
    return {
      id: ctx.id,
      name,
      phoneNumber: ctx.phoneNumber,
      email: ctx.email,
      avatarUrl: null,
      lastMessage: ctx.lastMessage,
      waitingMinutes: ctx.waitingMinutes,
      reEntryCount: ctx.reEntryCount,
      emotion: ctx.emotion,
      alfEscalationReason: ctx.alfEscalationReason,
      alfSummary: ctx.alfSummary,
      openingText: ctx.openingText,
      // Nemotron 원본 메타 (참고용 — 앱에서 직접 쓰진 않음)
      _persona: {
        age: persona.age,
        sex: persona.sex,
        occupation: persona.occupation,
        province: persona.province,
        archetype: persona.archetype,
      }
    };
  });

  const conversations = {};
  candidates.forEach((_, i) => {
    const ctx = contexts[i];
    conversations[ctx.id] = ctx.conversations.map((msg, j) => ({
      id: `${ctx.id}_msg_${String(j + 1).padStart(3, '0')}`,
      role: msg.role,
      content: msg.content,
      createdAt: msg.createdAt,
    }));
  });

  return { customers, conversations };
}

const { customers, conversations } = buildMockData(candidates, CONTEXTS);

const output = `// mock-data.js — Nemotron-Personas-Korea 기반 생성
// 생성: setup/generate-mock-data.js (${new Date().toISOString().slice(0, 10)})
// 원본 데이터: nvidia/Nemotron-Personas-Korea (CC BY 4.0)

const mockCustomers = ${JSON.stringify(customers, null, 2)};

const mockConversations = ${JSON.stringify(conversations, null, 2)};
`;

const outPath = path.join(__dirname, '..', 'mock-data.js');
fs.writeFileSync(outPath, output, 'utf8');

console.log(`mock-data.js 생성 완료 → mock-data.js`);
console.log(`\n고객 목록:`);
customers.forEach((c, i) => {
  const e = { angry: '😡 분노', frustrated: '😤 불만', neutral: '😐 냉정' }[c.emotion] || c.emotion;
  console.log(`  [user_00${i + 1}] ${c.name} (${c._persona.age}세, ${c._persona.occupation}) ${e} — 대기 ${c.waitingMinutes}분, 재인입 ${c.reEntryCount}회`);
});
