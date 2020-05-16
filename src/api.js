import FilmModel from "./models/film-model";


const AUTHORIZATION = `Basic dBK351hdk=dfMNf0fjk6`;


export default class API {
  constructor() {
    this._authorization = AUTHORIZATION;
  }


  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((responce) => responce.json())
      .then(FilmModel.parseFilms);
  }


  getComments(filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`, {headers})
      .then((responce) => {
        const comments = responce.json();
        window.console.log(comments[0]);
        return comments;
      });
      //.then(FilmModel.parseFilms);
  }
}
