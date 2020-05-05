// import FilmsListExtra from "../components/films-list-extra.js";
import FilmsListController from "./films-list-conrtoller.js";



import {SortType} from "../sorting.js";



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

    //this._filmsListComponent = new FilmsList();

    this._films = [];
    this._filmsListsControllers = [];
    //this._showingFilmControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilmsListViewChange = this._onFilmsListViewChange.bind(this);
  }


  _onDataChange(oldData, newData) {
    /* let showingFilmsControllers = [];
    this._filmsListsControllers.forEach((listsController) => {
      showingFilmsControllers = showingFilmsControllers.concat(...listsController.showingFilmControllers);
    }); */
    window.console.log(`gowing to  FilmsBoardController`);


    /* const filmControllers = this._showingFilmControllers
      .filter((filmController) => filmController.film === oldData);

    const newArray = arrayDataChange(this._films, oldData, newData);
    const index = newArray.index;
    this._films = newArray.array;

    filmControllers.forEach((filmController) => filmController.render(this._films[index]));
    this._onFilmsChange(oldData, newData); */
  }


  _onFilmsListViewChange() {
    this._filmsListsControllers.forEach((it) => it.setDefaultView());
  }


 /*  _renderFilms(filmsListContainerComponent, films, onDataChange, onViewChange) {
    const newFilmControllers = films.map((film) => {
      const filmController = new FilmController(filmsListContainerComponent.getElement(), onDataChange, onViewChange);

      filmController.render(film);

      return filmController;
    });

    this._showingFilmControllers = this._showingFilmControllers.concat(newFilmControllers);
  } */


  /* _renderFilmsList(filmsListComponent, films, isExtra = false, title = ``) { // (component, strategy)
    if (!films.length) {
      render(filmsListComponent.getElement(), new FilmsListTitle(`There are no movies in our database`), RenderPosition.AFTERBEGIN);
      return;
    }

    const listTitle = isExtra ? title : `All movies. Upcoming`;
    const isVisually = isExtra;
    const filmsListTitleComponent = new FilmsListTitle(listTitle, isVisually);
    render(filmsListComponent.getElement(), filmsListTitleComponent, RenderPosition.AFTERBEGIN);

    const filmsListContainerComponent = new FilmsListContainer();
    render(filmsListComponent.getElement(), filmsListContainerComponent, RenderPosition.BEFOREEND);

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._renderFilms(filmsListContainerComponent, films.slice(0, showingFilmsCount), this._onDataChange, this._onViewChange); // sort here

    if (films.length > SHOWING_FILMS_COUNT_ON_START) {
      const showMoreButtonComponent = new ShowMoreButton();
      render(filmsListComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);

      const onShowMoreButtonClick = () => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;
        this._renderFilms(filmsListContainerComponent, films.slice(prevFilmsCount, showingFilmsCount), this._onDataChange, this._onViewChange); // sort here

        if (showingFilmsCount >= films.length) {
          remove(showMoreButtonComponent);
        }
      };

      showMoreButtonComponent.setOnShowMoreButtonClick(onShowMoreButtonClick);
    }
  } */


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
      const filmsListController = new FilmsListController(filmsBoardElement, title, sortType, isExtra, this._onDataChange, this._onFilmsListViewChange);

      filmsListController.render(this._films);

      return filmsListController;
    });
  }
}
