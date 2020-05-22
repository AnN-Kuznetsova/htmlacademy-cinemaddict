
import API, {Method} from "./index.js";
import CommentModel from "../models/comment-model.js";
import FilmModel from "../models/film-model.js";


export default class CommentsAPI extends API {

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then((response) => response.json())
      .then(CommentModel.parseComments);
  }


  createComment(filmId, comment) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      headers: new Headers({"Content-Type": `application/json`}),
      body: JSON.stringify(comment.toRAW()),
    })
      .then((response) => response.json())
      .then((response) => {
        return {
          film: FilmModel.parseFilm(response.movie),
          comments: CommentModel.parseComments(response.comments),
        };
      });
  }


  deleteComment(id) {
    return this._load({url: `comments/${id}`, method: Method.DELETE});
  }
}
