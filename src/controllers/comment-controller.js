import Comment from "../components/comment.js";
import {render, RenderPosition} from "../utils/render.js";


export default class CommentController {
  constructor(container, commentChangeHandler) {
    this._container = container;
    this._commentChangeHandler = commentChangeHandler;

    this._comment = null;
    this._commentComponent = null;

    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
  }


  _deleteButtonClickHandler() {
    this._commentChangeHandler(this, this._comment, null);
  }


  render(comment) {
    this._comment = comment;
    this._commentComponent = new Comment(this._comment);
    this._commentComponent.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    render(this._container, this._commentComponent, RenderPosition.AFTERBEGIN);
  }
}
