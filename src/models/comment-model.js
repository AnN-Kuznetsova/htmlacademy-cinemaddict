import {EMOJIS} from "../const.js";

export default class CommentModel {
  constructor(data) {
    this.id = data[`id`];
    this.text = data[`comment`];
    this.emoji = [data[`emotion`], EMOJIS[data[`emotion`]]];
    this.author = data[`author`];
    this.dayAndTime = data[`date`] ? new Date(data[`date`]) : null;
  }

  static parseComment(data) {
    return new CommentModel(data);
  }

  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }
}
