import {getIndexById} from "../utils/common.js";

export default class CommentsModel {
  constructor() {
    this._comments = [];

    this._commentsChangeHandlers = [];
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
    this._callHandlers(this._commentsChangeHandlers);
  }

  removeComment(id) {
    const index = getIndexById(this._comments, id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    this._callHandlers(this._commentsChangeHandlers);

    return true;
  }

  setCommentsChangeHandler(handler) {
    this._commentsChangeHandlers.push(handler);
  }

}
