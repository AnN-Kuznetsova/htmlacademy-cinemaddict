import AbstractSmartComponent from "./abstract-smart-component.js";
import Genres from "./genres.js";
import Comments from "./comments.js";
import {formatDateToString} from "../utils/common.js";
import {EMOJIS} from "../const.js";


export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;

    this._newComment = {
      emojiTitle: null,
      emojiUrl: null,
      text: null,
    };

    this._subscribeOnEvents();
  }


  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        /* this._newComment.emojiTitle = evt.target.value;
        this._newComment.emojiUrl = EMOJIS[this._newComment.emojiTitle]; */

        this.rerender();
      });
  }


  _createButtonMarkup(name, value, isActive = true) {
    return (
      `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${isActive ? `checked` : ``}>
      <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${value}</label>`
    );
  }


  getTemplate() {
    const {title, originalTitle, rating, director, writers, actors, releaseDate, duration, country, genre, poster, description, age, isAddToWatchlist, isMarkAsWatched, isFavorite, comments} = this._film;

    const releaseDateFormat = formatDateToString(releaseDate);

    const addToWatchlistButton = this._createButtonMarkup(`watchlist`, `Add to watchlist`, isAddToWatchlist);
    const markAsWatchedButton = this._createButtonMarkup(`watched`, `Already watched`, isMarkAsWatched);
    const favoriteButton = this._createButtonMarkup(`favorite`, `Add to favorites`, isFavorite);

    const genreMarkup = new Genres(genre).getTemplate();
    const commentsMarkup = new Comments(comments, this._newComment).getTemplate();

    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
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
                    <td class="film-details__cell">${duration}</td>
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
          </div>

          <div class="form-details__bottom-container">
            ${commentsMarkup}
          </div>
        </form>
      </section>`
    );
  }


  recoveryListeners() {
    this._subscribeOnEvents();
  }


  setOnFilmDetailsCloseButtonClick(cb) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, cb);
  }

  setOnAddToWatchlistButtonClick(cb) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, cb);
  }

  setOnMarkAsWatchedButtonClick(cb) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, cb);
  }

  setOnFavoriteButtonClick(cb) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, cb);
  }
}
