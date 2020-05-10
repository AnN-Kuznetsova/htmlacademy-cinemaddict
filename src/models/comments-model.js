import {arrayDataChange} from "../utils/common.js";

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

  setCommentsChangeHandler(handler) {
    this._commentsChangeHandlers.push(handler);
  }

}
