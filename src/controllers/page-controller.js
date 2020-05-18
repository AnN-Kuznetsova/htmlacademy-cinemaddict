import FilmsBoard from "../components/films-board.js";
import FilmsList from "../data-structure/films-list.js";
import FilmsListController from "./films-list-conrtoller.js";
import FilterController from "./filter-controller.js";
import FooterStatistics from "../components/footer-statistics.js";
import Loading from "../components/loading.js";
import SiteMenu from "../components/site-menu.js";
import Sort from "../components/sort.js";
import UserRank from "../components/user-rank.js";
import {FilterType} from "../const.js";
import {SortType} from "../utils/sorting.js";
import {getFilmsByFilter} from "../utils/filter.js";
import {render, remove, RenderPosition} from "../utils/render.js";


const ListName = {
  DEFAULT: `default`,
  TOP_RATING: `top-rating`,
  MOST_COMMENTED: `most-commented`,
};


const filmsLists = {
  default: new FilmsList(ListName.DEFAULT, `All movies. Upcoming`, SortType.DEFAULT),
  topRating: new FilmsList(ListName.TOP_RATING, `Top rated`, SortType.BY_RATING, true),
  mostCommented: new FilmsList(ListName.MOST_COMMENTED, `Most commented`, SortType.BY_COMMENTS_COUNT, true),
};

const siteHeaderElement = document.body.querySelector(`.header`);
const siteMainElement = document.body.querySelector(`.main`);
const siteFooterElement = document.body.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);


export default class PageController {
  constructor(filmsModel, filmsApi) {
    this._filmsModel = filmsModel;
    this._filmsApi = filmsApi;
    this._filmsLists = filmsLists;

    this._siteMenuComponent = new SiteMenu();
    this._userRankComponent = null;
    this._sortComponent = new Sort();
    this._filmsBoardComponent = new FilmsBoard();
    this._footerStatisticsComponent = null;
    this._loadingComponent = new Loading();

    this._filmsListsControllers = [];
    this._filterController = null;

    this._onFilmsDataChange = this._onFilmsDataChange.bind(this);
    this._onFilmsListViewChange = this._onFilmsListViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilmsModelFilterChange = this._onFilmsModelFilterChange.bind(this);
    this._commentsModelChangePageHandler = this._commentsModelChangePageHandler.bind(this);

    this._sortComponent.setSortTypeChangeHendler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilmsModelFilterChange);
  }


  _commentsModelChangePageHandler(id, filmModel) {
    for (const listController of this._filmsListsControllers) {
      if (listController.name === ListName.MOST_COMMENTED) {
        listController.render(this._filmsModel.getFilmsAll());
      } else {
        listController.setDataChange(id, filmModel);
      }
    }
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
    this._filmsApi.updateFilm(id, newData)
      .then((filmModel) => {
        const isSuccess = this._filmsModel.updateFilm(id, filmModel);

        if (isSuccess) {
          this._filmsListsControllers.forEach((filmsListsController) => filmsListsController.setDataChange(id, filmModel));
        }

        return isSuccess;
      });
  }


  _onFilmsListViewChange() {
    this._filmsListsControllers.forEach((filmsListsController) => filmsListsController.setDefaultView());
  }


  _renderFilmsBoardController(films) {
    const filmsBoardElement = this._filmsBoardComponent.getElement();
    filmsBoardElement.innerHTML = ``;

    const lists = Object.entries(this._filmsLists);

    if (!lists.length) {
      return;
    }

    this._filmsListsControllers = lists.map((list) => {
      const filmsListController = new FilmsListController(filmsBoardElement, list[1],
          this._onFilmsDataChange, this._onFilmsListViewChange, this._commentsModelChangePageHandler);
      filmsListController.render(films);
      return filmsListController;
    });
  }


  render() {
    render(siteMainElement, this._siteMenuComponent, RenderPosition.BEFOREEND);
    this._filterController = new FilterController(this._siteMenuComponent.getElement(), this._filmsModel);
    this._filterController.render();

    render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(siteMainElement, this._filmsBoardComponent, RenderPosition.BEFOREEND);
    render(this._filmsBoardComponent.getElement(), this._loadingComponent, RenderPosition.AFTERBEGIN);
  }


  rerender() {
    remove(this._loadingComponent);

    this._userRankComponent = new UserRank(getFilmsByFilter(this._filmsModel.getFilmsAll(), FilterType.HISTORY).length);
    this._footerStatisticsComponent = new FooterStatistics(this._filmsModel.getFilmsAll().length);

    render(siteHeaderElement, this._userRankComponent, RenderPosition.BEFOREEND);
    render(footerStatisticsElement, this._footerStatisticsComponent, RenderPosition.BEFOREEND);

    this._renderFilmsBoardController(this._filmsModel.getFilmsAll());
  }
}
