// mock-data.js — Nemotron-Personas-Korea 기반 생성
// 생성: setup/generate-mock-data.js (2026-05-21)
// 원본 데이터: nvidia/Nemotron-Personas-Korea (CC BY 4.0)

const mockCustomers = [
  {
    "id": "user_001",
    "name": "황혜란",
    "phoneNumber": "010-0000-0000",
    "email": "hran.hwang@gmail.com",
    "avatarUrl": "assets/avatars/user_001.png",
    "lastMessage": "왜 지금까지 아무 연락도 없는 거예요? 배송이 안 됐으면 알아서 처리해줘야 하는 거 아닌가요?",
    "waitingMinutes": 14,
    "reEntryCount": 2,
    "assigneeName": null,
    "emotion": "angry",
    "alfEscalationReason": "배송 추적 시스템상 '배송 완료' 상태가 4일째 지속 중. 고객에게 직접 확인 필요 및 물류사 처리 위임.",
    "alfSummary": "4일째 배송 상태 변동 없음, 아직 미수령 상태. 주문번호 GN-20260518-441 확인 완료. 재문의 2회, 어제 연락 후 답변 없어 불신 누적. 배송사 직접 확인 및 처리 일정 안내 필요.",
    "openingText": "안녕하세요 황혜란 님, 4일이나 기다리셨는데 연락도 없어서 정말 죄송합니다. 지금 바로 배송사에 직접 확인하겠습니다.",
    "openingTexts": [
      "황혜란 님, 4일이나 기다리셨는데 연락도 드리지 못해 정말 죄송합니다. 지금 바로 배송사에 직접 확인해서 처리 결과 안내드리겠습니다.",
      "GN-20260518-441 확인했습니다. 4일째 상태가 바뀌지 않아서 정말 죄송합니다. 지금 바로 배송사에 직접 확인하고 1시간 이내 처리 결과 안내드리겠습니다.",
      "황혜란 님, 아무 연락도 없었던 점 진심으로 죄송합니다. 담당자가 직접 배송사에 확인 후 빠른 시일 내로 안내드리겠습니다."
    ],
    "_persona": {
      "age": 33,
      "sex": "여자",
      "occupation": "회계 사무원",
      "province": "경기",
      "archetype": "30대 워킹맘(배송 지연, 분노)"
    }
  },
  {
    "id": "user_002",
    "name": "이태훈",
    "phoneNumber": "010-0000-0000",
    "email": "taehoon.lee@naver.com",
    "avatarUrl": "assets/avatars/user_002.png",
    "lastMessage": "265에서 270으로 교환 가능한가요? 솔직히 이렇게 오래 걸릴 줄 몰랐어요",
    "waitingMinutes": 5,
    "reEntryCount": 1,
    "assigneeName": "이지수",
    "emotion": "frustrated",
    "alfEscalationReason": "챗봇 응대 후 14분 경과 대기. 사이즈별 재고 현황 즉시 확인 불가.",
    "alfSummary": "5일 전 구매한 러닝화 265 → 270 사이즈 교환 요청. 챗봇이 14분 동안 대기했으나 교환 가능 여부 미확인 상태. 고객이 '솔직히 오래'라고 이미 불만 표출. 사이즈별 재고 확인 후 교환 처리 안내 필요.",
    "openingText": "안녕하세요 이태훈 님, 사이즈 교환이 지연되어 불편하셨겠습니다. 재고 현황을 바로 확인하겠습니다.",
    "openingTexts": [
      "이태훈 님, 사이즈 교환이 지연되어 불편하셨겠습니다. 재고 현황을 바로 확인해서 처리 가능 여부 안내해드릴게요.",
      "교환 가능 여부를 확인 중이었으나 재고 현황이 불확실해 시간이 걸렸습니다. 지금 바로 확인해서 빠르게 답변드리겠습니다.",
      "이태훈 님, 곧 확인해드리겠습니다. 재고 현황 확인 후 처리 가능 여부 바로 안내해드리겠습니다."
    ],
    "_persona": {
      "age": 27,
      "sex": "남자",
      "occupation": "대학생",
      "province": "인천",
      "archetype": "20대 남성 (사이즈 교환, 불만)"
    }
  },
  {
    "id": "user_003",
    "name": "김다희",
    "phoneNumber": "010-0000-0000",
    "email": "dahee.kim@kakao.com",
    "avatarUrl": "assets/avatars/user_003.png",
    "lastMessage": "이렇게 불량품 보내놓고 어떻게 그냥 넘어갈 수 있어요? 왕복 배송비 다 물어내야 하는 거 아닌가요?",
    "waitingMinutes": 10,
    "reEntryCount": 1,
    "assigneeName": null,
    "emotion": "angry",
    "alfEscalationReason": "명백한 불량품 주장 + 14일 이상 수령 후 반품 요청. 전액 환불 vs 제품 교체 여부 안내 필요.",
    "alfSummary": "공기청정기 불량 주장, 왕복 배송비 전액 요구. 구매 후 2개월 사용 이력 있음. 어디가 불량인지 먼저 확인 필요 (사진·영상). 명백한 불량이면 왕복 배송비 없이 무상 처리 가능.",
    "openingText": "안녕하세요 김다희 님, 불량품이 배송되었다면 정말 죄송합니다. 먼저 어떤 부분에서 불량이 발생했는지 확인해도 될까요?",
    "openingTexts": [
      "김다희 님, 불량이 발생했다면 정말 죄송합니다. 먼저 어떤 부분에서 불량이 생겼는지 확인해도 될까요? 확인 후 왕복 배송비 없이 바로 처리해드리겠습니다.",
      "많이 속상하셨겠습니다, 정말 죄송합니다. 어디가 불량인지 사진이나 영상으로 확인할 수 있을까요? 확인 즉시 배송비 없이 처리해드리겠습니다.",
      "김다희 님, 불량품이 배송된 점 진심으로 죄송합니다. 불량 부위를 먼저 확인한 뒤 왕복 배송비 없이 전액 처리해드리겠습니다."
    ],
    "_persona": {
      "age": 46,
      "sex": "여자",
      "occupation": "대학생",
      "province": "인천",
      "archetype": "40대 (반품, 분노)"
    }
  },
  {
    "id": "user_004",
    "name": "설숙자",
    "phoneNumber": "010-0000-0000",
    "email": "sukja.seol@naver.com",
    "avatarUrl": "assets/avatars/user_004.png",
    "lastMessage": "주문 취소하고 싶다고 했는데 아직도 접수가 안 됐다고 하네요? 어떻게 된 건가요?",
    "waitingMinutes": 6,
    "reEntryCount": 0,
    "assigneeName": null,
    "emotion": "anxious",
    "alfEscalationReason": "'배송 준비중' 상태에서 취소 버튼이 비활성화돼 챗봇이 처리 불가. 시스템상 직접 처리 필요.",
    "alfSummary": "오늘 오전 주문한 업소용 청소용품 즉시 취소 요청. 주문 상태가 '배송 준비중'으로 시스템상 취소 버튼이 비활성화된 상태. 실제 출고 여부는 미확인. 출고 전이라면 취소 가능하므로 직접 확인 후 안내 필요.",
    "openingText": "안녕하세요 설숙자 님, 취소가 아직 접수 안 됐다고 하셨는데 지금 바로 주문 현황 확인하고 처리해드리겠습니다.",
    "openingTexts": [
      "설숙자 님, 걱정하지 마세요. 지금 바로 주문 현황을 확인해서 취소 가능하다면 즉시 처리해드리겠습니다.",
      "취소 버튼이 비활성화됐더라도 실제 출고 전이라면 직접 처리가 가능합니다. 바로 확인해드리겠습니다.",
      "설숙자 님, 오늘 오전 주문하셨다면 취소 가능할 수 있습니다. 지금 바로 확인 후 안내해드리겠습니다."
    ],
    "_persona": {
      "age": 50,
      "sex": "여자",
      "occupation": "가정주부 및 비공식 돌봄·가사 종사자",
      "province": "경남",
      "archetype": "50대 여성 (주문 취소, 불안)"
    }
  },
  {
    "id": "user_005",
    "name": "박현식",
    "phoneNumber": "010-0000-0000",
    "email": "hyunsik.park@gmail.com",
    "avatarUrl": "assets/avatars/user_005.png",
    "lastMessage": "주문 취소 아니고 그냥 배송지 바꾸고 싶은 건데요",
    "waitingMinutes": 2,
    "reEntryCount": 0,
    "assigneeName": "서연",
    "emotion": "neutral",
    "alfEscalationReason": "배송 전 배송지 변경 요청. 챗봇에서 직접 설정 안내가 없었고 상담원 직접 처리 필요.",
    "alfSummary": "현재 주문한 무선 이어폰 배송지를 변경하려 했으나 챗봇이 안내 없이 이관. 현재 '배송 준비중' 상태로 배송지 변경 가능 여부 직접 확인 필요. 고객 성격상 빠르게 처리해주면 만족할 가능성이 높음.",
    "openingText": "안녕하세요 박현식 님, 배송지 변경이 필요하시군요. 지금 배송 상황을 확인해서 바로 변경해드리겠습니다.",
    "openingTexts": [
      "박현식 님, 배송지 변경이 필요하시군요. 지금 배송 진행 상황을 확인해서 바로 변경해드리겠습니다.",
      "GN-20260520-712 배송 상태 확인해드리겠습니다. 배송 전이라면 바로 변경 처리해드리겠습니다.",
      "안녕하세요 박현식 님. 배송 준비중이라면 배송지 변경이 가능합니다. 변경할 주소를 알려주시면 처리해드리겠습니다."
    ],
    "_persona": {
      "age": 26,
      "sex": "남자",
      "occupation": "대학생",
      "province": "서울",
      "archetype": "20대 직장 남성 (배송지 변경, 냉정)"
    }
  },
  {
    "id": "user_006",
    "name": "김수진",
    "phoneNumber": "010-0000-0000",
    "email": "sujin.kim@daum.net",
    "avatarUrl": "assets/avatars/user_006.png",
    "lastMessage": "KF94 방진 마스크가 인증된 거 맞는지 확인하고 싶어요. 제조사에서 공식 인증된 건지 물어봤습니다",
    "waitingMinutes": 1,
    "reEntryCount": 0,
    "assigneeName": null,
    "emotion": "neutral",
    "alfEscalationReason": "제품 성분 및 인증 현황 확인 요청으로 챗봇 기본 FAQ 범위 초과. 실제 제조사 상세 정보 확인 필요한 케이스.",
    "alfSummary": "업무상 대량구매한 마스크 KF94 인증 여부 확인 요청. 챗봇이 제품 상세 페이지 내용 이상의 안내가 어려워 이관. 정확한 제조사 인증서 확인 후 안내 필요. 이후 재구매 가능성이 있는 고객.",
    "openingText": "안녕하세요 김수진 님, 제조사 공식 인증 여부가 궁금하셨군요. 해당 제품의 인증서 상세 내용을 확인 후 바로 안내해드리겠습니다.",
    "openingTexts": [
      "안녕하세요 김수진 님, 제조사 공식 인증 여부가 궁금하셨군요. 해당 제품의 인증서 상세 내용을 확인 후 바로 안내해드리겠습니다.",
      "GN-MDK-3M-9001 제품의 KF94 인증 여부와 제조사 인증서 상세 내역을 확인해드리겠습니다.",
      "김수진 님, 제품 인증서 상세 정보가 필요하시다면 제조사 인증 내용을 바로 안내해드리겠습니다."
    ],
    "_persona": {
      "age": 38,
      "sex": "여자",
      "occupation": "가정의학과 의료기기·용품 구매 담당자",
      "province": "광주",
      "archetype": "30대 전문직 (제품 문의, 냉정)"
    }
  },
  {
    "id": "user_007",
    "name": "송순근",
    "phoneNumber": "010-0000-0000",
    "email": "soongeun.song@work.co.kr",
    "avatarUrl": "assets/avatars/user_007.png",
    "lastMessage": "결제까지 다 했는데 이제 와서 품절이라고 하네요. 보상이 되는 건가요?",
    "waitingMinutes": 7,
    "reEntryCount": 1,
    "assigneeName": null,
    "emotion": "frustrated",
    "alfEscalationReason": "결제 완료 후 뒤늦게 품절 통보로 재고 처리 이관. 보상 적용 기준 안내 및 대체 제품 안내가 필요한 케이스.",
    "alfSummary": "결제 완료 후 뒤늦게 품절 통보를 받은 보안 USB 구매 고객. '결제까지 다 했는데 이제 와서 품절이라면 보상이 있어야'라고 주장. 챗봇이 자동 처리 안내를 못한 상황. 보상 적용 기준 및 대체 제품 안내 필요. 재고 현황 및 처리 가능 여부 확인 필요.",
    "openingText": "안녕하세요 송순근 님, 결제 후 품절 안내로 많이 불편하셨겠습니다. 보상 가능한 방안을 바로 확인해드리겠습니다.",
    "openingTexts": [
      "송순근 님, 결제 후 품절 안내로 불편하셨겠습니다. 보상 가능한 방안을 바로 확인해드리겠습니다.",
      "결제까지 완료하셨는데 품절 통보를 받으셔서 정말 죄송합니다. 재고 현황 확인 후 대체 제품이나 보상 방안을 안내해드리겠습니다.",
      "송순근 님, 보안 USB 재고 현황 및 보상 적용 기준을 바로 확인해드리겠습니다. 잠시만 기다려 주세요."
    ],
    "_persona": {
      "age": 49,
      "sex": "남자",
      "occupation": "정보 보안 관리자",
      "province": "서울",
      "archetype": "40대 직장 남성 (품절 보상, 불만)"
    }
  },
  {
    "id": "user_008",
    "name": "박유하",
    "phoneNumber": "010-0000-0000",
    "email": "yuha.park@gmail.com",
    "avatarUrl": "assets/avatars/user_008.png",
    "lastMessage": "저번에도 이렇게 답변하고 아직도 해결이 안 됐잖아요. 이번엔 어떻게 해줄 건가요?",
    "waitingMinutes": 9,
    "reEntryCount": 3,
    "assigneeName": null,
    "emotion": "angry",
    "alfEscalationReason": "당일 동일 이슈로 3번째 재문의. 누적 미처리 건으로 강한 불만 상승. 즉각적인 담당자 배정 필요.",
    "alfSummary": "원피스 2종을 주문했으나 전혀 다른 제품 배송. 당일 오전부터 3번의 재문의로 동일 이슈 지속 중. 매번 '확인 중'이라는 미결 답변만 받아 불만 최고조. 오배송 제품 수거 후 정품 발송 또는 즉시 환불 방안 마련 위해 즉각 담당자 배정 필요.",
    "openingText": "안녕하세요 박유하 님, 여러 번 문의하셨는데 아직 해결을 못 드려서 정말 죄송합니다. 지금 바로 처리를 시작하겠습니다.",
    "openingTexts": [
      "박유하 님, 여러 번 문의하셨는데 아직 해결을 못 드려서 정말 죄송합니다. 지금 바로 담당자가 처리를 시작하겠습니다.",
      "GN-20260520-227 오배송 건을 확인했습니다. 지금 바로 잘못 배송된 제품 수거 후 정품 발송 처리를 해드리겠습니다.",
      "여러 번 기다려 주셨는데 정말 죄송합니다. 지금 이 자리에서 오배송 수거 및 정품 발송 방안을 처리해드리겠습니다."
    ],
    "_persona": {
      "age": 32,
      "sex": "여자",
      "occupation": "대학생",
      "province": "경기",
      "archetype": "20대 직장 여성 재문의(분노)"
    }
  }
];

const mockHandoffSummaries = {
  'user_001': {
    request: '원목 수납 캐비닛(GN-20260518-441) 4일째 배송 상태 변경 없음. 배송 완료 표시이나 실제 미수령. 배송 완료 불일치 확인 요청',
    status:  '주문번호 확인 완료. 배송사 시스템상 "배송 완료" 4일 유지 중. 실제 물품 미수령 확인.',
    next:    '배송사에 직접 확인 후 물류 정보 및 배송 일정 안내. 고객에게 최대한 빠른 처리 약속.'
  },
  'user_002': {
    request: '러닝화 265에서 270 사이즈 교환 요청 (챗봇 14분 경과, 재고 현황 확인 필요)',
    status:  '교환 가능 기간 내이나 재고 현황 미확인. 고객이 이미 불만 표출.',
    next:    '270 사이즈 재고 현황 상세 확인 후 교환 가능 여부 안내 및 처리 방안 결정.'
  },
  'user_003': {
    request: '공기청정기 명백한 불량 주장 후 왕복 배송비 없이 환불 반품 요청',
    status:  '3개월 사용 이력 있음. 전액 환불 vs 명백한 불량 여부 판단 미결.',
    next:    '불량 상태 검수 확인 후 명백한 불량으로 판정되면 왕복 배송비 없이 처리.'
  },
  'user_004': {
    request: '오늘 오전 주문한 업소용 청소용품 즉시 취소 요청. 시스템상 취소 버튼 비활성화',
    status:  '"배송 준비중" 상태로 취소 버튼 비활성. 실제 출고 여부 미확인.',
    next:    '실제 출고 여부 즉시 확인 후 취소 가능하면 고객에게 직접 처리.'
  },
  'user_005': {
    request: '무선 이어폰 배송 전 배송지 변경 요청',
    status:  '"배송 준비중" 상태. 챗봇이 자동 변경 처리 안내 불가.',
    next:    '실제 출고 여부 확인 후 출고 전이라면 직접 배송지 변경 처리.'
  },
  'user_006': {
    request: 'KF94 방진 마스크 제조사 인증서 내용 및 제품 공식 인증 현황 확인 요청',
    status:  '챗봇이 제품 상세 페이지 이상의 정보 제공 불가. 인증서 확인 후 안내 필요.',
    next:    '제품 인증서 내용 확인 후 제조사 인증 현황 상세 안내. 향후 재구매 가능성 있음.'
  },
  'user_007': {
    request: '결제 완료 후 뒤늦게 품절 통보. 보안 USB 보상 적용 기준 및 대체 제품 안내 요청',
    status:  '자동 취소 처리 안내 완료. 대체 제품 및 보상 적용 가능 여부 미확인.',
    next:    '보상 적용 기준 확인 후 재고 현황 또는 대체 제품 안내.'
  },
  'user_008': {
    request: '원피스 2종 주문 후 전혀 다른 제품 배송. 즉시 오배송 처리 및 정품 발송 요청',
    status:  '당일 3번 재문의. 매번 "확인 중" 미결 답변만 받아 즉각 담당자 배정 필요.',
    next:    '오배송 제품 수거 후 정품 발송 또는 즉시 환불 방안 마련.'
  }
};

// 부재중 고객 (부재중 탭 전용)
const mockMissedCustomers = [
  {
    id: "missed_001",
    name: "이정민",
    phoneNumber: "010-0000-0000",
    email: "jungmin.lee@naver.com",
    avatarUrl: "assets/avatars/missed_001.png",
    lastMessage: "배송이 잘못됐어요. 사이즈가 안 맞아요",
    waitingMinutes: 23,
    reEntryCount: 0,
    assigneeName: null,
    emotion: "neutral",
    _status: "missed",
    alfSummary: "잘못 배송된 사이즈 교환 요청. 주문번호 확인 후 안내 미완료 상태.",
    openingText: "안녕하세요 이정민 님, 사이즈 교환 관련 문의하셨는데 응대를 못 드렸습니다. 지금 바로 확인해드리겠습니다.",
    openingTexts: [
      "안녕하세요 이정민 님, 사이즈 교환 관련 문의하셨는데 응대를 못 드렸습니다. 지금 바로 확인해드리겠습니다.",
      "이정민 님, 어떤 제품 사이즈 교환이 필요하신지 확인해드리겠습니다. 주문번호를 알려주시면 바로 처리해드리겠습니다.",
      "안녕하세요, 사이즈 교환 문의 관련 안내해드리겠습니다. 지금 바로 처리해드리겠습니다."
    ],
    _persona: { age: 28, sex: "여자", occupation: "사무직원", province: "서울", archetype: "20대 사무직(교환, 냉정)" }
  },
  {
    id: "missed_002",
    name: "최선우",
    phoneNumber: "010-0000-0000",
    email: "sunwoo.choi@kakao.com",
    avatarUrl: "assets/avatars/missed_002.png",
    lastMessage: "반품 기간이 지났다는 게 납득이 안 됩니다",
    waitingMinutes: 41,
    reEntryCount: 1,
    assigneeName: null,
    emotion: "frustrated",
    _status: "missed",
    alfSummary: "구매 후 18일 경과 후 반품 불가 안내에 불만. 기간 확인 담당자에게 미결 상태로 마무리. 재문의 1회.",
    openingText: "안녕하세요 최선우 님, 반품 관련 문의 주셨는데 응대가 늦어서 죄송합니다. 지금 바로 확인해드리겠습니다.",
    openingTexts: [
      "안녕하세요 최선우 님, 반품 관련 문의 주셨는데 응대가 늦어서 죄송합니다. 지금 바로 확인해드리겠습니다.",
      "반품 기간이 지났더라도 가능한 방법이 있을 수 있습니다. 정확한 날짜를 알려주시면 확인해드리겠습니다.",
      "최선우 님, 오래 기다려 주셔서 감사합니다. 반품 가능 여부 바로 안내해드리겠습니다."
    ],
    _persona: { age: 35, sex: "남자", occupation: "강사", province: "인천", archetype: "30대 남성 (반품, 불만)" }
  },
  {
    id: "missed_003",
    name: "정혜원",
    phoneNumber: "010-0000-0000",
    email: "hyewon.jung@gmail.com",
    avatarUrl: "assets/avatars/missed_003.png",
    lastMessage: "결제가 두 번이나 된 것 같아요",
    waitingMinutes: 67,
    reEntryCount: 2,
    assigneeName: null,
    emotion: "anxious",
    _status: "missed",
    alfSummary: "동일 주문 이중 결제 의심. 주문번호 없이 결제 이중 청구 상황 신고. 재문의 2회로 긴급 처리 필요.",
    openingText: "안녕하세요 정혜원 님, 결제 이중 청구 관련 문의하셨는데 연결이 안 됐습니다. 바로 확인해드리겠습니다.",
    openingTexts: [
      "안녕하세요 정혜원 님, 결제 이중 청구 관련 문의하셨는데 연결이 안 됐습니다. 바로 확인해드리겠습니다.",
      "이중 결제는 즉시 확인해드리겠습니다. 주문번호와 결제 내역 확인해드리겠습니다.",
      "정혜원 님, 걱정하지 마세요. 결제 내역 확인해서 이중 결제라면 즉시 취소 처리해드리겠습니다."
    ],
    _persona: { age: 42, sex: "여자", occupation: "의사", province: "경남", archetype: "40대 여성 (결제, 불안)" }
  }
];

// 고객 상세 & 이전 상담 이력 (data-service.js에서 병합됨)
const mockCustomerMeta = {
  'user_001': {
    customerType:  'caution',
    inquiryType:   '배송 지연',
    purchasedItem: '원목 수납 캐비닛',
    angryGuide: {
      cause: '배송 완료 표시 4일째 · 사전 연락 없음',
      steps: [
        { num: '①', title: '감정 먼저 인정', desc: '"오래 기다리셨겠습니다"로 시작 — 변명 없이' },
        { num: '②', title: '원인 간략 설명', desc: '시스템 오류임을 인정, 배송사 책임 전가 금지' },
        { num: '③', title: '해결 일정 확약', desc: '배송사 직접 확인 후 1시간 이내 결과 안내 약속' },
      ],
      avoidSaying: ['"확인해드리겠습니다"만 반복', '"배송사 측 문제라서요"로 책임 회피', '처리 시간 미명시'],
    },
    pastHistory: [
      { historyId: 'CS-20260520-014', date: '05.20', type: '배송 문의',  summary: '당일 배송 연기 1회 문의. 담당자가 배송사 확인 안내 후 마무리.',      resolved: true,  emotion: 'frustrated' },
      { historyId: 'CS-20260415-003', date: '04.15', type: '반품 요청',  summary: '정상 제품으로 반품 처리 완료. 3일 이내 처리 완료.',                  resolved: true,  emotion: 'neutral'    },
    ]
  },
  'user_002': {
    customerType:  'normal',
    inquiryType:   '사이즈 교환',
    purchasedItem: '러닝화',
    pastHistory: [
      { historyId: 'CS-20260501-029', date: '05.01', type: '제품 문의',  summary: '사이즈 재고 문의. 챗봇 안내로 이후 해결.',                            resolved: true,  emotion: 'neutral'    },
    ]
  },
  'user_003': {
    customerType:  'caution',
    inquiryType:   '불량 반품',
    purchasedItem: '공기청정기',
    angryGuide: {
      cause: '불량품 배송 + 왕복 배송비 부담 요구',
      steps: [
        { num: '①', title: '잘못 인정', desc: '"불량이 맞다면 전적으로 저희 잘못입니다"' },
        { num: '②', title: '불량 여부 확인', desc: '사진·영상 요청 또는 즉시 수거 일정 안내' },
        { num: '③', title: '비용 없이 처리', desc: '왕복 배송비 없이 전액 환불 또는 교체 안내' },
      ],
      avoidSaying: ['"일반 반품으로는 어렵습니다" 먼저 언급', '"고객님이 먼저 확인해주세요" 요구', '비용 발생 가능성 먼저 언급'],
    },
    pastHistory: [
      { historyId: 'CS-20260410-007', date: '04.10', type: '배송 요청',  summary: '정상 배송 요청. 재고 처리로 완료.',                                   resolved: true,  emotion: 'frustrated' },
    ]
  },
  'user_004': { customerType: 'normal',  inquiryType: '주문 취소',   purchasedItem: '업소용 청소용품',  pastHistory: [] },
  'user_005': { customerType: 'normal',  inquiryType: '배송지 변경', purchasedItem: '무선 이어폰',      pastHistory: [] },
  'user_006': { customerType: 'normal',  inquiryType: '제품 문의',   purchasedItem: 'KF94 방진 마스크', pastHistory: [] },
  'user_007': {
    customerType:  'normal',
    inquiryType:   '품절 보상',
    purchasedItem: '보안 USB',
    pastHistory: [
      { historyId: 'CS-20260508-041', date: '05.08', type: '배송 지연',  summary: '배송 이관 안내 완료. 3일 이내 정상 도착.',                            resolved: true,  emotion: 'neutral'    },
    ]
  },
  'user_008': {
    customerType:  'caution',
    inquiryType:   '오배송',
    purchasedItem: '원피스 2종 세트',
    angryGuide: {
      cause: '오배송 + 당일 3회 재문의 · 매번 미결 답변',
      steps: [
        { num: '①', title: '누적 불편 인정', desc: '"여러 번 연락하셨는데 해결 못 드려 죄송합니다"' },
        { num: '②', title: '직접 처리 선언', desc: '"지금 제가 직접 담당해서 끝까지 처리합니다"' },
        { num: '③', title: '일정 구체적 확약', desc: '오배송 수거 + 정품 발송 날짜를 구체적으로 안내' },
      ],
      avoidSaying: ['"다시 확인해드리겠습니다"로 또 미루기', '"이전 담당자가…"로 책임 분산', '처리 일정 없이 막연한 약속'],
    },
    pastHistory: [
      { historyId: 'CS-20260521-001', date: '05.21', type: '재문의 1회', summary: '오전 9시 1회 문의. "확인 중"이라는 답변으로 마무리.',                 resolved: false, emotion: 'frustrated' },
      { historyId: 'CS-20260521-002', date: '05.21', type: '재문의 2회', summary: '오전 11시 2회 재문의. 담당자 배정 없이 마무리.',                      resolved: false, emotion: 'angry'      },
    ]
  },
};

const mockMissedConversations = {
  "missed_001": [
    { id: "m001_1", role: "bot",  content: "안녕하세요! 무엇을 도와드릴까요?",                                       createdAt: "2026-05-21T09:10:00Z" },
    { id: "m001_2", role: "user", content: "배송이 잘못됐어요. 사이즈가 안 맞아요",                                   createdAt: "2026-05-21T09:10:28Z" },
    { id: "m001_3", role: "bot",  content: "주문번호를 알려주시면 바로 확인해드리겠습니다.",                           createdAt: "2026-05-21T09:10:45Z" }
  ],
  "missed_002": [
    { id: "m002_1", role: "bot",  content: "안녕하세요! 무엇을 도와드릴까요?",                                       createdAt: "2026-05-21T08:53:00Z" },
    { id: "m002_2", role: "user", content: "반품 기간이 지났다는 게 납득이 안 됩니다",                                createdAt: "2026-05-21T08:53:25Z" },
    { id: "m002_3", role: "bot",  content: "구매하신 날짜가 언제인지 알려주시겠어요?",                                 createdAt: "2026-05-21T08:53:45Z" }
  ],
  "missed_003": [
    { id: "m003_1", role: "bot",  content: "안녕하세요! 무엇을 도와드릴까요?",                                       createdAt: "2026-05-21T08:18:00Z" },
    { id: "m003_2", role: "user", content: "결제가 두 번이나 된 것 같아요",                                          createdAt: "2026-05-21T08:18:22Z" },
    { id: "m003_3", role: "bot",  content: "걱정하지 마세요. 주문번호를 알려주시면 바로 확인해드리겠습니다.",           createdAt: "2026-05-21T08:18:50Z" }
  ]
};

const mockConversations = {
  "user_001": [
    {
      "id": "user_001_msg_001",
      "role": "bot",
      "content": "안녕하세요! 무엇을 도와드릴까요?",
      "createdAt": "2026-05-21T09:38:00Z"
    },
    {
      "id": "user_001_msg_002",
      "role": "user",
      "content": "주문한 게 아직도 안 왔는데 어떻게 된 건지 알 수가 없어요.",
      "createdAt": "2026-05-21T09:38:40Z"
    },
    {
      "id": "user_001_msg_003",
      "role": "bot",
      "content": "정말 불편하셨겠습니다. 주문번호를 알려주시겠어요?",
      "createdAt": "2026-05-21T09:39:00Z"
    },
    {
      "id": "user_001_msg_004",
      "role": "user",
      "content": "GN-20260518-441요. 주문한 게 아직도 안 오고 아무 연락도 없었어요.",
      "createdAt": "2026-05-21T09:39:30Z"
    },
    {
      "id": "user_001_msg_005",
      "role": "bot",
      "content": "확인했습니다. 현재 '배송 완료' 상태인데, 배송사 정보를 이중으로 확인해야 할 것 같습니다.",
      "createdAt": "2026-05-21T09:40:00Z"
    },
    {
      "id": "user_001_msg_006",
      "role": "user",
      "content": "왜 지금까지 아무 연락도 없는 거예요? 배송이 안 됐으면 알아서 처리해줘야 하는 거 아닌가요?",
      "createdAt": "2026-05-21T09:40:30Z"
    },
    {
      "id": "user_001_msg_007",
      "role": "bot",
      "content": "정말 죄송합니다. 바로 확인하기 위해 담당자를 연결해드리겠습니다.",
      "createdAt": "2026-05-21T09:41:00Z"
    }
  ],
  "user_002": [
    {
      "id": "user_002_msg_001",
      "role": "bot",
      "content": "안녕하세요! 무엇을 도와드릴까요?",
      "createdAt": "2026-05-21T10:05:00Z"
    },
    {
      "id": "user_002_msg_002",
      "role": "user",
      "content": "러닝화 사이즈 교환하고 싶어서요",
      "createdAt": "2026-05-21T10:05:30Z"
    },
    {
      "id": "user_002_msg_003",
      "role": "bot",
      "content": "어떤 사이즈가 필요하신가요? 교환은 구매 후 7일 이내 가능합니다.",
      "createdAt": "2026-05-21T10:06:00Z"
    },
    {
      "id": "user_002_msg_004",
      "role": "user",
      "content": "5일 전에 샀어요. 그래도 교환 가능하죠?",
      "createdAt": "2026-05-21T10:06:30Z"
    },
    {
      "id": "user_002_msg_005",
      "role": "bot",
      "content": "구매 후 7일 이내라 교환 가능 기간이긴 한데, 재고 현황이 불확실해서 담당자 안내가 필요합니다.",
      "createdAt": "2026-05-21T10:07:00Z"
    },
    {
      "id": "user_002_msg_006",
      "role": "user",
      "content": "265에서 270으로 교환 가능한가요? 솔직히 이렇게 오래 걸릴 줄 몰랐어요",
      "createdAt": "2026-05-21T10:07:30Z"
    },
    {
      "id": "user_002_msg_007",
      "role": "bot",
      "content": "담당자에게 연결해드리겠습니다.",
      "createdAt": "2026-05-21T10:08:00Z"
    }
  ],
  "user_003": [
    {
      "id": "user_003_msg_001",
      "role": "bot",
      "content": "안녕하세요! 무엇을 도와드릴까요?",
      "createdAt": "2026-05-21T09:48:00Z"
    },
    {
      "id": "user_003_msg_002",
      "role": "user",
      "content": "공기청정기 반품하려고 했는데 불량품인 것 같아요",
      "createdAt": "2026-05-21T09:48:30Z"
    },
    {
      "id": "user_003_msg_003",
      "role": "bot",
      "content": "불편하셨겠습니다. 구매하신 날짜가 언제이신가요?",
      "createdAt": "2026-05-21T09:49:00Z"
    },
    {
      "id": "user_003_msg_004",
      "role": "user",
      "content": "4월 30일이에요",
      "createdAt": "2026-05-21T09:49:20Z"
    },
    {
      "id": "user_003_msg_005",
      "role": "bot",
      "content": "구매 후 14일이 지나서 일반 반품은 어렵지만, 불량품이라면 별도 처리가 가능합니다.",
      "createdAt": "2026-05-21T09:49:50Z"
    },
    {
      "id": "user_003_msg_006",
      "role": "user",
      "content": "이렇게 불량품 보내놓고 어떻게 그냥 넘어갈 수 있어요? 왕복 배송비 다 물어내야 하는 거 아닌가요?",
      "createdAt": "2026-05-21T09:50:20Z"
    },
    {
      "id": "user_003_msg_007",
      "role": "bot",
      "content": "명백한 불량이라면 담당자가 처리해드릴 수 있습니다. 잠시 연결해드릴게요.",
      "createdAt": "2026-05-21T09:50:50Z"
    }
  ],
  "user_004": [
    {
      "id": "user_004_msg_001",
      "role": "bot",
      "content": "안녕하세요! 무엇을 도와드릴까요?",
      "createdAt": "2026-05-21T10:15:00Z"
    },
    {
      "id": "user_004_msg_002",
      "role": "user",
      "content": "오늘 오전에 주문한 게 있어서 취소하려고 하는데요",
      "createdAt": "2026-05-21T10:15:30Z"
    },
    {
      "id": "user_004_msg_003",
      "role": "bot",
      "content": "주문번호를 알려주시겠어요?",
      "createdAt": "2026-05-21T10:15:50Z"
    },
    {
      "id": "user_004_msg_004",
      "role": "user",
      "content": "GN-20260521-889요",
      "createdAt": "2026-05-21T10:16:10Z"
    },
    {
      "id": "user_004_msg_005",
      "role": "bot",
      "content": "현재 '배송 준비중' 상태라서 시스템에서는 자동 취소가 어렵습니다.",
      "createdAt": "2026-05-21T10:16:30Z"
    },
    {
      "id": "user_004_msg_006",
      "role": "user",
      "content": "주문 취소하고 싶다고 했는데 아직도 접수가 안 됐다고 하네요? 어떻게 된 건가요?",
      "createdAt": "2026-05-21T10:17:00Z"
    },
    {
      "id": "user_004_msg_007",
      "role": "bot",
      "content": "취소 처리를 위해 담당자에게 직접 확인을 요청드리겠습니다. 연결해드리겠습니다.",
      "createdAt": "2026-05-21T10:17:30Z"
    }
  ],
  "user_005": [
    {
      "id": "user_005_msg_001",
      "role": "bot",
      "content": "안녕하세요! 무엇을 도와드릴까요?",
      "createdAt": "2026-05-21T10:20:00Z"
    },
    {
      "id": "user_005_msg_002",
      "role": "user",
      "content": "배송지를 바꾸고 싶어서요",
      "createdAt": "2026-05-21T10:20:20Z"
    },
    {
      "id": "user_005_msg_003",
      "role": "bot",
      "content": "주문번호를 알려주시면 확인해드리겠습니다.",
      "createdAt": "2026-05-21T10:20:35Z"
    },
    {
      "id": "user_005_msg_004",
      "role": "user",
      "content": "GN-20260520-712요. 어제 주문한 거예요",
      "createdAt": "2026-05-21T10:20:55Z"
    },
    {
      "id": "user_005_msg_005",
      "role": "bot",
      "content": "현재 '배송 준비중' 상태라 배송지 변경은 담당자가 직접 처리해야 합니다.",
      "createdAt": "2026-05-21T10:21:15Z"
    },
    {
      "id": "user_005_msg_006",
      "role": "user",
      "content": "주문 취소 아니고 그냥 배송지 바꾸고 싶은 건데요",
      "createdAt": "2026-05-21T10:21:35Z"
    },
    {
      "id": "user_005_msg_007",
      "role": "bot",
      "content": "담당자에게 연결해드리겠습니다.",
      "createdAt": "2026-05-21T10:21:50Z"
    }
  ],
  "user_006": [
    {
      "id": "user_006_msg_001",
      "role": "bot",
      "content": "안녕하세요! 무엇을 도와드릴까요?",
      "createdAt": "2026-05-21T10:25:00Z"
    },
    {
      "id": "user_006_msg_002",
      "role": "user",
      "content": "마스크 구매했는데 제품 인증 여부 확인하고 싶어서 연락드렸어요",
      "createdAt": "2026-05-21T10:25:20Z"
    },
    {
      "id": "user_006_msg_003",
      "role": "bot",
      "content": "어떤 제품을 구매하셨나요?",
      "createdAt": "2026-05-21T10:25:35Z"
    },
    {
      "id": "user_006_msg_004",
      "role": "user",
      "content": "GN-MDK-3M-9001 이 제품입니다. 제조사에서 KF94 공식 인증된 건지 확인하고 싶어요",
      "createdAt": "2026-05-21T10:25:55Z"
    },
    {
      "id": "user_006_msg_005",
      "role": "bot",
      "content": "제품 설명에는 KF94 인증으로 표시되어 있습니다. 정확한 인증서 내용은 담당자 확인이 필요합니다.",
      "createdAt": "2026-05-21T10:26:15Z"
    },
    {
      "id": "user_006_msg_006",
      "role": "user",
      "content": "KF94 방진 마스크가 인증된 거 맞는지 확인하고 싶어요. 제조사에서 공식 인증된 건지 물어봤습니다",
      "createdAt": "2026-05-21T10:26:35Z"
    },
    {
      "id": "user_006_msg_007",
      "role": "bot",
      "content": "정확한 인증서 관련 내용을 담당자가 확인해드리겠습니다.",
      "createdAt": "2026-05-21T10:26:50Z"
    }
  ],
  "user_007": [
    {
      "id": "user_007_msg_001",
      "role": "bot",
      "content": "안녕하세요! 무엇을 도와드릴까요?",
      "createdAt": "2026-05-21T10:30:00Z"
    },
    {
      "id": "user_007_msg_002",
      "role": "user",
      "content": "보안 USB 주문했는데 재고가 없다고 하네요",
      "createdAt": "2026-05-21T10:30:30Z"
    },
    {
      "id": "user_007_msg_003",
      "role": "bot",
      "content": "주문번호를 알려주시겠어요?",
      "createdAt": "2026-05-21T10:30:45Z"
    },
    {
      "id": "user_007_msg_004",
      "role": "user",
      "content": "GN-20260521-003입니다",
      "createdAt": "2026-05-21T10:31:00Z"
    },
    {
      "id": "user_007_msg_005",
      "role": "bot",
      "content": "확인했습니다. 재고 처리로 자동 취소가 진행됩니다. 결제 취소는 보통 3-5일 소요됩니다.",
      "createdAt": "2026-05-21T10:31:20Z"
    },
    {
      "id": "user_007_msg_006",
      "role": "user",
      "content": "결제까지 다 했는데 이제 와서 품절이라고 하네요. 보상이 되는 건가요?",
      "createdAt": "2026-05-21T10:31:45Z"
    },
    {
      "id": "user_007_msg_007",
      "role": "bot",
      "content": "정말 불편하셨겠습니다. 대체 제품 보상 방안 관련해서 담당자에게 확인을 요청드리겠습니다.",
      "createdAt": "2026-05-21T10:32:00Z"
    }
  ],
  "user_008": [
    {
      "id": "user_008_msg_001",
      "role": "bot",
      "content": "안녕하세요! 무엇을 도와드릴까요?",
      "createdAt": "2026-05-21T10:33:00Z"
    },
    {
      "id": "user_008_msg_002",
      "role": "user",
      "content": "어제 주문한 건데 전혀 다른 제품이 왔어요. 어떻게 되는 건가요?",
      "createdAt": "2026-05-21T10:33:20Z"
    },
    {
      "id": "user_008_msg_003",
      "role": "bot",
      "content": "정말 불편하셨겠습니다. 이전 상담 내역을 확인하겠습니다. 주문번호를 알려주시겠어요?",
      "createdAt": "2026-05-21T10:33:40Z"
    },
    {
      "id": "user_008_msg_004",
      "role": "user",
      "content": "GN-20260520-227입니다. 원피스를 시켰는데 전혀 다른 게 왔어요",
      "createdAt": "2026-05-21T10:34:00Z"
    },
    {
      "id": "user_008_msg_005",
      "role": "bot",
      "content": "오배송으로 확인됩니다. 오배송 처리 진행을 위해 고객님 현재 상황을 확인하겠습니다.",
      "createdAt": "2026-05-21T10:34:20Z"
    },
    {
      "id": "user_008_msg_006",
      "role": "user",
      "content": "저번에도 이렇게 답변하고 아직도 해결이 안 됐잖아요. 이번엔 어떻게 해줄 건가요?",
      "createdAt": "2026-05-21T10:34:45Z"
    },
    {
      "id": "user_008_msg_007",
      "role": "bot",
      "content": "정말 죄송합니다. 지금 즉시 담당자가 직접 처리를 시작하겠습니다.",
      "createdAt": "2026-05-21T10:35:00Z"
    }
  ]
};
