import UserRank from "../components/user-rank.js";
import SiteMenu from "../components/site-menu.js";
import Filters from "../components/filters.js";
import Sort from "../components/sort.js";
import FilmsBoard from "../components/films-board.js";
import FooterStatistics from "../components/footer-statistics.js";
import FilmsListController from "./films-list-conrtoller.js";
import {render, RenderPosition} from "../utils/render.js";
import {arrayDataChange} from "../utils/common.js";
import {SortType} from "../sorting.js";


const ListMode = {
  DEFAULT: `default`,
  EXTRA: `extra`,
};

class List {
  constructor(title, sortType, mode) {
    this.title = title;
    this.sortType = sortType;
    this.isExtra = (mode === ListMode.EXTRA);
  }
}

const filmsLists = [
  new List(`Default`, SortType.DEFAULT, ListMode.DEFAULT),
  new List(`Top rated`, SortType.BY_RATING, ListMode.EXTRA),
  new List(`Most commented`, SortType.BY_COMMENTS_COUNT, ListMode.EXTRA),
];


const siteHeaderElement = document.body.querySelector(`.header`);
const siteMainElement = document.body.querySelector(`.main`);
const siteFooterElement = document.body.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);


export default class PageController {
  constructor(films, filmsFilters) {
    this._films = films;
    this._filmsFilters = filmsFilters;

    this._onFilmsListDataChange = this._onFilmsListDataChange.bind(this);
    this._onFilmsListViewChange = this._onFilmsListViewChange.bind(this);

    this._siteMenuComponent = new SiteMenu();
    this._userRankComponent = new UserRank(this._filmsFilters);
    this._filtersComponent = new Filters(this._filmsFilters);
    this._sortComponent = new Sort();
    this._filmsBoardComponent = new FilmsBoard();
    this._footerStatisticsComponent = new FooterStatistics(this._films.length);

    this._sortedFilms = [];

    this._filmsListsControllers = [];
  }

/*
 *
 *
 */
  /* _onFilmsChange(oldData, newData) {
    this._films = arrayDataChange(this._films, oldData, newData).array;
  } */


  _onSortTypeChange() {
    this._sortedFilms = this._sortComponent.getSortedFilms(this._films);
    this._renderFilmsBoardController();
  }


  _onFilmsListDataChange(oldData, newData) {
    const newArray = arrayDataChange(this._films, oldData, newData);
    this._films = newArray.array;

    this._filmsListsControllers.forEach((it) => it.setDataChange(oldData, newData));
  }


  _onFilmsListViewChange() {
    this._filmsListsControllers.forEach((it) => it.setDefaultView());
  }


  _renderFilmsBoardController() {
    this._showingFilmControllers = [];

    const filmsBoardElement = this._filmsBoardComponent.getElement();
    filmsBoardElement.innerHTML = ``;

    if (!filmsLists.length) {
      return;
    }

    this._filmsListsControllers = filmsLists.map((list) => {
      const {title, sortType, isExtra} = list;
      const filmsListController = new FilmsListController(filmsBoardElement, title, sortType, isExtra, this._onFilmsListDataChange, this._onFilmsListViewChange);

      filmsListController.render(this._films);

      return filmsListController;
    });
  }


  render() {
    this._sortedFilms = this._films.slice();

    render(siteHeaderElement, this._userRankComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(this._siteMenuComponent.getElement(), this._filtersComponent, RenderPosition.AFTERBEGIN);
    render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(footerStatisticsElement, this._footerStatisticsComponent, RenderPosition.BEFOREEND);

    this._renderFilmsBoardController(this._sortedFilms);

    this._sortComponent.setOnSortTypeChange(this._onSortTypeChange.bind(this));
  }
}
