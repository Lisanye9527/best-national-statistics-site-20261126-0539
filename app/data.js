// data.js — every figure shown on this site, with its source and year.
// All numbers are real published statistics for China. Each series names the
// publication it came from so a visitor can check it. Nothing is fetched:
// this file is the site's whole database.

export const SOURCES = {
  nbs2024: '国家统计局《2024年国民经济和社会发展统计公报》(2025-02-28)',
  nbs2023: '国家统计局《2023年国民经济和社会发展统计公报》(2024-02-29)',
  nbsYearbook: '国家统计局《中国统计年鉴》及年度统计公报',
  census2020: '国家统计局《第七次全国人口普查公报》(2021-05-11)',
  nhc2024: '国家卫生健康委《2023年我国卫生健康事业发展统计公报》',
  nea2025: '国家能源局 2024 年全国电力工业统计数据 (2025-01)',
  provinces2024: '各省统计局 2024 年国民经济和社会发展统计公报',
};

// ---- Headline cards for the overview page --------------------------------
export const HEADLINES = [
  { label: '国内生产总值 GDP', value: '1,349,084', unit: '亿元', note: '比上年增长 5.0%', source: SOURCES.nbs2024, year: 2024 },
  { label: '年末全国人口', value: '1,408.28', unit: '百万人', note: '比上年末减少 139 万人', source: SOURCES.nbs2024, year: 2024 },
  { label: '人均国内生产总值', value: '95,749', unit: '元', note: '比上年增长 5.1%', source: SOURCES.nbs2024, year: 2024 },
  { label: '全国居民人均可支配收入', value: '41,314', unit: '元', note: '名义增长 5.3%', source: SOURCES.nbs2024, year: 2024 },
  { label: '城镇化率', value: '67.00', unit: '%', note: '常住人口口径, 比上年末提高 0.84 个百分点', source: SOURCES.nbs2024, year: 2024 },
  { label: '货物进出口总额', value: '438,468', unit: '亿元', note: '出口 254,545 亿元, 进口 183,923 亿元', source: SOURCES.nbs2024, year: 2024 },
];

// ---- Population -----------------------------------------------------------
export const POPULATION_TREND = {
  title: '年末总人口 (百万人)',
  source: SOURCES.nbsYearbook,
  points: [
    { year: 2015, value: 1383.26 }, { year: 2016, value: 1392.32 },
    { year: 2017, value: 1400.11 }, { year: 2018, value: 1405.41 },
    { year: 2019, value: 1410.08 }, { year: 2020, value: 1412.36 },
    { year: 2021, value: 1412.60 }, { year: 2022, value: 1411.75 },
    { year: 2023, value: 1409.67 }, { year: 2024, value: 1408.28 },
  ],
};

export const BIRTHS_DEATHS = {
  title: '出生与死亡人口 (万人)',
  source: SOURCES.nbsYearbook,
  rows: [
    { year: 2019, births: 1465, deaths: 998 },
    { year: 2020, births: 1202, deaths: 997 },
    { year: 2021, births: 1062, deaths: 1014 },
    { year: 2022, births: 956, deaths: 1041 },
    { year: 2023, births: 902, deaths: 1110 },
    { year: 2024, births: 954, deaths: 1093 },
  ],
};

export const AGE_STRUCTURE_2024 = {
  title: '2024 年末人口年龄构成',
  source: SOURCES.nbs2024,
  parts: [
    { label: '0–15 岁', value: 23999, share: 17.1 },
    { label: '16–59 岁', value: 85798, share: 60.9 },
    { label: '60 岁及以上', value: 31031, share: 22.0 },
  ],
  note: '其中 65 岁及以上人口 22,023 万人, 占 15.6%。单位: 万人。',
};

export const URBANISATION = {
  title: '常住人口城镇化率 (%)',
  source: SOURCES.nbsYearbook,
  points: [
    { year: 2015, value: 56.10 }, { year: 2016, value: 57.35 },
    { year: 2017, value: 58.52 }, { year: 2018, value: 59.58 },
    { year: 2019, value: 60.60 }, { year: 2020, value: 63.89 },
    { year: 2021, value: 64.72 }, { year: 2022, value: 65.22 },
    { year: 2023, value: 66.16 }, { year: 2024, value: 67.00 },
  ],
};

// ---- Economy --------------------------------------------------------------
export const GDP_TREND = {
  title: '国内生产总值 (万亿元, 当年价格)',
  source: SOURCES.nbsYearbook,
  points: [
    { year: 2015, value: 68.89 }, { year: 2016, value: 74.64 },
    { year: 2017, value: 83.20 }, { year: 2018, value: 91.93 },
    { year: 2019, value: 99.09 }, { year: 2020, value: 101.60 },
    { year: 2021, value: 114.92 }, { year: 2022, value: 121.02 },
    { year: 2023, value: 126.06 }, { year: 2024, value: 134.91 },
  ],
};

export const GDP_GROWTH = {
  title: 'GDP 实际增长率 (%)',
  source: SOURCES.nbsYearbook,
  points: [
    { year: 2015, value: 6.9 }, { year: 2016, value: 6.7 },
    { year: 2017, value: 6.9 }, { year: 2018, value: 6.6 },
    { year: 2019, value: 6.0 }, { year: 2020, value: 2.2 },
    { year: 2021, value: 8.4 }, { year: 2022, value: 3.0 },
    { year: 2023, value: 5.2 }, { year: 2024, value: 5.0 },
  ],
};

export const GDP_STRUCTURE_2024 = {
  title: '2024 年三次产业占 GDP 比重',
  source: SOURCES.nbs2024,
  parts: [
    { label: '第一产业', value: 91414, share: 6.8 },
    { label: '第二产业', value: 492087, share: 36.5 },
    { label: '第三产业', value: 765583, share: 56.7 },
  ],
  note: '产业增加值单位: 亿元。',
};

export const ECONOMY_FACTS = [
  { label: '社会消费品零售总额', value: '487,895 亿元', note: '2024 年, 比上年增长 3.5%', source: SOURCES.nbs2024 },
  { label: '全社会固定资产投资', value: '514,374 亿元', note: '2024 年, 比上年增长 3.2%', source: SOURCES.nbs2024 },
  { label: '居民消费价格 CPI', value: '上涨 0.2%', note: '2024 年全年涨幅', source: SOURCES.nbs2024 },
  { label: '城镇调查失业率平均值', value: '5.1%', note: '2024 年全国平均', source: SOURCES.nbs2024 },
  { label: '粮食总产量', value: '70,650 万吨', note: '2024 年, 首次突破 7 亿吨', source: SOURCES.nbs2024 },
  { label: '全社会用电量', value: '98,521 亿千瓦时', note: '2024 年, 比上年增长 6.8%', source: SOURCES.nea2025 },
];

// ---- Society ----------------------------------------------------------------
export const INCOME_TREND = {
  title: '全国居民人均可支配收入 (元)',
  source: SOURCES.nbsYearbook,
  points: [
    { year: 2015, value: 21966 }, { year: 2016, value: 23821 },
    { year: 2017, value: 25974 }, { year: 2018, value: 28228 },
    { year: 2019, value: 30733 }, { year: 2020, value: 32189 },
    { year: 2021, value: 35128 }, { year: 2022, value: 36883 },
    { year: 2023, value: 39218 }, { year: 2024, value: 41314 },
  ],
};

export const SOCIETY_FACTS = [
  { label: '城镇居民人均可支配收入', value: '54,188 元', note: '2024 年, 名义增长 4.6%', source: SOURCES.nbs2024 },
  { label: '农村居民人均可支配收入', value: '23,119 元', note: '2024 年, 名义增长 6.6%', source: SOURCES.nbs2024 },
  { label: '人均预期寿命', value: '78.6 岁', note: '2023 年', source: SOURCES.nhc2024 },
  { label: '研究与试验发展 (R&D) 经费', value: '36,130 亿元', note: '2024 年, 占 GDP 的 2.68%', source: SOURCES.nbs2024 },
  { label: '年末全国就业人员', value: '73,439 万人', note: '2024 年末, 其中城镇就业人员 47,345 万人', source: SOURCES.nbs2024 },
  { label: '每千人口医疗卫生机构床位', value: '7.3 张', note: '2023 年末', source: SOURCES.nhc2024 },
];

// ---- Regions ------------------------------------------------------------------
export const PROVINCE_GDP_2024 = {
  title: '2024 年地区生产总值前十 (亿元)',
  source: SOURCES.provinces2024,
  rows: [
    { name: '广东', value: 141634 }, { name: '江苏', value: 137008 },
    { name: '山东', value: 98566 }, { name: '浙江', value: 90131 },
    { name: '四川', value: 64697 }, { name: '河南', value: 63590 },
    { name: '湖北', value: 60013 }, { name: '福建', value: 57761 },
    { name: '上海', value: 53927 }, { name: '湖南', value: 53231 },
  ],
};

export const PROVINCE_POP_2024 = {
  title: '2024 年末常住人口前十 (万人)',
  source: SOURCES.provinces2024,
  rows: [
    { name: '广东', value: 12780 }, { name: '山东', value: 10080 },
    { name: '河南', value: 9789 }, { name: '江苏', value: 8526 },
    { name: '四川', value: 8364 }, { name: '河北', value: 7378 },
    { name: '浙江', value: 6670 }, { name: '湖南', value: 6539 },
    { name: '安徽', value: 6123 }, { name: '湖北', value: 5834 },
  ],
};

// ---- Explorer: selectable indicator series -------------------------------------
export const EXPLORER_SERIES = [
  { id: 'gdp', label: '国内生产总值 (万亿元)', data: GDP_TREND },
  { id: 'growth', label: 'GDP 实际增长率 (%)', data: GDP_GROWTH },
  { id: 'population', label: '年末总人口 (百万人)', data: POPULATION_TREND },
  { id: 'urban', label: '城镇化率 (%)', data: URBANISATION },
  { id: 'income', label: '居民人均可支配收入 (元)', data: INCOME_TREND },
];
