import Comments from "../components/comments.js";
import CommentController from "./comment-controller.js";
import {render, RenderPosition} from "../utils/render.js";

export default class CommentsController {
  constructor(container, commentsModel, commentsChangeHandler) {
    this._container = container;
    this._commentsModel = commentsModel;

    this._commentsComponent = null;
    this._commentControllers = [];

    this._commentChangeHandler = this._commentChangeHandler.bind(this);
    this._renderComments = this._renderComments.bind(this);

    this._commentsModel.setCommentsChangeHandler(commentsChangeHandler);
  }


  _removeComments() {
    this._commentControllers.forEach((commentController) => commentController.destroy());
    this._commentControllers = [];
  }

  _updateComments() {
    this._removeComments();
    this._commentsComponent.rerender(this._commentsModel.getComments().length);
  }

  _commentChangeHandler(commentController, oldData, newData) {
    if (newData === null) {
      this._commentsModel.removeComment(oldData.id);
      this._updateComments();
    } else if (oldData === null) {
      this._commentsModel.addComment(newData);
      this._updateComments();
    }
  }


  _renderComments(comments = this._commentsModel.getComments()) {
    const commentsListElement = this._commentsComponent.getElement()
      .querySelector(`.film-details__comments-list`);
    this._commentControllers = comments.map((comment) => {
      const commentController = new CommentController(commentsListElement, this._commentChangeHandler);

      commentController.render(comment);

      return commentController;
    });
  }


  render() {
    const comments = this._commentsModel.getComments();
    const commentsCount = comments.length;
    this._commentsComponent = new Comments(commentsCount, this._renderComments);
    render(this._container, this._commentsComponent, RenderPosition.AFTERBEGIN);

    this._renderComments(comments);
  }


  getCommentsComponent() {
    return this._commentsComponent;
  }


  getCommentsModel() {
    return this._commentsModel;
  }


  addNewComment() {
    const data = this._commentsComponent.getData();

    if (data) {
      this._commentsComponent.reset();
      this._commentChangeHandler(this, null, data);
    }
  }
}
