import FilmsListExtra from "../components/films-list-extra.js";
import FilmsList from "../components/films-list.js";
import FilmsListTitle from "../components/films-list-title.js";
import FilmsListContainer from "../components/films-list-container.js";
import ShowMoreButton from "../components/show-more-button.js";
import FilmController from "./film-controller.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {SortType} from "../sorting.js";
import {arrayDataChange} from "../utils/common.js";


const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const filmsListsExtra = [
  new FilmsListExtra(`Top rated`, SortType.BY_RATING),
  new FilmsListExtra(`Most commented`, SortType.BY_COMMENTS_COUNT),
];


export default class FilmsBoardController {
  constructor(filmsBoardComponent, onFilmsChange) {
    this._filmsBoardComponent = filmsBoardComponent;
    this._onFilmsChange = onFilmsChange;

    this._filmsListComponent = new FilmsList();

    this._films = [];
    this._showingFilmControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }


  _onDataChange(oldData, newData) {
    const filmControllers = this._showingFilmControllers
      .filter((filmController) => filmController.film === oldData);

    /* const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1)); */
    const newArray = arrayDataChange(this._films, oldData, newData);
    const index = newArray.index;
    this._films = newArray.array;

    filmControllers.forEach((filmController) => filmController.render(this._films[index]));
    this._onFilmsChange(oldData, newData);
  }


  _onViewChange() {
    this._showingFilmControllers.forEach((it) => it.setDefaultView());
  }


  _renderFilms(filmsListContainerComponent, films, onDataChange, onViewChange) {
    const newFilmControllers = films.map((film) => {
      const filmController = new FilmController(filmsListContainerComponent.getElement(), onDataChange, onViewChange);

      filmController.render(film);

      return filmController;
    });

    this._showingFilmControllers = this._showingFilmControllers.concat(newFilmControllers);
  }


  /* _renderShowMoreButton(films = this._films) {
    if (films.length > SHOWING_FILMS_COUNT_ON_START) {
      const showMoreButtonComponent = new ShowMoreButton();
      render(filmsListComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);

      const onShowMoreButtonClick = () => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;
        this._renderFilms(filmsListContainerComponent, films.slice(prevFilmsCount, showingFilmsCount), this._onDataChange, this._onViewChange);

        if (showingFilmsCount >= films.length) {
          remove(showMoreButtonComponent);
        }
      };

      showMoreButtonComponent.setOnShowMoreButtonClick(onShowMoreButtonClick);
    }
  } */


  _renderFilmsList(filmsListComponent, films, isExtra = false, title = ``) { // (component, strategy)
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
  }


  render(films) {
    this._films = films;
    this._showingFilmControllers = [];

    const filmsBoardElement = this._filmsBoardComponent.getElement();
    filmsBoardElement.innerHTML = ``;
    this._filmsListComponent.getElement().innerHTML = ``;
    render(filmsBoardElement, this._filmsListComponent, RenderPosition.BEFOREEND);
    this._renderFilmsList(this._filmsListComponent, this._films);

    if (this._films.length && filmsListsExtra) {
      for (const list of filmsListsExtra) {
        const filmsExtra = list.getFilmsExtra(this._films);
        if (filmsExtra) {
          const filmsListExtraComponent = new FilmsList(true);
          render(filmsBoardElement, filmsListExtraComponent, RenderPosition.BEFOREEND);
          this._renderFilmsList(filmsListExtraComponent, filmsExtra, true, list.title);
        }
      }
    }
  }
}
