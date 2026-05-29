/**
 * Glance — Claude CLI Proxy
 * 실행: node proxy.js
 * API 키 불필요 — 현재 Claude Code 세션 사용
 */

const express    = require('express');
const cors       = require('cors');
const { spawnSync } = require('child_process');
const os         = require('os');
const path       = require('path');

// Windows: npm global 경로의 claude.cmd 사용
const CLAUDE_CMD = process.platform === 'win32'
  ? path.join(os.homedir(), 'AppData', 'Roaming', 'npm', 'claude.cmd')
  : 'claude';

const app = express();
app.use(cors());
app.use(express.json());

// ── Claude CLI 호출 ──────────────────────────────────────
function callClaude(prompt) {
  const result = spawnSync(CLAUDE_CMD, ['--print'], {
    input: prompt,
    encoding: 'utf8',
    timeout: 60000,
    maxBuffer: 1024 * 1024,
    shell: true,
  });

  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || 'Claude CLI 오류');
  return result.stdout.trim();
}

function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('JSON을 찾을 수 없습니다: ' + text.slice(0, 200));
  return JSON.parse(match[0]);
}

function formatConversation(messages) {
  return messages.map(m => {
    const role = { bot: '챗봇', user: '고객', manager: '매니저' }[m.role] || m.role;
    return `[${role}] ${m.content}`;
  }).join('\n');
}

// ── POST /generate → Glance 패널 (감정·요약·오프닝) ─────
app.post('/generate', async (req, res) => {
  try {
    const { customer, messages } = req.body;

    const prompt = `당신은 이커머스 CS 매니저 보조 AI입니다.
아래 상담 대화를 분석해서 매니저가 고객 응대를 바로 시작할 수 있도록 도와주세요.

## 고객 정보
- 이름: ${customer.name}
- 대기 시간: ${customer.waitingMinutes}분
- 재인입 횟수: ${customer.reEntryCount}회
- 에스컬레이션 사유: ${customer.alfEscalationReason || '없음'}

## 대화 내용
${formatConversation(messages)}

## 응답 형식
아래 JSON만 반환하세요 (설명 없이):
{
  "emotion": "angry | frustrated | anxious | neutral 중 정확히 하나",
  "summary": "매니저가 상황을 즉시 파악할 수 있는 2~3문장 한국어 요약",
  "openings": [
    "공감 중심: 고객 감정을 먼저 인정하는 스타일 (고객 이름 포함)",
    "해결 중심: 빠른 처리를 강조하는 스타일 (고객 이름 포함)",
    "간결형: 짧고 직접적인 스타일 (고객 이름 포함)"
  ]
}`;

    const text = callClaude(prompt);
    res.json(extractJSON(text));
  } catch (err) {
    console.error('[/generate]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── POST /handoff → 이관 모달 (요청·상황·다음할일) ───────
app.post('/handoff', async (req, res) => {
  try {
    const { customer, messages } = req.body;

    const prompt = `당신은 이커머스 CS 이관 요약 AI입니다.
다음 담당자가 바로 업무를 이어받을 수 있도록 이관 요약을 작성해주세요.

## 고객 정보
- 이름: ${customer.name}
- 에스컬레이션 사유: ${customer.alfEscalationReason || '없음'}

## 대화 내용
${formatConversation(messages)}

## 응답 형식
아래 JSON만 반환하세요 (설명 없이):
{
  "request": "고객이 원하는 것을 한 문장으로",
  "status": "현재까지 확인된 상황을 한 문장으로",
  "next": "다음 담당자가 해야 할 구체적인 행동을 한 문장으로"
}`;

    const text = callClaude(prompt);
    res.json(extractJSON(text));
  } catch (err) {
    console.error('[/handoff]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── 서버 시작 ────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n⚡ Glance proxy → http://localhost:${PORT}`);
  console.log(`   Claude Code CLI로 동작 (API 키 불필요)\n`);
});
