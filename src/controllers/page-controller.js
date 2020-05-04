import UserRank from "../components/user-rank.js";
import SiteMenu from "../components/site-menu.js";
import Filters from "../components/filters.js";
import Sort from "../components/sort.js";
import FilmsBoard from "../components/films-board.js";
import FooterStatistics from "../components/footer-statistics.js";
import FilmsBoardController from "./films-board-controller.js";
import {render, RenderPosition} from "../utils/render.js";
import {arrayDataChange} from "../utils/common.js";


const siteHeaderElement = document.body.querySelector(`.header`);
const siteMainElement = document.body.querySelector(`.main`);
const siteFooterElement = document.body.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);


export default class PageController {
  constructor(films, filmsFilters) {
    this._films = films;
    this._filmsFilters = filmsFilters;

    this._onFilmsChange = this._onFilmsChange.bind(this);

    this._siteMenuComponent = new SiteMenu();
    this._userRankComponent = new UserRank(this._filmsFilters);
    this._filtersComponent = new Filters(this._filmsFilters);
    this._sortComponent = new Sort();
    this._filmsBoardComponent = new FilmsBoard();
    this._footerStatisticsComponent = new FooterStatistics(this._films.length);
    this._filmsBoardController = new FilmsBoardController(this._filmsBoardComponent, this._onFilmsChange);

    this._sortedFilms = [];
  }


  _onFilmsChange(oldData, newData) {
    this._films = arrayDataChange(this._films, oldData, newData).array;
  }


  _onSortTypeChange() {
    this._sortedFilms = this._sortComponent.getSortedFilms(this._films);
    this._filmsBoardController.render(this._sortedFilms);
  }


  render() {
    this._sortedFilms = this._films.slice();

    render(siteHeaderElement, this._userRankComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(this._siteMenuComponent.getElement(), this._filtersComponent, RenderPosition.AFTERBEGIN);
    render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(footerStatisticsElement, this._footerStatisticsComponent, RenderPosition.BEFOREEND);

    this._filmsBoardController.render(this._sortedFilms);

    this._sortComponent.setOnSortTypeChange(this._onSortTypeChange.bind(this));
  }
}
