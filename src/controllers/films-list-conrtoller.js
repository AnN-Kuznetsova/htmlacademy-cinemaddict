import FilmsList from "../components/films-list.js";
import FilmsListTitle from "../components/films-list-title.js";
import FilmsListContainer from "../components/films-list-container.js";
import ShowMoreButton from "../components/show-more-button.js";
import FilmController from "./film-controller.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {FILM_CARD_EXTRA_COUNT} from "../const.js";
import {getRandomIntegerNumber} from "../utils/random.js";
import {getFieldFinder, getSortFilms} from "../sorting.js";
import {arrayDataChange} from "../utils/common.js";


const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;


export default class FilmsListController {
  constructor(container, title, sortType, isExtra, onFilmsListDataChange, onFilmsListViewChange) {
    this._container = container;
    this._listTitle = isExtra ? title : `All movies. Upcoming`;
    this._isTitleVisually = isExtra;
    this._sortType = sortType;
    this._isExtra = isExtra;
    this._onFilmsListDataChange = onFilmsListDataChange;
    this._onFilmsListViewChange = onFilmsListViewChange;

    this._listFilms = [];
    this._showingFilmControllers = [];
    this._selectionFieldFinder = getFieldFinder(this._sortType);

    this._filmsListComponent = null;
    this._filmsListContainerComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }


  _onDataChange(oldData, newData) {
    this._onFilmsListDataChange(oldData, newData);
  }

  _onViewChange() {
    this._onFilmsListViewChange();
  }


  _getTopFilms(sortedFilms, topFilms = []) {
    const filmsExtraCount = FILM_CARD_EXTRA_COUNT;
    const maxElement = this._selectionFieldFinder(sortedFilms[0]);
    const filteredFilms = sortedFilms.filter((film) => (this._selectionFieldFinder(film) === maxElement));

    if ((topFilms.length + filteredFilms.length) >= filmsExtraCount) {
      while (topFilms.length < filmsExtraCount) {
        topFilms.push(...filteredFilms.splice(getRandomIntegerNumber(filmsExtraCount - filteredFilms.length), 1));
      }
    } else {
      topFilms.splice(topFilms.length, 0, ...filteredFilms.slice());
      sortedFilms.splice(0, filteredFilms.length);
      this._getTopFilms(sortedFilms, topFilms);
    }

    return topFilms;
  }

  _getFilms(films) {
    const sortedFilms = getSortFilms(films, this._sortType);
    let listFilms = sortedFilms;

    if (this._isExtra) {
      if (listFilms.length) {
        listFilms = this._getTopFilms(sortedFilms);
      }

      if (listFilms.length === 0 || this._selectionFieldFinder(listFilms[0]) === 0) {
        return 0;
      }
    }

    return listFilms;
  }


  _renderFilms(films, onDataChange, onViewChange) {
    const newFilmControllers = films.map((film) => {
      const filmController = new FilmController(this._filmsListContainerComponent.getElement(), onDataChange, onViewChange);

      filmController.render(film);

      return filmController;
    });

    this._showingFilmControllers = this._showingFilmControllers.concat(newFilmControllers);
  }


  _renderFilmsList() { // (component, strategy)
    const filmsListElement = this._filmsListComponent.getElement();

    if (!this._listFilms.length) {
      render(filmsListElement, new FilmsListTitle(`There are no movies in our database`), RenderPosition.AFTERBEGIN);
      return;
    }

    const filmsListTitleComponent = new FilmsListTitle(this._listTitle, this._isTitleVisually);
    render(filmsListElement, filmsListTitleComponent, RenderPosition.AFTERBEGIN);

    this._filmsListContainerComponent = new FilmsListContainer();
    render(filmsListElement, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._renderFilms(this._listFilms.slice(0, showingFilmsCount), this._onDataChange, this._onViewChange); // sort here

  /*  if (films.length > SHOWING_FILMS_COUNT_ON_START) {
      const showMoreButtonComponent = new ShowMoreButton();
      render(filmsListElement, showMoreButtonComponent, RenderPosition.BEFOREEND);

      const onShowMoreButtonClick = () => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;
        this._renderFilms(filmsListContainerComponent, films.slice(prevFilmsCount, showingFilmsCount), this._onDataChange, this._onViewChange); // sort here

        if (showingFilmsCount >= films.length) {
          remove(showMoreButtonComponent);
        }
      };

      showMoreButtonComponent.setOnShowMoreButtonClick(onShowMoreButtonClick);
    } */
  }


  render(films) {
    this._listFilms = this._getFilms(films);

    if (!(this._isExtra && !this._listFilms)) {
      this._filmsListComponent = new FilmsList(this._isExtra);
      render(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);
      this._renderFilmsList();
    }
  }


  setDataChange(oldData, newData) {
    const newArray = arrayDataChange(this._listFilms, oldData, newData);
    const index = newArray.index;
    this._listFilms = newArray.array;

    if (index === -1) {
      return;
    }

    for (const filmController of this._showingFilmControllers) {
      if (filmController.film === oldData) {
        filmController.render(this._listFilms[index]);
      }
    }
  }


  setDefaultView() {
    this._showingFilmControllers.forEach((it) => it.setDefaultView());
  }
}
