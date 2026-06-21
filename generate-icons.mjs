// 아이콘 생성 스크립트 (Node.js 실행: node generate-icons.mjs)
// canvas 패키지 필요: npm install canvas

import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('public/icons', { recursive: true });

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const r = size * 0.15;

  // 배경
  ctx.fillStyle = '#4CAF50';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, r);
  ctx.fill();

  // 체크리스트 줄
  const lineH = size * 0.06;
  const lineY = [0.32, 0.5, 0.68].map((y) => size * y);
  const startX = size * 0.28;
  const lineW = size * 0.52;

  ctx.fillStyle = 'white';
  lineY.forEach((y) => {
    ctx.beginPath();
    ctx.roundRect(startX, y - lineH / 2, lineW, lineH, lineH / 2);
    ctx.fill();

    // 체크박스 원
    ctx.beginPath();
    ctx.arc(size * 0.18, y, lineH * 0.9, 0, Math.PI * 2);
    ctx.fill();
  });

  return canvas.toBuffer('image/png');
}

writeFileSync('public/icons/icon-192.png', drawIcon(192));
writeFileSync('public/icons/icon-512.png', drawIcon(512));
console.log('아이콘 생성 완료: public/icons/icon-192.png, icon-512.png');
