import FilmModel from "./models/film-model.js";
import CommentModel from "./models/comment-model.js";


const AUTHORIZATION = `Basic dBK351hdk=dfMNf0fjk6`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;


const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};


export default class API {
  constructor() {
    this._endPoint = END_POINT;
    this._authorization = AUTHORIZATION;
  }


  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }


  _load({url, method = Method.GET, headers = new Headers(), body = null}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, headers, body})
      .then(this._checkStatus)
      .catch((error) => {
        throw error;
      });
  }


  getFilms() {
    return this._load({url: `movies`})
      .then((responce) => responce.json())
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


  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then((responce) => responce.json())
      .then(CommentModel.parseComments);
  }
}
