import AbstractComponent from "./abstract-component.js";
import Genres from "./genres.js";
import Comments from "./comments.js";
import {formatDateToString} from "../utils/common.js";

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    const {title, originalTitle, rating, director, writers, actors, releaseDate, duration, country, genre, poster, description, age, isAddToWatchlist, isMarkAsWatched, isFavorite, comments} = this._film;

    const releaseDateFormat = formatDateToString(releaseDate);

    const addToWatchlistButtonIsActive = isAddToWatchlist ? `checked` : ``;
    const markAsWatchedButtonIsActive = isMarkAsWatched ? `checked` : ``;
    const favoriteButtonIsActive = isFavorite ? `checked` : ``;

    const genreMarkup = new Genres(genre).getTemplate();
    const commentsMarkup = new Comments(comments).getTemplate();

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
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${addToWatchlistButtonIsActive}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${markAsWatchedButtonIsActive}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteButtonIsActive}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>

          <div class="form-details__bottom-container">
            ${commentsMarkup}
          </div>
        </form>
      </section>`
    );
  }

  setOnFilmDetailsCloseButtonClick(cb) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, cb);
  }
}
