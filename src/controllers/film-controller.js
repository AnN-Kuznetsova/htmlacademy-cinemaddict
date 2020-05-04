import FilmCard from "../components/film-card.js";
import FilmDetails from "../components/film-details.js";
import {onEscPress} from "../utils/common.js";
import {render, RenderPosition, removeElement} from "../utils/render.js";


export default class FilmController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._film = null;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }


  _onEscKeyDown(evt) {
    onEscPress(evt, this._closeFilmDetailsPopup.bind(this));
  }

  _closeFilmDetailsPopup() {
    this._filmDetailsComponent.reset();
    removeElement(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _openFilmDetailsPopup(filmDetailsComponent) {
    render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
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
      this._onDataChange(this, film, Object.assign({}, film, {isAddToWatchlist: !film.isAddToWatchlist}));
    };

    const onMarkAsWatchedButtonClick = () => {
      this._onDataChange(this, film, Object.assign({}, film, {isMarkAsWatched: !film.isMarkAsWatched}));
    };

    const onFavoriteButtonClick = () => {
      this._onDataChange(this, film, Object.assign({}, film, {isFavorite: !film.isFavorite}));
    };

    const onFilmDetailsCloseButtonClick = () => {
      this._closeFilmDetailsPopup();
    };

    this._filmCardComponent = new FilmCard(film);
    this._filmCardComponent.setOnFilmCardPosterElementClick(onFilmCardPosterElementClick);
    this._filmCardComponent.setOnFilmCardTitleElementClick(onFilmCardTitleElementClick);
    this._filmCardComponent.setOnFilmСardСommentsElementClick(onFilmСardСommentsElementClick);
    this._filmCardComponent.setOnAddToWatchlistButtonClick(onAddToWatchlistButtonClick);
    this._filmCardComponent.setOnMarkAsWatchedButtonClick(onMarkAsWatchedButtonClick);
    this._filmCardComponent.setOnFavoriteButtonClick(onFavoriteButtonClick);

    this._filmDetailsComponent = new FilmDetails(film);
    const openPopup = this._openFilmDetailsPopup.bind(this, this._filmDetailsComponent);
    this._filmDetailsComponent.setOnFilmDetailsCloseButtonClick(onFilmDetailsCloseButtonClick);
    this._filmDetailsComponent.setOnAddToWatchlistButtonClick(onAddToWatchlistButtonClick);
    this._filmDetailsComponent.setOnMarkAsWatchedButtonClick(onMarkAsWatchedButtonClick);
    this._filmDetailsComponent.setOnFavoriteButtonClick(onFavoriteButtonClick);

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }
}
