import CommentsController from "./comments-controller.js";
import FilmCard from "../components/film-card.js";
import FilmDetails from "../components/film-details.js";
import FilmDataController from "./film-data-controller.js";
import FilmModel from "../models/film-model.js";
import {escPressHandler} from "../utils/key-events.js";
import {render, RenderPosition, replace, remove, removeElement} from "../utils/render.js";
import {UserDetailsButton} from "../components/film-card.js";


const Mode = {
  CARD: `card`,
  DETAILS: `details`,
};

const SendFilmDataMode = {
  ADD_TO_WATCHLIST: `addToWatchlist`,
  MARK_AS_WATCHED: `markAsWatched`,
  FAVORITE: `favorite`,
  DEFAULT: `default,`
};


export default class FilmController {
  constructor(container, onDataChange, onViewChange, commentsModelChangeHandler) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._commentsModelChangeHandler = commentsModelChangeHandler;

    this._mode = Mode.CARD;

    this._film = null;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._filmDataController = null;
    this._commentsController = null;
    this._isCommentsModelChange = false;

    this._documentKeyDownHendler = this._documentKeyDownHendler.bind(this);
    this._closeFilmDetailsPopup = this._closeFilmDetailsPopup.bind(this);
    this._commentsChangeHandler = this._commentsChangeHandler.bind(this);
    this._userDetailsButtonClickHandler = this._userDetailsButtonClickHandler.bind(this);
  }


  _commentsChangeHandler(value = true) {
    this._isCommentsModelChange = value;
  }


  _documentKeyDownHendler(evt) {
    escPressHandler(evt, () => {
      this._closeFilmDetailsPopup();
    });
  }


  _closeFilmDetailsPopup() {
    this._sendNewFilmData(SendFilmDataMode.DEFAULT);

    if (this._isCommentsModelChange) {
      this._commentsModelChangeHandler(this._film.id, this._film);
    }

    removeElement(this._filmDataController.getFilmDataComponent());

    const commentsComponent = this._commentsController.getCommentsComponent();
    if (commentsComponent) {
      commentsComponent.reset();
      remove(commentsComponent);
      this._commentsController.removeListeners();
    } else {
      remove(this._commentsController.getCommentsConnectionErrorComponent());
    }

    removeElement(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._documentKeyDownHendler);
    this._mode = Mode.CARD;
  }


  _openFilmDetailsPopup(filmDetailsComponent) {
    this._onViewChange();
    render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._documentKeyDownHendler);
    this._mode = Mode.DETAILS;

    const filmDataContainer = filmDetailsComponent.getElement().querySelector(`.form-details__top-container`);
    this._filmDataController = new FilmDataController(filmDataContainer, this._closeFilmDetailsPopup);
    this._filmDataController.render(this._film);

    const commentsContainer = filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._commentsController = new CommentsController(commentsContainer, this._film.id, this._film.commentsModel, this._commentsChangeHandler);
    this._commentsController.render();
  }


  _sendNewFilmData(sendMode) {
    const getWatchingDate = (isWatch) => {
      return isWatch ? new Date() : null;
    };

    let isFilmDataChange = false;
    const newFilm = FilmModel.clone(this._film);

    switch (sendMode) {
      case SendFilmDataMode.ADD_TO_WATCHLIST:
        newFilm.isAddToWatchlist = !newFilm.isAddToWatchlist;
        isFilmDataChange = true;
        break;
      case SendFilmDataMode.MARK_AS_WATCHED:
        newFilm.isMarkAsWatched = !newFilm.isMarkAsWatched;
        newFilm.watchingDate = getWatchingDate(newFilm.isMarkAsWatched);
        isFilmDataChange = true;
        break;
      case SendFilmDataMode.FAVORITE:
        newFilm.isFavorite = !newFilm.isFavorite;
        isFilmDataChange = true;
        break;
      default:
        const filmSettings = this._filmDataController.getFilmSettings();

        if ((this._film.isAddToWatchlist !== filmSettings.isAddToWatchlist) ||
          (this._film.isMarkAsWatched !== filmSettings.isMarkAsWatched) ||
          (this._film.isFavorite !== filmSettings.isFavorite)) {
          newFilm.watchingDate = getWatchingDate(filmSettings.isMarkAsWatched && !this._film.isMarkAsWatched);

          newFilm.isAddToWatchlist = filmSettings.isAddToWatchlist;
          newFilm.isMarkAsWatched = filmSettings.isMarkAsWatched;
          newFilm.isFavorite = filmSettings.isFavorite;

          isFilmDataChange = true;
        }
    }

    if (isFilmDataChange) {
      this._onDataChange(this._film.id, newFilm);
    }
  }


  _userDetailsButtonClickHandler(evt) {
    switch (evt.target.dataset.buttonName) {
      case UserDetailsButton.ADD_TO_WATCHLIST:
        this._sendNewFilmData(SendFilmDataMode.ADD_TO_WATCHLIST);
        break;
      case UserDetailsButton.MARK_AS_WATCHED:
        this._sendNewFilmData(SendFilmDataMode.MARK_AS_WATCHED);
        break;
      case UserDetailsButton.FAVORITE:
        this._sendNewFilmData(SendFilmDataMode.FAVORITE);
        break;
      default:
        this._sendNewFilmData(SendFilmDataMode.DEFAULT);
    }
  }


  render(film) {
    const popupOpenButtonsClickHandler = () => {
      openPopup();
    };

    this._film = film;

    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCard(film);
    this._filmCardComponent.setPopupOpenButtonsClickHandler(popupOpenButtonsClickHandler);
    this._filmCardComponent.setUserDetailsButtonClickHandler(this._userDetailsButtonClickHandler);

    this._filmDetailsComponent = new FilmDetails();
    const openPopup = this._openFilmDetailsPopup.bind(this, this._filmDetailsComponent);

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }


  setDefaultView() {
    if (this._mode !== Mode.CARD) {
      this._closeFilmDetailsPopup();
    }
  }


  get film() {
    return this._film;
  }
}
