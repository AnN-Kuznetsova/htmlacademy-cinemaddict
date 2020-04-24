import {FilmsList} from "../components/films-list.js";
import {FilmsListTitle} from "../components/films-list-title.js";
import {FilmsListContainer} from "../components/films-list-container.js";
import {FilmCard} from "../components/film-card.js";
import {ShowMoreButton} from "../components/show-more-button.js";
import {FilmDetails} from "../components/film-details.js";
import {onEscPress} from "../utils/common.js";
import {render, RenderPosition, removeElement, remove} from "../utils/render.js";


const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const bodyElement = document.querySelector(`body`);


let openFilmDetailsComponent = null;

const onEscKeyDown = (evt) => {
  onEscPress(evt, closeFilmDetailsPopup);
};

const closeFilmDetailsPopup = () => {
  removeElement(openFilmDetailsComponent);
  openFilmDetailsComponent = null;
  document.removeEventListener(`keydown`, onEscKeyDown);
};


export class PageController {
  constructor(filmsBoardComponent) {
    this._filmsBoardComponent = filmsBoardComponent;

    this._filmsListComponent = new FilmsList();
  }


  _renderFilm(filmsListContainerComponent, film) {
    const openFilmDetails = () => {
      if (openFilmDetailsComponent) {
        closeFilmDetailsPopup();
      }
      openFilmDetailsComponent = render(bodyElement, filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onFilmCardPosterElementClick = () => {
      openFilmDetails();
    };

    const onFilmCardTitleElementClick = () => {
      openFilmDetails();
    };

    const onFilmСardСommentsElementClick = () => {
      openFilmDetails();
    };

    const onFilmDetailsCloseButtonClick = () => {
      closeFilmDetailsPopup();
    };

    const filmCardComponent = new FilmCard(film);
    filmCardComponent.setOnFilmCardPosterElementClick(onFilmCardPosterElementClick);
    filmCardComponent.setOnFilmCardTitleElementClick(onFilmCardTitleElementClick);
    filmCardComponent.setOnFilmСardСommentsElementClick(onFilmСardСommentsElementClick);

    const filmDetailsComponent = new FilmDetails(film);
    filmDetailsComponent.setOnFilmDetailsCloseButtonClick(onFilmDetailsCloseButtonClick);

    render(filmsListContainerComponent.getElement(), filmCardComponent, RenderPosition.BEFOREEND);
  }


  _renderFilms(filmsListContainerComponent, films) {
    films.forEach((film) => {
      this._renderFilm(filmsListContainerComponent, film);
    });
  }


  _renderFilmsList(filmsListComponent, films, isExtra = false, title = ``) {
    if (films.length === 0) {
      render(filmsListComponent.getElement(), new FilmsListTitle(`There are no movies in our database`), RenderPosition.AFTERBEGIN);
      return;
    }

    const listTitle = isExtra ? title : `All movies. Upcoming`;
    const isVisually = isExtra ? true : false;
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


  render(films, filmsListsExtra) {
    const filmsBoardElement = this._filmsBoardComponent.getElement();
    render(filmsBoardElement, this._filmsListComponent, RenderPosition.BEFOREEND);
    this._renderFilmsList(this._filmsListComponent, films);

    if (filmsListsExtra.length > 0) {
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
