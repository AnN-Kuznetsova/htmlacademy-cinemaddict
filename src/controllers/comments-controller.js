import CommentController from "./comment-controller.js";
import CommentModel from "../models/comment-model.js";
import Comments from "../components/comments.js";
import CommentsAPI from "../api/comments-api.js";
import CommentsConnectionError from "../components/comments-connection-error.js";
import {SHAKE_ANIMATION_TIMEOUT} from "../const.js";
import {addCommentKeysPressHandler} from "../utils/key-events.js";
import {disableForm, setСustomTimeOut, setDisabledStyle, shakeElement} from "../utils/common.js";
import {render, RenderPosition} from "../utils/render.js";


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
    this._documentKeyDownHendler = this._documentKeyDownHendler.bind(this);
    this._addNewComment = this._addNewComment.bind(this);

    this._commentsModel.setCommentsChangeHandler(commentsChangeHandler);
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
        this._addListeners();

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


  removeListeners() {
    document.removeEventListener(`keydown`, this._documentKeyDownHendler);
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
      "emotion": newCommentData.emoji.name,
      "date": newCommentData.dayAndTime.toISOString(),
    });
  }


  _removeComments() {
    this._commentControllers.forEach((commentController) => commentController.destroy());
    this._commentControllers = [];
  }


  _updateComments() {
    this._removeComments();
    this._commentsComponent.rerender(this._commentsModel.getComments().length);
  }


  _addNewComment() {
    let newData = this._commentsComponent.getData();

    if (newData) {
      disableForm(this._commentsComponent.newCommentFormElements);
      setDisabledStyle(this._commentsComponent.newCommentFormElements);
      this.removeListeners();
      newData = this._parseNewCommentData(newData);
      this._commentChangeHandler(null, newData);
    }
  }


  _setCreateCommentErrorStyle(value = true) {
    this._commentsComponent.setErrorStyle(value);
    shakeElement(this._commentsComponent.newCommentElement, value);
  }


  _commentСreationHandler(comments, isCreated = true) {
    if (isCreated) {
      this._commentsModel.removeComments();
      this._commentsModel.setComments(comments);
      this._commentsComponent.reset();
      this._updateComments();
    } else {
      this._setCreateCommentErrorStyle();
      setСustomTimeOut(SHAKE_ANIMATION_TIMEOUT, () => {
        this._setCreateCommentErrorStyle(false);
        disableForm(this._commentsComponent.newCommentFormElements, false);
        setDisabledStyle(this._commentsComponent.newCommentFormElements, false);
      });
    }
  }


  _commentDeletionHandler(oldDataId, isDeleted = true, commentComponent = null) {
    if (isDeleted) {
      this._commentsModel.removeComment(oldDataId);
      this._updateComments();
    } else {
      shakeElement(commentComponent.getElement());
      setСustomTimeOut(SHAKE_ANIMATION_TIMEOUT, () => {
        shakeElement(commentComponent.getElement(), false);
        commentComponent.setDeleteButtonDisable(false);
        commentComponent.setDeleteButtonTextData({
          deleteButtonText: `Delete`,
        });
      });
    }
  }


  _commentChangeHandler(oldData, newData, commentComponent) {
    if (newData === null) {
      this._commentsApi.deleteComment(oldData.id)
        .then(() => this._commentDeletionHandler(oldData.id))
        .catch(() => this._commentDeletionHandler(oldData.id, false, commentComponent));
    } else if (oldData === null) {
      this._commentsApi.createComment(this._filmID, newData)
        .then((response) => this._commentСreationHandler(response.comments))
        .catch(() => this._commentСreationHandler([], false))
        .then(() => this._addListeners());
    }
  }


  _documentKeyDownHendler(evt) {
    addCommentKeysPressHandler(evt, () => {
      this._addNewComment();
    });
  }


  _addListeners() {
    document.addEventListener(`keydown`, this._documentKeyDownHendler);
  }
}
