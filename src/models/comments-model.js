import {getIndexById} from "../utils/common.js";

export default class CommentsModel {
  constructor(commentsId) {
    this._commentsId = commentsId;

    this._comments = [];

    this._commentsChangeHandlers = [];
  }


  getCommentsId() {
    return this._commentsId;
  }


  setComments(comments) {
    this._comments = Array.from(comments);
    this._commentsId = this._comments.map((comment) => comment.id);
    this._callHandlers(this._commentsChangeHandlers);
  }


  getComments() {
    return this._comments;
  }


  getCommentsCount() {
    return this._comments.length;
  }


  removeComments() {
    this._comments = [];
  }


  removeComment(id) {
    const index = getIndexById(this._comments, id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    this._commentsId = this._commentsId.filter((commentId) => commentId !== id);
    this._callHandlers(this._commentsChangeHandlers);

    return true;
  }


  addComment(comment) {
    this._comments = [].concat(comment, this._comments);
    this._commentsId = [].concat(this._commentsId, comment.id);
    this._callHandlers(this._commentsChangeHandlers);
  }


  setCommentsChangeHandler(handler) {
    this._commentsChangeHandlers.push(handler);
  }


  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
