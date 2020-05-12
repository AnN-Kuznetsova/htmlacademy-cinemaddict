import Comments from "../components/comments.js";
import CommentController from "./comment-controller.js";
import {render, RenderPosition, replace, removeElement} from "../utils/render.js";

export default class CommentsController {
  constructor(container, commentsModel, commentsChangeHandler) {
    this._container = container;
    this._commentsModel = commentsModel;

    this._commentsComponent = null;
    this._commentControllers = [];

    this._commentChangeHandler = this._commentChangeHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._renderComments = this._renderComments.bind(this);

    this._commentsModel.setCommentsChangeHandler(commentsChangeHandler);
  }


  _submitHandler() {
    const data = this._commentsComponent.getData();
    this._commentChangeHandler(this, null, data);
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
    }

/* if (oldData === EmptyTask) {

      this._creatingTask = null;
    if (isSuccess) {	      if (newData === null) {
      taskController.render(newData);	        taskController.destroy();
        this._updateTasks(this._showingTasksCount);
      } else {
        this._tasksModel.addTask(newData);
        taskController.render(newData, TaskControllerMode.DEFAULT);

        if (this._showingTasksCount % SHOWING_TASKS_COUNT_BY_BUTTON === 0) {
          const destroyedTask = this._showedTaskControllers.pop();
          destroyedTask.destroy();
        }

        this._showedTaskControllers = [].concat(taskController, this._showedTaskControllers);
        this._showingTasksCount = this._showedTaskControllers.length;

        this._renderLoadMoreButton();
      }
    } else */
    /* else {
      const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

      if (isSuccess) {
        taskController.render(newData, TaskControllerMode.DEFAULT);
      }
    } */
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
    this._commentsComponent.setSubmitHandler(this._submitHandler);
    render(this._container, this._commentsComponent, RenderPosition.AFTERBEGIN);

    this._renderComments(comments);
  }


  getCommentsComponent() {
    return this._commentsComponent;
  }


  getCommentsModel() {
    return this._commentsModel;
  }
}
