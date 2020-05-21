import API, {Method} from "./index.js";
import FilmModel from "../models/film-model.js";


export default class FilmsAPI extends API {

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(FilmModel.parseFilms);
  }


  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      headers: new Headers({"Content-Type": `application/json`}),
      body: JSON.stringify(data.toRAW()),
    })
    .then((response) => response.json())
    .then(FilmModel.parseFilm);
  }
}
