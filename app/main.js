// main.js — hash router and the explorer's controls.
// Routes: #/ (overview), #/population, #/economy, #/society, #/regions,
// #/explorer, #/about. Unknown routes fall back to the overview.

import {
  viewOverview, viewPopulation, viewEconomy, viewSociety, viewRegions,
  viewExplorer, viewAbout, explorerBarChart, explorerTable,
} from './views.js';
import { EXPLORER_SERIES } from './data.js';
import { lineChart } from './charts.js';

const ROUTES = {
  '': viewOverview,
  population: viewPopulation,
  economy: viewEconomy,
  society: viewSociety,
  regions: viewRegions,
  explorer: viewExplorer,
  about: viewAbout,
};

const app = document.getElementById('app');

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return Object.prototype.hasOwnProperty.call(ROUTES, hash) ? hash : '';
}

function markNav(route) {
  document.querySelectorAll('nav a[data-route]').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === route);
  });
}

function drawExplorer() {
  const select = document.getElementById('explorer-series');
  const type = document.getElementById('explorer-type');
  if (!select || !type) return;
  const series = EXPLORER_SERIES.find((s) => s.id === select.value) || EXPLORER_SERIES[0];
  const chart = document.getElementById('explorer-chart');
  chart.innerHTML = type.value === 'bar'
    ? explorerBarChart(series.data.points)
    : lineChart(series.data.points, { label: series.data.title });
  document.getElementById('explorer-table').innerHTML = explorerTable(series.data.points);
  document.getElementById('explorer-source').textContent = `来源: ${series.data.source}`;
}

function wireExplorer() {
  const select = document.getElementById('explorer-series');
  if (!select) return;
  select.addEventListener('change', drawExplorer);
  document.getElementById('explorer-type').addEventListener('change', drawExplorer);
  drawExplorer();
}

function render() {
  const route = currentRoute();
  app.innerHTML = ROUTES[route]();
  markNav(route);
  if (route === 'explorer') wireExplorer();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
