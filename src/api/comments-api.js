
import API from "./api.js";
import CommentModel from "../models/comment-model.js";


export default class CommentsAPI extends API {

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then((responce) => responce.json())
      .then(CommentModel.parseComments);
  }
}
