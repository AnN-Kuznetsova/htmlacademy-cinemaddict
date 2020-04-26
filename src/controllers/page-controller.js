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
  }

  render() {
    const siteMenuComponent = new SiteMenu();
    render(siteHeaderElement, new UserRank(this._filmsFilters), RenderPosition.BEFOREEND);
    render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);
    render(siteMenuComponent.getElement(), new Filters(this._filmsFilters), RenderPosition.AFTERBEGIN);
    render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);
    render(footerStatisticsElement, new FooterStatistics(this._films.length), RenderPosition.BEFOREEND);

    const filmsBoardComponent = new FilmsBoard();
    const filmsBoardController = new FilmsBoardController(filmsBoardComponent);

    render(siteMainElement, filmsBoardComponent, RenderPosition.BEFOREEND);
    filmsBoardController.render(this._films, this._filmsListsExtra);
  }
}
