import UserRank from "../components/user-rank.js";
import SiteMenu from "../components/site-menu.js";
import Filters from "../components/filters.js";
import Sort from "../components/sort.js";
import FilmsBoard from "../components/films-board.js";
import FooterStatistics from "../components/footer-statistics.js";
import FilmsBoardController from "./films-board-controller.js";
import {render, RenderPosition} from "../utils/render.js";


const bodyElement = document.querySelector(`body`);
const siteHeaderElement = bodyElement.querySelector(`.header`);
const siteMainElement = bodyElement.querySelector(`.main`);
const siteFooterElement = bodyElement.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);


export default class PageController {
  constructor(films, filmsFilters, filmsListsExtra) {
    this._films = films;
    this._filmsFilters = filmsFilters;
    this._filmsListsExtra = filmsListsExtra;

    this._siteMenuComponent = new SiteMenu();
    this._userRankComponent = new UserRank(this._filmsFilters);
    this._filtersComponent = new Filters(this._filmsFilters);
    this._sortComponent = new Sort();
    this._filmsBoardComponent = new FilmsBoard();
    this._footerStatisticsComponent = new FooterStatistics(this._films.length);
  }

  render() {
    render(siteHeaderElement, this._userRankComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(this._siteMenuComponent.getElement(), this._filtersComponent, RenderPosition.AFTERBEGIN);
    render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(footerStatisticsElement, this._footerStatisticsComponent, RenderPosition.BEFOREEND);

    const filmsBoardController = new FilmsBoardController(this._filmsBoardComponent);
    filmsBoardController.render(this._films, this._filmsListsExtra);

    const onSortTypeChange = () => {
      filmsBoardController.render(this._films, this._filmsListsExtra);
    };

    this._sortComponent.setOnSortTypeChange(onSortTypeChange);
  }
}
