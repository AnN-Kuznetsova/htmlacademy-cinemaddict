import {AbstractComponent} from "./abstract-component.js";
import {MAX_DESCRIPTION_LENGTH} from "../const.js";

export class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    const {title, rating, releaseDate, duration, genre, poster, description, isAddToWatchlist, isMarkAsWatched, isFavorite, commentsCount} = this._film;

    const releaseYear = releaseDate.getFullYear();

    const addToWatchlistButtonActiveClass = isAddToWatchlist ? `film-card__controls-item--active` : ``;
    const markAsWatchedButtonActiveClass = isMarkAsWatched ? `film-card__controls-item--active` : ``;
    const favoriteButtonActiveClass = isFavorite ? `film-card__controls-item--active` : ``;

    let descriptionText = description;
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      descriptionText = description.slice(0, (MAX_DESCRIPTION_LENGTH - 1)) + `...`;
    }

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseYear}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${descriptionText}</p>
        <a class="film-card__comments">${commentsCount} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addToWatchlistButtonActiveClass}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${markAsWatchedButtonActiveClass}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteButtonActiveClass}">Mark as favorite</button>
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
}
