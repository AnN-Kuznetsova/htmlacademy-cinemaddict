import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";
import {getEnumPropertyKey} from "../utils/common.js";
import {getHistoryFilms} from "../utils/filter.js";
import {getUserRank} from "../utils/user-rank.js";


const BAR_HEIGHT = 50;

const STATISTIC_FILTER_ID_PREFIX = `statistic-`;

const StatisticFilter = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};


export default class Statistics extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;

    this._watchedFilms = [];
    this._genreStatistics = {};
    this._currentFilter = StatisticFilter.ALL_TIME;

    this._statisticFiltersChangeHandler = this._statisticFiltersChangeHandler.bind(this);
  }


  getTemplate() {
    const statisticFiltersMarkup = this._getStatisticFiltersMarkup();
    const watchedFilmsCount = this._watchedFilms.length;
    const userRank = getUserRank(watchedFilmsCount);

    const totalDuration = this._watchedFilms.reduce((duration, film) => {
      return duration + film.duration;
    }, 0);
    const momentDuration = moment.duration(totalDuration, `minutes`);

    this._getGenreStatistics(this._watchedFilms);
    const topGenreValue = Math.max(...Object.values(this._genreStatistics));
    const topGenre = watchedFilmsCount ? getEnumPropertyKey(this._genreStatistics, topGenreValue) : ``;

    return (
      `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userRank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${statisticFiltersMarkup}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilmsCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${momentDuration.hours()} <span class="statistic__item-description">h</span> ${momentDuration.minutes()} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
    );
  }


  show(filmsModel) {
    this._filmsModel = filmsModel;
    this._watchedFilms = getHistoryFilms(this._filmsModel.getFilmsAll());

    super.show();

    this.rerender();
  }


  rerender() {
    super.rerender();

    this._renderChart();
  }


  recoveryListeners() {
    this._setStatisticFiltersChangeHandler();
  }


  _getStatisticFiltersMarkup() {
    return Object.values(StatisticFilter)
      .map((filter) => {
        const isChecked = (filter === this._currentFilter) ? `checked` : ``;
        const description = ``.concat(filter[0].toUpperCase(),
            filter.substring(1).split(`-`).join(` `));

        return (
          `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="${STATISTIC_FILTER_ID_PREFIX}${filter}" value="${filter}" ${isChecked}>
          <label for="statistic-${filter}" class="statistic__filters-label">${description}</label>`
        );
      })
      .join(`\n`);
  }


  _getGenreStatistics(films) {
    this._genreStatistics = {};

    films.forEach((film) => {
      film.genre.forEach((genre) => {
        if (Object.keys(this._genreStatistics).includes(genre)) {
          this._genreStatistics[genre] = this._genreStatistics[genre] + 1;
        } else {
          this._genreStatistics[genre] = 1;
        }
      });
    });
  }


  _renderChart() {
    const statisticCtx = document.querySelector(`.statistic__chart`);

    const genreLabels = Object.keys(this._genreStatistics);
    const genreValues = Object.values(this._genreStatistics);
    const genreCount = genreLabels.length;
    statisticCtx.height = BAR_HEIGHT * genreCount;

    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [...genreLabels],
        datasets: [{
          data: [...genreValues],
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }


  _setStatisticFiltersChangeHandler() {
    this.getElement().querySelector(`.statistic__filters`)
      .addEventListener(`change`, this._statisticFiltersChangeHandler);
  }


  _statisticFiltersChangeHandler(evt) {
    const currentFilter = evt.target.id
      .substring(STATISTIC_FILTER_ID_PREFIX.length);

    this._currentFilter = currentFilter;

    switch (currentFilter) {
      case StatisticFilter.TODAY:
        break;
      case StatisticFilter.WEEK:
        break;
      case StatisticFilter.MONTH:
        break;
      case StatisticFilter.YEAR:
        break;
      case StatisticFilter.ALL_TIME:
      default:
        this._watchedFilms = getHistoryFilms(this._filmsModel.getFilmsAll());
    }

    this.rerender();
  }
}
