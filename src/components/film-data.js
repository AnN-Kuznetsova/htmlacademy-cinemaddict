import abstractComponent from "./abstract-component.js";
import Genres from "./genres.js";
import {formatDurationTime, formatDate} from "../utils/common.js";
import {DateTimeFormat} from "../const.js";


export default class FilmData extends abstractComponent {
  constructor(film) {
    super();

    this._film = film;

    this._filmSettings = {
      isAddToWatchlist: film.isAddToWatchlist,
      isMarkAsWatched: film.isMarkAsWatched,
      isFavorite: film.isFavorite,
    };

    //this._closeButtonClickCallback = null;

    this._subscribeOnEvents();
  }


  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`#watchlist`)
      .addEventListener(`click`, () => {
        this._filmSettings.isAddToWatchlist = !this._filmSettings.isAddToWatchlist;
      });

    element.querySelector(`#watched`)
      .addEventListener(`click`, () => {
        this._filmSettings.isMarkAsWatched = !this._filmSettings.isMarkAsWatched;
      });

    element.querySelector(`#favorite`)
      .addEventListener(`click`, () => {
        this._filmSettings.isFavorite = !this._filmSettings.isFavorite;
      });
  }


  _createButtonMarkup(name, value, isActive = true) {
    return (
      `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${isActive ? `checked` : ``}>
      <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${value}</label>`
    );
  }


  getTemplate() {
    const {title, originalTitle, rating, director, writers, actors, releaseDate, duration, country, genre, poster, description, age, comments} = this._film;
    const {isAddToWatchlist, isMarkAsWatched, isFavorite} = this._filmSettings;

    const releaseDateFormat = formatDate(releaseDate, DateTimeFormat.DATE_FULL);
    const durationFormat = formatDurationTime(duration);

    const addToWatchlistButton = this._createButtonMarkup(`watchlist`, `Add to watchlist`, isAddToWatchlist);
    const markAsWatchedButton = this._createButtonMarkup(`watched`, `Already watched`, isMarkAsWatched);
    const favoriteButton = this._createButtonMarkup(`favorite`, `Add to favorites`, isFavorite);

    const genreMarkup = new Genres(genre).getTemplate();

    return (
      `<div>
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
            <p class="film-details__age">${age}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${originalTitle}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDateFormat}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${durationFormat}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genre${(genre.length > 1) ? `s` : ``}</td>
                <td class="film-details__cell">
                  ${genreMarkup}
              </tr>
            </table>
            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          ${addToWatchlistButton}
          ${markAsWatchedButton}
          ${favoriteButton}
        </section>
      </div>`
    );
  }


  getFilmSettings() {
    return this._filmSettings;
  }


  setOnFilmDetailsCloseButtonClick(cb) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, cb);

    //this._closeButtonClickCallback = cb;
  }
}
