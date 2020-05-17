import CommentsAPI from "../api/comments-api.js";
import Comments from "../components/comments.js";
import CommentController from "./comment-controller.js";
import {render, RenderPosition} from "../utils/render.js";

export default class CommentsController {
  constructor(container, filmID, commentsModel, commentsChangeHandler) {
    this._container = container;
    this._filmID = filmID;
    this._commentsModel = commentsModel;

    this._commentsComponent = null;
    this._commentControllers = [];
    this._commentsApi = new CommentsAPI();

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

  _commentChangeHandler(oldData, newData) {
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
    this._commentsApi.getComments(this._filmID)
      .then((commentsResponse) => {
        this._commentsModel.setComments(commentsResponse);

        const comments = this._commentsModel.getComments();
        const commentsCount = comments.length;
        this._commentsComponent = new Comments(commentsCount, this._renderComments);
        render(this._container, this._commentsComponent, RenderPosition.AFTERBEGIN);

        this._renderComments(comments);
      });
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
      this._commentChangeHandler(null, data);
    }
  }
}
