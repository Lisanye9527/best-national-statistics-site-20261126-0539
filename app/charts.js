// charts.js — small dependency-free SVG charts.
// Every chart is drawn from the plain data objects in data.js and returns an
// SVG string, so the pages stay static files with no runtime fetching.

const INK = '#1d2a3a';
const ACCENT = '#b3392e';
const GOLD = '#c8932a';
const TEAL = '#1f6f6b';
const GRID = '#d8dee6';

function fmt(n) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function scaleLinear(domainMin, domainMax, rangeMin, rangeMax) {
  const span = domainMax - domainMin || 1;
  return (v) => rangeMin + ((v - domainMin) / span) * (rangeMax - rangeMin);
}

// Line chart of {year, value} points with labelled endpoints and a soft area.
export function lineChart(points, opts = {}) {
  const w = opts.width || 640, h = opts.height || 260;
  const padL = 52, padR = 16, padT = 18, padB = 30;
  const values = points.map((p) => p.value);
  let min = Math.min(...values), max = Math.max(...values);
  const pad = (max - min) * 0.15 || 1;
  min -= pad; max += pad;
  const x = scaleLinear(points[0].year, points[points.length - 1].year, padL, w - padR);
  const y = scaleLinear(min, max, h - padB, padT);
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(p.year).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points[points.length - 1].year).toFixed(1)},${h - padB} L${padL},${h - padB} Z`;
  const dots = points.map((p) => `<circle cx="${x(p.year).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="3" fill="${ACCENT}"/>`).join('');
  const first = points[0], last = points[points.length - 1];
  const ticks = [0, 0.5, 1].map((t) => {
    const v = min + (max - min) * t, yy = y(v);
    return `<line x1="${padL}" y1="${yy}" x2="${w - padR}" y2="${yy}" stroke="${GRID}"/><text x="${padL - 6}" y="${yy + 4}" text-anchor="end" class="tick">${fmt(Math.round(v * 100) / 100)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="${opts.label || ''}">
    ${ticks}
    <path d="${area}" fill="${ACCENT}" opacity="0.08"/>
    <path d="${line}" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>
    ${dots}
    <text x="${x(first.year)}" y="${y(first.value) - 10}" text-anchor="middle" class="val">${fmt(first.value)}</text>
    <text x="${x(last.year)}" y="${y(last.value) - 10}" text-anchor="middle" class="val">${fmt(last.value)}</text>
    <text x="${padL}" y="${h - 8}" class="tick">${first.year}</text>
    <text x="${w - padR}" y="${h - 8}" text-anchor="end" class="tick">${last.year}</text>
  </svg>`;
}

// Grouped vertical bars for rows like births vs deaths.
export function groupedBars(rows, keys, opts = {}) {
  const w = opts.width || 640, h = opts.height || 260;
  const padL = 44, padR = 10, padT = 16, padB = 30;
  const max = Math.max(...rows.flatMap((r) => keys.map((k) => r[k.key]))) * 1.12;
  const y = scaleLinear(0, max, h - padB, padT);
  const groupW = (w - padL - padR) / rows.length;
  const barW = Math.min(22, (groupW - 14) / keys.length);
  let out = '';
  rows.forEach((r, i) => {
    const gx = padL + i * groupW;
    keys.forEach((k, j) => {
      const bx = gx + groupW / 2 - (barW * keys.length) / 2 + j * barW;
      out += `<rect x="${bx.toFixed(1)}" y="${y(r[k.key])}" width="${barW - 2}" height="${(h - padB - y(r[k.key])).toFixed(1)}" fill="${k.color}"><title>${r.year} ${k.label} ${fmt(r[k.key])}</title></rect>`;
    });
    out += `<text x="${gx + groupW / 2}" y="${h - 8}" text-anchor="middle" class="tick">${r.year}</text>`;
  });
  const legend = keys.map((k, i) => `<rect x="${padL + i * 92}" y="2" width="10" height="10" fill="${k.color}"/><text x="${padL + i * 92 + 14}" y="11" class="tick">${k.label}</text>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="${opts.label || ''}">${legend}${out}</svg>`;
}

// Donut of parts with a share, plus a centre label.
export function donutChart(parts, opts = {}) {
  const size = opts.size || 220, r = 84, cx = size / 2, cy = size / 2, sw = 30;
  const colors = [ACCENT, TEAL, GOLD, '#5b7ea6'];
  let acc = 0;
  const arcs = parts.map((p, i) => {
    const start = acc / 100 * Math.PI * 2 - Math.PI / 2;
    acc += p.share;
    const end = acc / 100 * Math.PI * 2 - Math.PI / 2;
    const large = p.share > 50 ? 1 : 0;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    return `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="${sw}"><title>${p.label} ${p.share}%</title></path>`;
  }).join('');
  return `<svg viewBox="0 0 ${size} ${size}" class="chart donut" role="img" aria-label="${opts.label || ''}">${arcs}<text x="${cx}" y="${cy + 5}" text-anchor="middle" class="donut-centre">${opts.centre || ''}</text></svg>`;
}

// Horizontal ranked bars for province tables.
export function rankBars(rows, opts = {}) {
  const max = Math.max(...rows.map((r) => r.value));
  return `<div class="rank">${rows.map((r, i) => `
    <div class="rank-row">
      <span class="rank-no">${i + 1}</span>
      <span class="rank-name">${r.name}</span>
      <span class="rank-track"><span class="rank-fill" style="width:${(r.value / max * 100).toFixed(1)}%"></span></span>
      <span class="rank-val">${fmt(r.value)}</span>
    </div>`).join('')}</div>`;
}

export const PALETTE = { INK, ACCENT, GOLD, TEAL };
