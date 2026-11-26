# 国势 Guoshi · 中国国家统计图览

[![make.fun bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Lisanye9527/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Lisanye9527/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An entry for the make.fun bounty [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

Guoshi is an offline national statistics site for China. It collects the
headline figures a visitor looks for — population, GDP, incomes, provinces —
from the official statistical communiqués of the National Bureau of
Statistics and other official publishers, and prints the source and year
next to every number.

## What's inside

- **总览 Overview** — the six headline 2024 figures with sources, plus GDP and population charts.
- **人口 Population** — total population 2015–2024, births vs deaths, the 2024 age structure, urbanisation.
- **经济 Economy** — GDP level and real growth, the 2024 three-sector structure, key 2024 indicators.
- **社会 Society** — disposable income 2015–2024, urban/rural incomes, life expectancy, R&D spending.
- **地区 Regions** — the top ten provinces by 2024 GDP and by resident population.
- **数据探索 Explorer** — pick an indicator and a chart type; the chart and data table redraw at once.
- **来源 About** — every publication the figures came from, and the statistical notes.

## Run it

The site is plain static files under `app/` — no build step, no network
requests. Serve the folder with the bundled development server:

```
node serve.ts            # serves app/ at http://localhost:8080
```

or any static file server with `app/` at its root. Open it on a desktop or
at a phone's size; the layout adapts.

## Hand it in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored
make.fun library in `vendor/makefun-frontend.ts`:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `app/index.html` — the page shell: masthead, navigation, footer.
- `app/data.js` — every figure on the site, each with its source and year.
- `app/charts.js` — dependency-free SVG charts (line, grouped bars, donut, ranked bars).
- `app/views.js` — one render function per section.
- `app/main.js` — the hash router and the explorer's controls.
- `app/style.css` — the ink-and-vermilion design.
- `screenshots/` — four screenshots of the running site (desktop and phone).
- `main.ts` — the hand-in program described above.

## License

MIT — see `LICENSE`.
