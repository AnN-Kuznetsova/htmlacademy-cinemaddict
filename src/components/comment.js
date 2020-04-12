import {formatDateWithSlash, formatTime} from "../utils.js";

export const createCommentMarkup = (comment) => {
  const {text, emoji, author, dayAndTime} = comment;

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji[Object.keys(emoji)[0]]}" width="55" height="55" alt="emoji-${Object.keys(emoji)[0]}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${formatDateWithSlash(dayAndTime)} ${formatTime(dayAndTime)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

const createCommentsMarkup = (comments) => {
  return comments.slice().map((it) => createCommentMarkup(it)).join(`\n`);
};


export {createCommentsMarkup};
