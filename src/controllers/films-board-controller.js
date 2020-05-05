// import FilmsListExtra from "../components/films-list-extra.js";
import FilmsListController from "./films-list-conrtoller.js";



import {SortType} from "../sorting.js";
import {arrayDataChange} from "../utils/common.js";


/* const filmsListsControllers = [
  new FilmsListController(``, SortType.DEFAULT),
  new FilmsListController(`Top rated`, SortType.BY_RATING, true),
  new FilmsListController(`Most commented`, SortType.BY_COMMENTS_COUNT, true),
]; */
/* const filmsLists = [
  [`Default`, SortType.DEFAULT],
  [`Top rated`, SortType.BY_RATING, true],
  [`Most commented`, SortType.BY_COMMENTS_COUNT, true],
]; */
const Mode = {
  DEFAULT: `default`,
  EXTRA: `extra`,
};

class List {
  constructor(title, sortType, mode) {
    this.title = title;
    this.sortType = sortType;
    this.isExtra = (mode === Mode.EXTRA);
  }
}

const filmsLists = [
  new List(`Default`, SortType.DEFAULT, Mode.DEFAULT),
  new List(`Top rated`, SortType.BY_RATING, Mode.EXTRA),
  new List(`Most commented`, SortType.BY_COMMENTS_COUNT, Mode.EXTRA),
];


export default class FilmsBoardController {
  constructor(filmsBoardComponent, onFilmsChange) {
    this._filmsBoardComponent = filmsBoardComponent;
    //this._onFilmsChange = onFilmsChange;

    this._films = [];
    this._filmsListsControllers = [];

    this._onFilmsListDataChange = this._onFilmsListDataChange.bind(this);
    this._onFilmsListViewChange = this._onFilmsListViewChange.bind(this);
  }


  _onFilmsListDataChange(oldData, newData) {
    const newArray = arrayDataChange(this._films, oldData, newData);
    this._films = newArray.array;

    this._filmsListsControllers.forEach((it) => it.setDataChange(oldData, newData));

    //this._onFilmsChange(oldData, newData);
  }


  _onFilmsListViewChange() {
    this._filmsListsControllers.forEach((it) => it.setDefaultView());
  }


  render(films) {
    this._films = films;
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
}
