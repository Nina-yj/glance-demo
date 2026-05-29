# Glance

채널톡 CS 매니저를 위한 메시징 UX 보조 도구.
ALF→매니저 전환 순간의 경험을 개선하는 단일 페이지 웹앱.

## 파일 구조
- index.html        : 3-panel 레이아웃 (로딩/에러/빈 상태 포함)
- style.css         : Intercom 스타일 (라이트 배경, blue palette)
- config.js         : API 키 & 환경 설정 (하드코딩 금지)
- mock-data.js      : 가상 고객 3명 + ALF 대화 이력 (스키마 기준점)
- data-service.js   : 데이터 접근 레이어 (mock ↔ 실 API 교체 지점)
- app.js            : UI 인터랙션 + 오케스트레이션 흐름

## 기술 스택
- 빌드 도구 없음, 프레임워크 없음
- 순수 HTML/CSS/JS + fetch API
- Claude API: claude-sonnet-4-5 사용

## 실행 방법
index.html을 브라우저에서 직접 열기 (서버 불필요)

## 중요 규칙
- API 키는 반드시 config.js에서만 관리, app.js에 하드코딩 금지
- 외부 라이브러리 추가 금지 (CDN도 최소화)
- 모든 Claude API 호출은 try-catch로 감싸기
- app.js는 data-service.js 함수만 호출, mock-data.js 직접 참조 금지
- mock-data.js 스키마 변경 시 반드시 data-service.js도 함께 수정

## 브랜드 가이드
- 이름: Glance — "열기만 해도 이미 알아요"
- Core Target: 지수씨(1인 CS, 26F) / 민정씨(브랜드 오너 CS, 34F)
- 톤: 실용적이되 따뜻함. 과장 없는 약속. "도구"가 아닌 "동료"처럼
- 금기: "AI가 다 해줘요", "완전 자동화", "즉시 해결", "99% 정확도"

## 상세 설계
C:\Users\2rmaq\.claude\plans\3-shimmering-shore.md 참고
