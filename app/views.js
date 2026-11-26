// views.js — renders each section of the site from data.js + charts.js.
// Every figure is printed next to the publication it came from.

import {
  HEADLINES, POPULATION_TREND, BIRTHS_DEATHS, AGE_STRUCTURE_2024, URBANISATION,
  GDP_TREND, GDP_GROWTH, GDP_STRUCTURE_2024, ECONOMY_FACTS,
  INCOME_TREND, SOCIETY_FACTS, PROVINCE_GDP_2024, PROVINCE_POP_2024,
  EXPLORER_SERIES, SOURCES,
} from './data.js';
import { lineChart, groupedBars, donutChart, rankBars, PALETTE } from './charts.js';

function sourceLine(source) {
  return `<p class="source">来源: ${source}</p>`;
}

function chartCard(title, chart, source, extra = '') {
  return `<section class="card chart-card">
    <h3>${title}</h3>
    ${chart}
    ${extra}
    ${sourceLine(source)}
  </section>`;
}

function factCards(facts) {
  return `<div class="fact-grid">${facts.map((f) => `
    <article class="fact">
      <p class="fact-label">${f.label}</p>
      <p class="fact-value">${f.value}</p>
      <p class="fact-note">${f.note}</p>
      <p class="source">来源: ${f.source}</p>
    </article>`).join('')}</div>`;
}

function shareList(parts, unit) {
  return `<ul class="share-list">${parts.map((p) => `
    <li><span>${p.label}</span><strong>${p.value.toLocaleString('en-US')} ${unit} · ${p.share}%</strong></li>`).join('')}</ul>`;
}

export function viewOverview() {
  return `
  <section class="hero">
    <h2>一个国家的家底, 都在这里</h2>
    <p>国势收录中国国家统计的核心数字: 人口、经济、社会与地区。每个数字都标注出处与年份, 可以直接查证。</p>
  </section>
  <div class="headline-grid">
    ${HEADLINES.map((h) => `
    <article class="headline">
      <p class="headline-label">${h.label}</p>
      <p class="headline-value">${h.value}<span class="headline-unit"> ${h.unit}</span></p>
      <p class="fact-note">${h.note}</p>
      <p class="source">来源: ${h.source}</p>
    </article>`).join('')}
  </div>
  ${chartCard(GDP_TREND.title, lineChart(GDP_TREND.points, { label: GDP_TREND.title }), GDP_TREND.source)}
  ${chartCard(POPULATION_TREND.title, lineChart(POPULATION_TREND.points, { label: POPULATION_TREND.title }), POPULATION_TREND.source)}
  <section class="card">
    <h3>从这里开始逛</h3>
    <p class="guide">
      <a href="#/population">人口</a> 看总人口、出生死亡与年龄结构如何变化;
      <a href="#/economy">经济</a> 看 GDP 规模、增速与三次产业;
      <a href="#/society">社会</a> 看收入、寿命与研发投入;
      <a href="#/regions">地区</a> 看各省的经济与人口排名;
      <a href="#/explorer">数据探索</a> 可以自己选指标、换图型, 对比十年走势。
    </p>
  </section>`;
}

export function viewPopulation() {
  return `
  <h2 class="page-title">人口</h2>
  <p class="page-lede">中国人口在 2021 年见顶后连续三年小幅下降, 城镇化仍在推进, 60 岁及以上人口已超过五分之一。</p>
  ${chartCard(POPULATION_TREND.title, lineChart(POPULATION_TREND.points, { label: POPULATION_TREND.title }), POPULATION_TREND.source)}
  ${chartCard(BIRTHS_DEATHS.title,
    groupedBars(BIRTHS_DEATHS.rows, [
      { key: 'births', label: '出生', color: PALETTE.TEAL },
      { key: 'deaths', label: '死亡', color: PALETTE.ACCENT },
    ], { label: BIRTHS_DEATHS.title }), BIRTHS_DEATHS.source,
    '<p class="fact-note">2022 年起死亡人口超过出生人口, 人口进入负增长。2024 年出生人口回升至 954 万人。</p>')}
  <section class="card chart-card">
    <h3>${AGE_STRUCTURE_2024.title}</h3>
    <div class="donut-wrap">
      ${donutChart(AGE_STRUCTURE_2024.parts, { label: AGE_STRUCTURE_2024.title, centre: '2024' })}
      <div>${shareList(AGE_STRUCTURE_2024.parts, '万人')}<p class="fact-note">${AGE_STRUCTURE_2024.note}</p></div>
    </div>
    ${sourceLine(AGE_STRUCTURE_2024.source)}
  </section>
  ${chartCard(URBANISATION.title, lineChart(URBANISATION.points, { label: URBANISATION.title }), URBANISATION.source)}`;
}

export function viewEconomy() {
  return `
  <h2 class="page-title">经济</h2>
  <p class="page-lede">2024 年国内生产总值 134.9 万亿元, 增长 5.0%; 第三产业占 56.7%, 是国民经济的主体。</p>
  ${chartCard(GDP_TREND.title, lineChart(GDP_TREND.points, { label: GDP_TREND.title }), GDP_TREND.source)}
  ${chartCard(GDP_GROWTH.title, lineChart(GDP_GROWTH.points, { label: GDP_GROWTH.title }), GDP_GROWTH.source)}
  <section class="card chart-card">
    <h3>${GDP_STRUCTURE_2024.title}</h3>
    <div class="donut-wrap">
      ${donutChart(GDP_STRUCTURE_2024.parts, { label: GDP_STRUCTURE_2024.title, centre: 'GDP' })}
      <div>${shareList(GDP_STRUCTURE_2024.parts, '亿元')}<p class="fact-note">${GDP_STRUCTURE_2024.note}</p></div>
    </div>
    ${sourceLine(GDP_STRUCTURE_2024.source)}
  </section>
  <h3 class="section-title">2024 年经济要点</h3>
  ${factCards(ECONOMY_FACTS)}`;
}

export function viewSociety() {
  return `
  <h2 class="page-title">社会</h2>
  <p class="page-lede">居民收入十年接近翻倍, 城乡收入比持续收窄; 人均预期寿命 78.6 岁, 研发投入强度达到 2.68%。</p>
  ${chartCard(INCOME_TREND.title, lineChart(INCOME_TREND.points, { label: INCOME_TREND.title }), INCOME_TREND.source)}
  <h3 class="section-title">民生指标</h3>
  ${factCards(SOCIETY_FACTS)}`;
}

export function viewRegions() {
  return `
  <h2 class="page-title">地区</h2>
  <p class="page-lede">广东的经济总量与常住人口都居全国第一; 江苏与广东是仅有的两个 GDP 超过 13 万亿元的省份。</p>
  <section class="card chart-card">
    <h3>${PROVINCE_GDP_2024.title}</h3>
    ${rankBars(PROVINCE_GDP_2024.rows)}
    ${sourceLine(PROVINCE_GDP_2024.source)}
  </section>
  <section class="card chart-card">
    <h3>${PROVINCE_POP_2024.title}</h3>
    ${rankBars(PROVINCE_POP_2024.rows)}
    ${sourceLine(PROVINCE_POP_2024.source)}
  </section>`;
}

export function viewExplorer() {
  const options = EXPLORER_SERIES.map((s) => `<option value="${s.id}">${s.label}</option>`).join('');
  return `
  <h2 class="page-title">数据探索</h2>
  <p class="page-lede">选一个指标, 再选折线或柱状, 图会立刻重画。所有序列都是 2015–2024 年的官方年度数据。</p>
  <section class="card">
    <div class="controls">
      <label>指标
        <select id="explorer-series">${options}</select>
      </label>
      <label>图型
        <select id="explorer-type">
          <option value="line">折线图</option>
          <option value="bar">柱状图</option>
        </select>
      </label>
    </div>
    <div id="explorer-chart"></div>
    <div id="explorer-table"></div>
    <p class="source" id="explorer-source"></p>
  </section>`;
}

// Bar variant used by the explorer: reuses groupedBars with a single series.
export function explorerBarChart(points) {
  const rows = points.map((p) => ({ year: p.year, value: p.value }));
  return groupedBars(rows, [{ key: 'value', label: '数值', color: PALETTE.ACCENT }], { label: 'explorer bars' });
}

export function explorerTable(points) {
  return `<table class="data-table"><thead><tr><th>年份</th><th>数值</th></tr></thead>
    <tbody>${points.map((p) => `<tr><td>${p.year}</td><td>${p.value.toLocaleString('en-US')}</td></tr>`).join('')}</tbody></table>`;
}

export function viewAbout() {
  return `
  <h2 class="page-title">关于本站与数据来源</h2>
  <section class="card">
    <h3>本站是什么</h3>
    <p>国势 (Guoshi) 是一个离线可用的中国国家统计站点: 所有页面、图表与数据都装在站点自己的文件里, 不联网也能打开。它的目标是把散落在各年统计公报里的核心数字, 整理成可以逛、可以查、可以引用的样子。</p>
    <h3>数据从哪来</h3>
    <ul class="share-list">
      <li><span>年度总数据</span><strong>${SOURCES.nbs2024}</strong></li>
      <li><span>历年序列</span><strong>${SOURCES.nbsYearbook}</strong></li>
      <li><span>人口普查</span><strong>${SOURCES.census2020}</strong></li>
      <li><span>卫生与寿命</span><strong>${SOURCES.nhc2024}</strong></li>
      <li><span>电力数据</span><strong>${SOURCES.nea2025}</strong></li>
      <li><span>分省数据</span><strong>${SOURCES.provinces2024}</strong></li>
    </ul>
    <h3>口径说明</h3>
    <p>人口为年末常住人口口径; GDP 为当年价格, 增速为不变价格计算的实际增速; 个别年份的 GDP 总量经经济普查修订后与最初公布数略有差异, 本站采用统计公报公布数。分省 GDP 为各省初步核算数。引用时请回到上方所列原始公报核对。</p>
  </section>`;
}
