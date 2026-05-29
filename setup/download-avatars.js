/**
 * setup/download-avatars.js
 * 고객 페르소나(나이·성별)에 맞춰 DiceBear micah 아바타를 다운로드해
 * assets/avatars/ 폴더에 로컬 SVG 파일로 저장합니다.
 *
 * 실행: node setup/download-avatars.js
 */

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const url   = require('url');

const OUT_DIR = path.join(__dirname, '..', 'assets', 'avatars');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── 페르소나 → DiceBear micah 파라미터 매핑 ──────────────────
// hairStyle: dougFunny | fonze | full | pixie | turban
// eyeStyle:  open | round | smiling
// facialHairStyle: beard | scruff | (생략=없음)
// earSize:   big | small

const avatars = [
  // id          이름    나이  성별  hairStyle      eyeStyle   facialHair  earSize  비고
  { id: 'user001',   name: '황혜란', age: 33, sex: 'F', hair: 'pixie',    eye: 'smiling', fh: '',       ear: 'small' }, // 30대 워킹맘, 분노
  { id: 'user002',   name: '이태훈', age: 27, sex: 'M', hair: 'fonze',    eye: 'round',   fh: 'scruff', ear: 'big'   }, // 20대 남성, 불만
  { id: 'user003',   name: '김다희', age: 46, sex: 'F', hair: 'full',     eye: 'open',    fh: '',       ear: 'small' }, // 40대 여성, 분노
  { id: 'user004',   name: '설숙자', age: 50, sex: 'F', hair: 'turban',   eye: 'open',    fh: '',       ear: 'small' }, // 50대 여성, 불안
  { id: 'user005',   name: '박현식', age: 26, sex: 'M', hair: 'dougFunny',eye: 'smiling', fh: '',       ear: 'big'   }, // 20대 남성, 냉정
  { id: 'user006',   name: '김수진', age: 38, sex: 'F', hair: 'dougFunny',eye: 'round',   fh: '',       ear: 'small' }, // 30대 여성, 냉정
  { id: 'user007',   name: '송순근', age: 49, sex: 'M', hair: 'fonze',    eye: 'open',    fh: 'beard',  ear: 'big'   }, // 40대 남성, 불만
  { id: 'user008',   name: '박유하', age: 32, sex: 'F', hair: 'pixie',    eye: 'smiling', fh: '',       ear: 'small' }, // 30대 여성, 분노
  { id: 'missed001', name: '이정민', age: 28, sex: 'F', hair: 'full',     eye: 'smiling', fh: '',       ear: 'small' }, // 20대 여성
  { id: 'missed002', name: '최선우', age: 35, sex: 'M', hair: 'fonze',    eye: 'round',   fh: '',       ear: 'big'   }, // 30대 남성
  { id: 'missed003', name: '정혜원', age: 42, sex: 'F', hair: 'full',     eye: 'open',    fh: '',       ear: 'small' }, // 40대 여성
];

function buildUrl(a) {
  const params = new URLSearchParams({
    seed:      a.id,
    hairStyle: a.hair,
    eyeStyle:  a.eye,
    earSize:   a.ear,
  });
  if (a.fh) params.set('facialHairStyle', a.fh);
  // 성별에 따라 배경색 미세 차이 (선택)
  params.set('backgroundColor', a.sex === 'F' ? 'fde8e8,e8ecfd,e8fdf0' : 'e8f0fd,fdf5e8,eee8fd');
  return `https://api.dicebear.com/8.x/micah/svg?${params}`;
}

function download(srcUrl, dest) {
  return new Promise((resolve, reject) => {
    const parsed = url.parse(srcUrl);
    const client = parsed.protocol === 'https:' ? https : http;

    const file = fs.createWriteStream(dest);
    client.get(srcUrl, res => {
      // 리다이렉트 처리
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${srcUrl}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', e => {
      fs.existsSync(dest) && fs.unlinkSync(dest);
      reject(e);
    });
  });
}

async function main() {
  console.log(`\n📥 아바타 다운로드 → ${OUT_DIR}\n`);
  for (const a of avatars) {
    const srcUrl = buildUrl(a);
    const dest   = path.join(OUT_DIR, `${a.id}.svg`);
    process.stdout.write(`  ${a.id}  ${a.name}(${a.sex === 'F' ? '여' : '남'} ${a.age}세) ... `);
    try {
      await download(srcUrl, dest);
      console.log('✅');
    } catch (e) {
      console.log(`❌ ${e.message}`);
    }
  }
  console.log('\n완료! mock-data.js avatarUrl을 로컬 경로로 업데이트하세요.\n');
}

main();
