import CommentController from "./comment-controller.js";
import CommentModel from "../models/comment-model.js";
import Comments from "../components/comments.js";
import CommentsAPI from "../api/comments-api.js";
import CommentsConnectionError from "../components/comments-connection-error.js";
import {render, RenderPosition} from "../utils/render.js";
import {shakeElement} from "../utils/common.js";


export default class CommentsController {
  constructor(container, filmID, commentsModel, commentsChangeHandler) {
    this._container = container;
    this._filmID = filmID;
    this._commentsModel = commentsModel;
    this._commentsChangeHandler = commentsChangeHandler;

    this._commentsApi = new CommentsAPI();
    this._commentsComponent = null;
    this._commentsConnectionErrorComponent = null;
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

  _commentChangeHandler(oldData, newData, commentElement) {
    if (newData === null) {
      this._commentsApi.deleteComment(oldData.id)
        .then(() => {
          this._commentsModel.removeComment(oldData.id);
          this._updateComments();
        })
        .catch(() => shakeElement(commentElement));
    } else if (oldData === null) {
      this._commentsApi.createComment(this._filmID, newData)
        .then((response) => {
          this._commentsModel.removeComments();
          this._commentsModel.setComments(response.comments);
          this._updateComments();
        })
        .catch(() => {
          shakeElement(this._commentsComponent.newCommentElement);
          this._commentsComponent.setErrorStyle();
        });
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


  _parseNewCommentData(newCommentData) {
    return new CommentModel({
      "comment": newCommentData.text ? newCommentData.text : ` `,
      "emotion": newCommentData.emoji[0].toLowerCase(),
      "date": newCommentData.dayAndTime.toISOString(),
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

        this._commentsChangeHandler(false);
      })
      .catch(() => {
        this._commentsConnectionErrorComponent = new CommentsConnectionError();
        render(this._container, this._commentsConnectionErrorComponent, RenderPosition.AFTERBEGIN);
      });
  }


  getCommentsComponent() {
    return this._commentsComponent;
  }


  getCommentsConnectionErrorComponent() {
    return this._commentsConnectionErrorComponent;
  }


  getCommentsModel() {
    return this._commentsModel;
  }


  addNewComment() {
    let newData = this._commentsComponent.getData();

    if (newData) {
      newData = this._parseNewCommentData(newData);
      //this._commentsComponent.reset();
      this._commentChangeHandler(null, newData);
    }
  }
}
