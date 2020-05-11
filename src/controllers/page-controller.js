import UserRank from "../components/user-rank.js";
import SiteMenu from "../components/site-menu.js";
import Sort from "../components/sort.js";
import FilmsBoard from "../components/films-board.js";
import FooterStatistics from "../components/footer-statistics.js";
import FilmsList from "../data-structure/films-list.js";
import FilmsListController from "./films-list-conrtoller.js";
import FilterController from "./filter-controller.js";
import {render, RenderPosition} from "../utils/render.js";
import {SortType} from "../utils/sorting.js";
import {getFilmsByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";


const ListName = {
  DEFAULT: `default`,
  TOP_RATING: `top-rating`,
  MOST_COMMENTED: `most-commented`,
};

const filmsLists = {
  [ListName.DEFAULT]: new FilmsList(`All movies. Upcoming`, SortType.DEFAULT),
  [ListName.TOP_RATING]: new FilmsList(`Top rated`, SortType.BY_RATING, true),
  [ListName.MOST_COMMENTED]: new FilmsList(`Most commented`, SortType.BY_COMMENTS_COUNT, true),
};


const siteHeaderElement = document.body.querySelector(`.header`);
const siteMainElement = document.body.querySelector(`.main`);
const siteFooterElement = document.body.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);


export default class PageController {
  constructor(filmsModel) {
    this._filmsModel = filmsModel;
    this._filmsLists = filmsLists;

    this._siteMenuComponent = new SiteMenu();
    this._userRankComponent = new UserRank(getFilmsByFilter(this._filmsModel.getFilmsAll(), FilterType.HISTORY).length);
    this._sortComponent = new Sort();
    this._filmsBoardComponent = new FilmsBoard();
    this._footerStatisticsComponent = new FooterStatistics(this._filmsModel.getFilmsAll().length);

    this._filmsListsControllers = [];
    this._filterController = null;

    this._onFilmsDataChange = this._onFilmsDataChange.bind(this);
    this._onFilmsListViewChange = this._onFilmsListViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilmsModelFilterChange = this._onFilmsModelFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHendler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilmsModelFilterChange);
  }


  _onSortTypeChange(newSortType) {
    for (const listController of this._filmsListsControllers) {
      if (listController.name === ListName.DEFAULT) {
        listController.sortType = newSortType;
        listController.render(this._filmsModel.getFilteredFilms());
        break;
      }
    }
  }


  _onFilmsModelFilterChange() {
    const newSortType = SortType.DEFAULT;
    this._sortComponent.setSortType(newSortType);
    this._sortComponent.rerender();

    this._onSortTypeChange(newSortType);
  }


  _onFilmsDataChange(id, newData) {
    const isSuccess = this._filmsModel.updateFilm(id, newData);

    if (isSuccess) {
      this._filmsListsControllers.forEach((it) => it.setDataChange(id, newData));
    }
  }


  _onFilmsListViewChange() {
    this._filmsListsControllers.forEach((it) => it.setDefaultView());
  }


  _renderFilmsBoardController() {
    const filmsBoardElement = this._filmsBoardComponent.getElement();
    filmsBoardElement.innerHTML = ``;

    const lists = Object.entries(this._filmsLists);

    if (!lists.length) {
      return;
    }

    this._filmsListsControllers = lists.map((list) => {
      const filmsListController = new FilmsListController(filmsBoardElement, /* listName, title, sortType, isExtra */list, this._onFilmsDataChange, this._onFilmsListViewChange);
      filmsListController.render(this._filmsModel.getFilmsAll());
      return filmsListController;
    });
  }


  render() {
    render(siteHeaderElement, this._userRankComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, this._siteMenuComponent, RenderPosition.BEFOREEND);
    this._filterController = new FilterController(this._siteMenuComponent.getElement(), this._filmsModel);
    this._filterController.render();

    render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(footerStatisticsElement, this._footerStatisticsComponent, RenderPosition.BEFOREEND);

    this._renderFilmsBoardController(this._filmsModel.getFilmsAll());
  }
}
