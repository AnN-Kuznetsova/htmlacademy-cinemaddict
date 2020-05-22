import CommentsModel from "./comments-model";

export default class FilmModel {
  constructor(data) {
    this.id = data[`id`];

    this.title = data[`film_info`][`title`];
    this.originalTitle = data[`film_info`][`alternative_title`];
    this.rating = data[`film_info`][`total_rating`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.releaseDate = new Date(data[`film_info`][`release`][`date`]);
    this.duration = data[`film_info`][`runtime`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.genre = data[`film_info`][`genre`];
    this.poster = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.age = data[`film_info`][`age_rating`];

    this.isAddToWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.isMarkAsWatched = data[`user_details`][`watching_date`] && data[`user_details`][`already_watched`] ? true : false;
    this.isFavorite = Boolean(data[`user_details`][`favorite`]);
    this.watchingDate = data[`user_details`][`watching_date`] ? new Date(data[`user_details`][`watching_date`]) : null;

    this.commentsModel = new CommentsModel(data[`comments`]);
    this.commentsCount = data[`comments`].length;

    this._setCommentsCount = this._setCommentsCount.bind(this);

    this.commentsModel.setCommentsChangeHandler(this._setCommentsCount);
  }


  toRAW() {
    return {
      "id": this.id,

      "film_info": {
        "title": this.title,
        "alternative_title": this.originalTitle,
        "total_rating": this.rating,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "release": {
          "date": this.releaseDate.toISOString(),
          "release_country": this.country,
        },
        "runtime": this.duration,
        "genre": this.genre,
        "poster": this.poster,
        "description": this.description,
        "age_rating": this.age,
      },

      "user_details": {
        "watchlist": this.isAddToWatchlist,
        "already_watched": this.isMarkAsWatched,
        "favorite": this.isFavorite,
        "watching_date": (this.isMarkAsWatched && this.watchingDate) ? this.watchingDate.toISOString() : null,
      },

      "comments": this.commentsModel.getCommentsId(),
    };
  }


  _setCommentsCount() {
    this.commentsCount = this.commentsModel.getCommentsCount();
  }


  static parseFilm(data) {
    return new FilmModel(data);
  }


  static parseFilms(data) {
    return data.map(FilmModel.parseFilm);
  }


  static clone(data) {
    return new FilmModel(data.toRAW());
  }
}
