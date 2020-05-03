import FilmCard from "../components/film-card.js";
import FilmDetails from "../components/film-details.js";
import {onEscPress} from "../utils/common.js";
import {render, RenderPosition, removeElement} from "../utils/render.js";


export default class FilmController {
  constructor(container) {
    this._container = container;

    this._film = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }


  _onEscKeyDown(evt) {
    onEscPress(evt, this._closeFilmDetailsPopup.bind(this));
  }


  _closeFilmDetailsPopup() {
    removeElement(this._openedFilmDetailsComponent);
    this._openedFilmDetailsComponent = null;
    document.removeEventListener(`keydown`, this._onDocumentEscKeyDown);
    this._onDocumentEscKeyDown = null;
  }


  _openFilmDetailsPopup(filmDetailsComponent) {
    if (this._openedFilmDetailsComponent) {
      this._closeFilmDetailsPopup();
    }
    this._openedFilmDetailsComponent = render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);
    this._onDocumentEscKeyDown = this._onEscKeyDown.bind(this);
    document.addEventListener(`keydown`, this._onDocumentEscKeyDown);
  }


  render(film) {
    const onFilmCardPosterElementClick = () => {
      openPopup();
    };

    const onFilmCardTitleElementClick = () => {
      openPopup();
    };

    const onFilmСardСommentsElementClick = () => {
      openPopup();
    };

    const onAddToWatchlistButtonClick = () => {

    };

    const onMarkAsWatchedButtonClick = () => {

    };

    const onFavoriteButtonClick = () => {

    };

    const onFilmDetailsCloseButtonClick = () => {
      this._closeFilmDetailsPopup();
    };

    const filmCardComponent = new FilmCard(film);
    filmCardComponent.setOnFilmCardPosterElementClick(onFilmCardPosterElementClick);
    filmCardComponent.setOnFilmCardTitleElementClick(onFilmCardTitleElementClick);
    filmCardComponent.setOnFilmСardСommentsElementClick(onFilmСardСommentsElementClick);
    filmCardComponent.setOnAddToWatchlistButtonClick(onAddToWatchlistButtonClick);
    filmCardComponent.setOnMarkAsWatchedButtonClick(onMarkAsWatchedButtonClick);
    filmCardComponent.setOnFavoriteButtonClick(onFavoriteButtonClick);

    const filmDetailsComponent = new FilmDetails(film);
    const openPopup = this._openFilmDetailsPopup.bind(this, filmDetailsComponent);
    filmDetailsComponent.setOnFilmDetailsCloseButtonClick(onFilmDetailsCloseButtonClick);

    render(this._container, filmCardComponent, RenderPosition.BEFOREEND);
  }
}
