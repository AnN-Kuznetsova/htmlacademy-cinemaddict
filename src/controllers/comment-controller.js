import Comment from "../components/comment.js";
import {render, RenderPosition, remove} from "../utils/render.js";


export default class CommentController {
  constructor(container, commentChangeHandler) {
    this._container = container;
    this._commentChangeHandler = commentChangeHandler;

    this._comment = null;
    this._commentComponent = null;

    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
  }


  render(comment) {
    this._comment = comment;
    this._commentComponent = new Comment(this._comment);
    this._commentComponent.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    render(this._container, this._commentComponent, RenderPosition.AFTERBEGIN);
  }


  destroy() {
    remove(this._commentComponent);
  }


  _deleteButtonClickHandler() {
    this._commentComponent.setDeleteButtonTextData({
      deleteButtonText: `Deleting...`,
    });

    this._commentComponent.setDeleteButtonDisable();

    this._commentChangeHandler(this._comment, null, this._commentComponent);
  }
}
