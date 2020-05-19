import FilmData from "../components/film-data.js";
import {render, RenderPosition} from "../utils/render.js";


export default class FilmDataController {
  constructor(container, closeButtonClickHandler) {
    this._container = container;
    this._closeButtonClickHandler = closeButtonClickHandler;

    this._film = null;
    this._filmDataComponent = null;
  }


  render(film) {
    const filmDetailsCloseButtonClickHandler = () => {
      this._closeButtonClickHandler();
    };

    this._film = film;
    this._filmDataComponent = new FilmData(film);
    this._filmDataComponent.setFilmDetailsCloseButtonClickHandler(filmDetailsCloseButtonClickHandler);

    render(this._container, this._filmDataComponent, RenderPosition.AFTERBEGIN);
  }


  getFilmSettings() {
    return this._filmDataComponent.getFilmSettings();
  }

  getFilmDataComponent() {
    return this._filmDataComponent;
  }
}
