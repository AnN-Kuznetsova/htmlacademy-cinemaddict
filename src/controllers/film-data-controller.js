import FilmData from "../components/film-data.js";
import {render, RenderPosition} from "../utils/render.js";


export default class FilmDataController {
  constructor(container, onCloseButtonClick/* , onDataChange */) {
    this._container = container;
    this._onCloseButtonClick = onCloseButtonClick;
    //this._onDataChange = onDataChange;

    this._film = null;
    this._filmDataComponent = null;
  }


  render(film) {
    const onFilmDetailsCloseButtonClick = () => {
      this._onCloseButtonClick();
    };

    this._film = film;
    this._filmDataComponent = new FilmData(film);
    this._filmDataComponent.setOnFilmDetailsCloseButtonClick(onFilmDetailsCloseButtonClick);

    render(this._container, this._filmDataComponent, RenderPosition.AFTERBEGIN);
  }


  getFilmSettings() {
    return this._filmDataComponent.getFilmSettings();
  }

  getFilmDataComponent() {
    return this._filmDataComponent;
  }
}
