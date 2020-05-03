import FilmsListExtra from "../components/films-list-extra.js";
import FilmsList from "../components/films-list.js";
import FilmsListTitle from "../components/films-list-title.js";
import FilmsListContainer from "../components/films-list-container.js";
import ShowMoreButton from "../components/show-more-button.js";
import FilmController from "./film-controller.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {SortType} from "../sorting.js";


const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const filmsListsExtra = [
  new FilmsListExtra(`Top rated`, SortType.BY_RATING),
  new FilmsListExtra(`Most commented`, SortType.BY_COMMENTS_COUNT),
];


export default class FilmsBoardController {
  constructor(filmsBoardComponent) {
    this._filmsBoardComponent = filmsBoardComponent;

    this._filmsListComponent = new FilmsList();

    this._showingFilmControllers = [];

    this._openedFilmDetailsComponent = null;
    this._onDocumentEscKeyDown = null;
  }


  _renderFilms(filmsListContainerComponent, films) {
    const newFilmControllers = films.map((film) => {
      const filmController = new FilmController(filmsListContainerComponent.getElement());

      filmController.render(film);

      return filmController;
    });

    this._showingFilmControllers = this._showingFilmControllers.concat(newFilmControllers);
  }


  _renderFilmsList(filmsListComponent, films, isExtra = false, title = ``) {
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
    this._renderFilms(filmsListContainerComponent, films.slice(0, showingFilmsCount));

    if (films.length > SHOWING_FILMS_COUNT_ON_START) {
      const showMoreButtonComponent = new ShowMoreButton();
      render(filmsListComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);

      const onShowMoreButtonClick = () => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;
        this._renderFilms(filmsListContainerComponent, films.slice(prevFilmsCount, showingFilmsCount));

        if (showingFilmsCount >= films.length) {
          remove(showMoreButtonComponent);
        }
      };

      showMoreButtonComponent.setOnShowMoreButtonClick(onShowMoreButtonClick);
    }
  }


  render(films) {
    const filmsBoardElement = this._filmsBoardComponent.getElement();
    filmsBoardElement.innerHTML = ``;
    this._filmsListComponent.getElement().innerHTML = ``;
    render(filmsBoardElement, this._filmsListComponent, RenderPosition.BEFOREEND);
    this._renderFilmsList(this._filmsListComponent, films);

    if (films.length && filmsListsExtra) {
      for (const list of filmsListsExtra) {
        const filmsExtra = list.getFilmsExtra(films);
        if (filmsExtra) {
          const filmsListExtraComponent = new FilmsList(true);
          render(filmsBoardElement, filmsListExtraComponent, RenderPosition.BEFOREEND);
          this._renderFilmsList(filmsListExtraComponent, filmsExtra, true, list.title);
        }
      }
    }
  }
}
