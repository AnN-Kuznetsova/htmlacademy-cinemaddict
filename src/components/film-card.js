import AbstractComponent from "./abstract-component.js";
import {MAX_DESCRIPTION_LENGTH, DateTimeFormat} from "../const.js";
import {formatDurationTime, formatDate} from "../utils/common.js";


export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }


  _createButtonMarkup(name, value, isActive = true) {
    return (
      `<button
        type="button"
        class="film-card__controls-item button film-card__controls-item--${name} ${isActive ? `film-card__controls-item--active` : ``}"
        >
        ${value}
      </button>`
    );
  }


  getTemplate() {
    const {title, rating, releaseDate, duration, genre, poster, description, isAddToWatchlist, isMarkAsWatched, isFavorite, commentsCount} = this._film;

    const releaseDateFormat = formatDate(releaseDate, DateTimeFormat.DATE_SHORT);
    const durationFormat = formatDurationTime(duration);

    const addToWatchlistButton = this._createButtonMarkup(`add-to-watchlist`, `Add to watchlist`, isAddToWatchlist);
    const markAsWatchedButton = this._createButtonMarkup(`mark-as-watched`, `Mark as watched`, isMarkAsWatched);
    const favoriteButton = this._createButtonMarkup(`favorite`, `Mark as favorite`, isFavorite);

    let descriptionText = description;
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      descriptionText = description.slice(0, (MAX_DESCRIPTION_LENGTH - 1)) + `...`;
    }

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDateFormat}</span>
          <span class="film-card__duration">${durationFormat}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${descriptionText}</p>
        <a class="film-card__comments">${commentsCount} comments</a>
        <form class="film-card__controls">
          ${addToWatchlistButton}
          ${markAsWatchedButton}
          ${favoriteButton}
        </form>
      </article>`
    );
  }


  setOnFilmCardPosterElementClick(cb) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, cb);
  }

  setOnFilmCardTitleElementClick(cb) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, cb);
  }

  setOnFilmСardСommentsElementClick(cb) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, cb);
  }

  setOnAddToWatchlistButtonClick(cb) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, cb);
  }

  setOnMarkAsWatchedButtonClick(cb) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, cb);
  }

  setOnFavoriteButtonClick(cb) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, cb);
  }
}
