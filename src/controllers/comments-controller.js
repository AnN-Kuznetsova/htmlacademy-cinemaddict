import Comments from "../components/comments.js";
import {render, RenderPosition, replace, removeElement} from "../utils/render.js";

export default class CommentsController {
  constructor(container, commentsModel) {
    this._container = container;
    this._commentsModel = commentsModel;

    this._commentsComponent = null;
  }


  render() {
    this._commentsComponent = new Comments(this._commentsModel.getComments());
    render(this._container, this._commentsComponent, RenderPosition.AFTERBEGIN);
  }


  getCommentsComponent() {
    return this._commentsComponent;
  }
}
