import Comments from "../components/comments.js";
import CommentController from "./comment-controller.js";
import {render, RenderPosition, replace, removeElement} from "../utils/render.js";

export default class CommentsController {
  constructor(container, commentsModel) {
    this._container = container;
    this._commentsModel = commentsModel;

    this._commentsComponent = null;
    this._commentControllers = [];

    this._commentChangeHandler = this._commentChangeHandler.bind(this);
  }


  _commentChangeHandler() {
    window.console.log(`deleteButton click`);
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
    } else if (newData === null) {
      this._tasksModel.removeTask(oldData.id);
      this._updateTasks(this._showingTasksCount);
    } else {
      const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

      if (isSuccess) {
        taskController.render(newData, TaskControllerMode.DEFAULT);
      }
    } */
  }


  render() {
    const comments = this._commentsModel.getComments();
    const commentsCount = comments.length;
    this._commentsComponent = new Comments(commentsCount);
    //this._commentsComponent.setDeleteButtonClickHandler(this._commentsChangeHandler);
    render(this._container, this._commentsComponent, RenderPosition.AFTERBEGIN);

    const commentsListElement = this._commentsComponent.getElement()
      .querySelector(`.film-details__comments-list`);
    this._commentControllers = comments.map((comment) => {
      const commentController = new CommentController(commentsListElement, this._commentChangeHandler);

      commentController.render(comment);

      return commentController;
    });
    //this._renderComments(this._commentsModel.getComments());
  }


  getCommentsComponent() {
    return this._commentsComponent;
  }
}
