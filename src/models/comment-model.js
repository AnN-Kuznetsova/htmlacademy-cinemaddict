import {Emoji} from "../const.js";

export default class CommentModel {
  constructor(data) {
    this.id = data[`id`];
    this.text = data[`comment`];
    this.emoji = Emoji[data[`emotion`]];
    this.author = data[`author`];
    this.dayAndTime = data[`date`] ? new Date(data[`date`]) : null;
  }


  toRAW() {
    return {
      "comment": this.text ? this.text : ``,
      "emotion": this.emoji.name,
      "date": this.dayAndTime.toISOString(),
    };
  }


  static parseComment(data) {
    return new CommentModel(data);
  }


  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }
}
