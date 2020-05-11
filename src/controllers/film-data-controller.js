import FilmCard from "../components/film-card.js";
import FilmData from "../components/film-data.js";
import {onEscPress} from "../utils/common.js";
import {render, RenderPosition, replace, removeElement} from "../utils/render.js";


export default class FilmDataController {
  constructor(container, onCloseButtonClick/* , onDataChange, onViewChange */) {
    this._container = container;
    this._onCloseButtonClick = onCloseButtonClick;
    //this._onDataChange = onDataChange;
    //this._onViewChange = onViewChange;

    this._film = null;
    this._filmDataComponent = null;
  }


  render(film) {
    /* const onAddToWatchlistButtonClick = () => {
      this._onDataChange(film.id, Object.assign({}, film, {isAddToWatchlist: !film.isAddToWatchlist}));
    };

    const onMarkAsWatchedButtonClick = () => {
      this._onDataChange(film.id, Object.assign({}, film, {isMarkAsWatched: !film.isMarkAsWatched}));
    };

    const onFavoriteButtonClick = () => {
      this._onDataChange(film.id, Object.assign({}, film, {isFavorite: !film.isFavorite}));
    };*/

    const onFilmDetailsCloseButtonClick = () => {
      this._onCloseButtonClick();
    };

    this._film = film;
    this._filmDataComponent = new FilmData(film);
    this._filmDataComponent.setOnFilmDetailsCloseButtonClick(onFilmDetailsCloseButtonClick);

    render(this._container, this._filmDataComponent, RenderPosition.AFTERBEGIN);


    /* if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    } */
  }


  getFilmSettings() {
    return this._filmDataComponent.getFilmSettings();
  }

  getFilmDataComponent() {
    return this._filmDataComponent;
  }
}
